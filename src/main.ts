import './style.css';
import GUI from 'lil-gui';
import { createControls } from './viewer/controls';
import { createWebGPURenderer } from './viewer/renderer-webgpu';
import {
  DEFAULT_CAMERAS,
  getProjectionMatrix,
  getViewMatrix,
  invert4,
  multiply4,
  translate4,
  type CameraPose,
  type Mat4,
} from './viewer/camera';
import { SPLAT_ROW_BYTES } from './viewer/loader';
import { createSortWorker } from './viewer/sort-worker';

// ASCII bytes for the text "ply\n".
// We use this fast signature check to route dropped files into the PLY decode path.
const PLY_MAGIC = [112, 108, 121, 10];

interface ViewerDom {
  canvas: HTMLCanvasElement;
  message: HTMLDivElement;
  fps: HTMLSpanElement;
  progress: HTMLDivElement;
  camId: HTMLSpanElement;
  dropzone: HTMLDivElement;
  anaglyphButton: HTMLButtonElement;
  stereoButton: HTMLButtonElement;
}

const dom = getViewerDom();

async function main() {
  // Hard fail early when WebGPU is unavailable so we do not initialize
  // event listeners or workers that can never render.
  if (!navigator.gpu) {
    dom.message.textContent = 'WebGPU is not available in this browser.';
    return;
  }

  // Core subsystems:
  // - renderer: WebGPU resources + draw calls
  // - controls: input -> view matrix updates
  // - GUI: runtime toggles
  const renderer = await createWebGPURenderer(dom.canvas);
  const controls = createControls(dom.canvas);
  const renderOptions = {
    pointCloud: false,
    pointSize: 0.8,
    culling: true,
    stereoMode: 'off' as 'off' | 'anaglyph' | 'sbs',
  };
  const gui = createGui(renderOptions);
  setupStereoButtons(dom, renderOptions);

  let cameras: CameraPose[] = [...DEFAULT_CAMERAS];
  let currentCameraIndex = 0;
  let loadedVertices = 0;
  // Animated crossfade value: 0 = full splat, 1 = full point cloud.
  let pcTransition = 0;
  let renderScale = 1;
  let lastCameraMotionAt = performance.now();
  let lastScaleChangeAt = 0;
  const previousViewMatrix: Mat4 = [...controls.viewMatrix];
  let hasPostedViewProj = false;
  let lastViewProjPostAt = 0;
  const lastPostedViewProj = new Float32Array(16);
  let sortMsSample = 0;
  let sortMsPending = false;

  // Applies one camera preset (intrinsics + pose) to the live controls.
  // We also stop carousel mode so preset selection is deterministic.
  const applyCamera = (index: number) => {
    if (!cameras.length) return;
    currentCameraIndex = normalizeIndex(index, cameras.length);
    const camera = cameras[currentCameraIndex];
    controls.camera.fx = camera.fx;
    controls.camera.fy = camera.fy;
    controls.setViewMatrix(getViewMatrix(camera));
    controls.setCarousel(false);
    dom.camId.textContent = `cam ${currentCameraIndex}`;
  };

  // Restores a serialized 4x4 view matrix from URL hash.
  // Returns false when hash is missing/invalid so caller can fallback to defaults.
  const setViewFromHash = (hashValue: string) => {
    const matrix = decodeViewMatrix(hashValue);
    if (!matrix) return false;
    controls.setViewMatrix(matrix);
    controls.setCarousel(false);
    dom.camId.textContent = '';
    return true;
  };

  // Persists the current camera matrix into URL hash for reproducible viewpoints.
  const saveViewToHash = () => {
    location.hash = `#${encodeURIComponent(encodeViewMatrix(controls.viewMatrix))}`;
    dom.camId.textContent = '';
  };

  // Worker owns CPU-heavy preprocessing:
  // 1) optional .ply -> internal splat buffer conversion
  // 2) per-frame depth sorting for correct alpha composition
  // Main thread only uploads worker outputs to GPU.
  const sortWorker = createSortWorker({
    onSortResult: ({ depthIndex, sortMs }) => {
      renderer.setSortedIndices(depthIndex);
      sortMsSample = sortMs;
      sortMsPending = true;
    },
    // Worker has rebuilt packed GPU payload.
    // Upload to renderer and hide startup UI once first payload arrives.
    onSplatData: ({ splatData, vertexCount }) => {
      loadedVertices = vertexCount;
      renderer.setSplatData(splatData, vertexCount);
      dom.message.textContent = '';
      dom.dropzone.classList.add('hidden');
    },
    // Optional conversion callback (PLY -> SPLAT buffer).
    // In our current UX we do not auto-save on drop, but we keep download support
    // for other flows that may set save=true.
    onConvertedBuffer: (buffer, save) => {
      const uint = new Uint8Array(buffer);
      loadedVertices = Math.floor(uint.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      if (save) {
        downloadBinary(uint, 'model.splat');
      }
    },
  });

  // If URL has a saved camera matrix, prefer that over baked dataset cameras.
  if (!setViewFromHash(location.hash.slice(1))) {
    applyCamera(currentCameraIndex);
  }

  // Camera hotkeys (+/-/0-9/P/V).
  registerKeyboardShortcuts({
    applyCamera,
    getCurrentCameraIndex: () => currentCameraIndex,
    saveViewToHash,
    setCarousel: (enabled) => controls.setCarousel(enabled),
    clearCameraLabel: () => {
      dom.camId.textContent = '';
    },
  });

  // Keep hash-driven camera restoration reactive.
  window.addEventListener('hashchange', () => {
    setViewFromHash(location.hash.slice(1));
  });

  // File-drop entrypoint for scene and camera data.
  registerDragDrop({
    onFile: async (file) => {
      controls.setCarousel(false);
      dom.message.textContent = `Loading ${file.name}...`;

      // Support optional camera metadata sidecar.
      if (/\.json$/i.test(file.name)) {
        const parsed = JSON.parse(await file.text()) as CameraPose[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          cameras = parsed;
          applyCamera(0);
          dom.message.textContent = 'Loaded cameras.json';
        }
        return;
      }

      // Scene payload path:
      // - PLY: decode in worker (standard or compressed)
      // - SPLAT: send directly to worker sorting path
      const buffer = await file.arrayBuffer();
      if (isPlyBuffer(buffer)) {
        sortWorker.postPlyBuffer(buffer, false);
        return;
      }

      loadedVertices = Math.floor(buffer.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      dom.message.textContent = '';
      dom.dropzone.classList.add('hidden');
    },
  });
  dom.progress.style.display = 'none';
  dom.message.textContent = '';

  let lastFrame = performance.now();
  let smoothedFps = 0;
  let smoothedSortMs = 0;
  let smoothedUploadMs = 0;
  let smoothedRenderMs = 0;

  // Main render loop:
  // 1) update controls -> view matrix
  // 2) compute viewProjection and send to worker for sort updates
  // 3) draw with latest sorted indices and splat payload
  // 4) update HUD stats
  const frame = (now: number) => {
    const dtMs = Math.max(now - lastFrame, 0.0001);
    const dtForControls = Math.min(dtMs, 34);
    lastFrame = now;

    controls.update(dtForControls);
    let viewDelta = 0;
    for (let i = 0; i < 16; i++) {
      const current = controls.viewMatrix[i];
      viewDelta += Math.abs(current - previousViewMatrix[i]);
      previousViewMatrix[i] = current;
    }
    if (viewDelta > 1e-4) {
      lastCameraMotionAt = now;
    }

    const cameraActive = now - lastCameraMotionAt < 140;
    const canChangeScale = now - lastScaleChangeAt > 180;
    if (cameraActive && renderScale > 0.7 && canChangeScale) {
      renderScale = 0.7;
      lastScaleChangeAt = now;
      renderer.setResolutionScale(renderScale);
    } else if (!cameraActive && renderScale < 1 && canChangeScale) {
      renderScale = renderScale < 0.85 ? 0.85 : 1;
      lastScaleChangeAt = now;
      renderer.setResolutionScale(renderScale);
    }

    // Animate the splat ↔ point-cloud crossfade at ~500 ms total duration.
    const pcTarget = renderOptions.pointCloud ? 1 : 0;
    if (pcTransition !== pcTarget) {
      const step = (dtMs / 500) * Math.sign(pcTarget - pcTransition);
      pcTransition =
        pcTarget > pcTransition
          ? Math.min(pcTarget, pcTransition + step)
          : Math.max(pcTarget, pcTransition + step);

      // Snap to target to avoid floating point drift keeps isCrossfading=true.
      if (Math.abs(pcTransition - pcTarget) < 0.001) {
        pcTransition = pcTarget;
      }
    }

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const logicalWidth = Math.max(1, Math.round(dom.canvas.clientWidth * dpr));
    const logicalHeight = Math.max(1, Math.round(dom.canvas.clientHeight * dpr));
    const projection = getProjectionMatrix(
      controls.camera.fx,
      controls.camera.fy,
      logicalWidth,
      logicalHeight,
    );

    const viewProj = multiply4(projection, controls.viewMatrix);
    let maxViewProjDelta = 0;
    for (let i = 0; i < 16; i++) {
      maxViewProjDelta = Math.max(maxViewProjDelta, Math.abs(viewProj[i] - lastPostedViewProj[i]));
    }
    const postIntervalMs = cameraActive ? 28 : 85;
    const timeSincePost = now - lastViewProjPostAt;
    const shouldPostView =
      !hasPostedViewProj ||
      (maxViewProjDelta > 0.0005 && timeSincePost >= postIntervalMs) ||
      timeSincePost >= 220;
    if (shouldPostView) {
      sortWorker.postViewProjection(viewProj, renderOptions.culling);
      for (let i = 0; i < 16; i++) {
        lastPostedViewProj[i] = viewProj[i];
      }
      hasPostedViewProj = true;
      lastViewProjPostAt = now;
    }
    const eyeOffset = renderOptions.stereoMode === 'anaglyph' ? 0.04 : 0.065;
    renderer.render({
      projection,
      view: controls.viewMatrix,
      viewLeft: getEyeViewMatrix(controls.viewMatrix, -eyeOffset),
      viewRight: getEyeViewMatrix(controls.viewMatrix, eyeOffset),
      focal: [controls.camera.fx, controls.camera.fy],
      viewport: [logicalWidth, logicalHeight],
      transition: pcTransition,
      pointSize: renderOptions.pointSize,
      stereoMode: renderOptions.stereoMode,
    });
    const timings = renderer.consumeTimings();

    const fps = 1000 / dtMs;
    smoothedFps = smoothedFps * 0.9 + fps * 0.1;
    smoothedUploadMs = smoothedUploadMs * 0.85 + timings.uploadMs * 0.15;
    smoothedRenderMs = smoothedRenderMs * 0.85 + timings.renderMs * 0.15;
    if (sortMsPending) {
      smoothedSortMs = smoothedSortMs * 0.75 + sortMsSample * 0.25;
      sortMsPending = false;
    } else {
      smoothedSortMs *= 0.99;
    }
    dom.fps.textContent = `${Math.round(smoothedFps)} fps | ${loadedVertices.toLocaleString()} pts | sort ${smoothedSortMs.toFixed(1)}ms | upload ${smoothedUploadMs.toFixed(2)}ms | render ${smoothedRenderMs.toFixed(2)}ms`;
    requestAnimationFrame(frame);
  };

  window.addEventListener('beforeunload', () => sortWorker.terminate());
  window.addEventListener('beforeunload', () => gui.destroy());
  requestAnimationFrame(frame);
}

main().catch((err: unknown) => {
  const text = err instanceof Error ? err.message : String(err);
  dom.message.textContent = `Renderer init failed: ${text}`;
});

function getViewerDom(): ViewerDom {
  // We query from #app to avoid accidental collisions with unrelated DOM ids.
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('Missing #app root element');

  const canvas = app.querySelector<HTMLCanvasElement>('#canvas');
  const message = app.querySelector<HTMLDivElement>('#message');
  const fps = app.querySelector<HTMLSpanElement>('#fps');
  const progress = app.querySelector<HTMLDivElement>('#progress');
  const camId = app.querySelector<HTMLSpanElement>('#camid');
  const dropzone = app.querySelector<HTMLDivElement>('#dropzone');
  const anaglyphButton = app.querySelector<HTMLButtonElement>('#btn-anaglyph');
  const stereoButton = app.querySelector<HTMLButtonElement>('#btn-stereo');

  if (
    !canvas ||
    !message ||
    !fps ||
    !progress ||
    !camId ||
    !dropzone ||
    !anaglyphButton ||
    !stereoButton
  ) {
    throw new Error('Missing viewer DOM nodes');
  }

  return { canvas, message, fps, progress, camId, dropzone, anaglyphButton, stereoButton };
}

function normalizeIndex(index: number, size: number): number {
  // "safe modulo" that works for negative inputs as well.
  return ((index % size) + size) % size;
}

function decodeViewMatrix(encoded: string): Mat4 | null {
  if (!encoded) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(encoded)) as unknown;
    if (!Array.isArray(parsed) || parsed.length !== 16) return null;
    const matrix = parsed.map(Number);
    if (matrix.some((value) => Number.isNaN(value))) return null;
    return matrix as Mat4;
  } catch {
    return null;
  }
}

function encodeViewMatrix(matrix: Mat4): string {
  // Quantize for shorter URL hash while keeping usable precision.
  const rounded = matrix.map((value) => Math.round(value * 100) / 100);
  return JSON.stringify(rounded);
}

function downloadBinary(data: Uint8Array, filename: string) {
  // Create an owned copy so the Blob payload is stable even if caller
  // reuses/mutates the original typed array.
  const copy = new Uint8Array(data);
  const blob = new Blob([copy.buffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function isPlyBuffer(buffer: ArrayBuffer): boolean {
  // Header-only check; sufficient for routing dropped files.
  const bytes = new Uint8Array(buffer);
  return PLY_MAGIC.every((value, index) => bytes[index] === value);
}

function registerKeyboardShortcuts(params: {
  applyCamera: (index: number) => void;
  getCurrentCameraIndex: () => number;
  saveViewToHash: () => void;
  setCarousel: (enabled: boolean) => void;
  clearCameraLabel: () => void;
}) {
  const { applyCamera, getCurrentCameraIndex, saveViewToHash, setCarousel, clearCameraLabel } =
    params;

  // We use keydown only; camera navigation actions are stateless per keypress.
  window.addEventListener('keydown', (event) => {
    if (/^\d$/.test(event.key)) {
      applyCamera(Number.parseInt(event.key, 10));
      return;
    }
    if (event.key === '-' || event.key === '_') {
      applyCamera(getCurrentCameraIndex() - 1);
      return;
    }
    if (event.key === '+' || event.key === '=') {
      applyCamera(getCurrentCameraIndex() + 1);
      return;
    }
    if (event.code === 'KeyP') {
      setCarousel(true);
      clearCameraLabel();
      return;
    }
    if (event.code === 'KeyV') {
      saveViewToHash();
    }
  });
}

function registerDragDrop(params: { onFile: (file: File) => Promise<void> }) {
  const { onFile } = params;

  // Prevent browser default "open file in tab" behavior so the app can own drop flow.
  const preventDefault = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  document.addEventListener('dragenter', preventDefault);
  document.addEventListener('dragover', preventDefault);
  document.addEventListener('dragleave', preventDefault);
  document.addEventListener('drop', (event) => {
    preventDefault(event);
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    void onFile(file);
  });
}

function createGui(renderOptions: { pointCloud: boolean; pointSize: number; culling: boolean }) {
  const gui = new GUI({ title: 'Render' });
  gui.add(renderOptions, 'pointCloud').name('Point Cloud');
  gui.add(renderOptions, 'pointSize', 0.5, 6, 0.1).name('Point Size');
  gui.add(renderOptions, 'culling').name('Spatially-Varying LOD');
  return gui;
}

function getEyeViewMatrix(view: Mat4, eyeOffset: number): Mat4 {
  const inv = invert4(view);
  if (!inv) return view;
  const shifted = translate4(inv, eyeOffset, 0, 0);
  const out = invert4(shifted);
  return out ?? view;
}

function setupStereoButtons(
  viewerDom: ViewerDom,
  renderOptions: { stereoMode: 'off' | 'anaglyph' | 'sbs' },
) {
  const updateUi = () => {
    const anaglyphActive = renderOptions.stereoMode === 'anaglyph';
    const stereoActive = renderOptions.stereoMode === 'sbs';
    viewerDom.anaglyphButton.classList.toggle('active', anaglyphActive);
    viewerDom.stereoButton.classList.toggle('active', stereoActive);
    viewerDom.anaglyphButton.setAttribute('aria-pressed', String(anaglyphActive));
    viewerDom.stereoButton.setAttribute('aria-pressed', String(stereoActive));
  };

  viewerDom.anaglyphButton.addEventListener('click', () => {
    renderOptions.stereoMode = renderOptions.stereoMode === 'anaglyph' ? 'off' : 'anaglyph';
    updateUi();
  });

  viewerDom.stereoButton.addEventListener('click', () => {
    renderOptions.stereoMode = renderOptions.stereoMode === 'sbs' ? 'off' : 'sbs';
    updateUi();
  });

  updateUi();
}
