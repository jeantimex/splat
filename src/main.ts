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
    fov: 35,
    splatScale: 1,
    antialias: 0.3,
    brightness: 0,
    contrast: 1,
    gamma: 1,
    blackLevel: 0,
    whiteLevel: 0,
    intensity: 1,
    saturate: 1,
    vibrance: 0,
    temperature: 0,
    tint: 0,
    alpha: 1,
    animateCamera: true,
    animationDuration: 1350,
  };
  let cameras: CameraPose[] = [...DEFAULT_CAMERAS];
  let currentCameraIndex = 0;

  let targetViewMatrix: Mat4 | null = null;
  let animationStartTime = 0;

  // Applies one camera preset (intrinsics + pose) to the live controls.
  // We also stop carousel mode so preset selection is deterministic.
  const applyCamera = (index: number) => {
    if (!cameras.length) return;
    currentCameraIndex = normalizeIndex(index, cameras.length);
    const camera = cameras[currentCameraIndex];

    const nextView = getViewMatrix(camera);
    if (renderOptions.animateCamera) {
      targetViewMatrix = [...nextView];
      animationStartTime = performance.now();
    } else {
      controls.setViewMatrix(nextView);
      targetViewMatrix = null;
    }

    controls.camera.fx = camera.fx;
    controls.camera.fy = camera.fy;
    controls.setCarousel(false);
  };

  const cameraState = {
    selectedCamera: '',
  };
  let cameraDropdown: any = null;

  const updateCameraDropdown = (cameras: CameraPose[], cameraGui: any, callbacks: any) => {
    if (cameraDropdown) {
      cameraDropdown.destroy();
    }
    const cameraNames = cameras.map((c, i) => `${i + 1}: ${c.img_name}`);
    cameraState.selectedCamera = cameraNames[0] || '';
    cameraDropdown = cameraGui
      .add(cameraState, 'selectedCamera', cameraNames)
      .name('Positions')
      .onChange((displayName: string) => {
        const indexStr = displayName.split(':')[0];
        const index = Number.parseInt(indexStr, 10) - 1;
        if (index >= 0 && index < cameras.length) {
          callbacks.onApplyCamera(index);
        }
      });
  };

  const gui = createGui(renderOptions, {
    onCamerasLoaded: (newCameras, cameraGui, callbacks) => {
      cameras = newCameras;
      updateCameraDropdown(newCameras, cameraGui, callbacks);
    },
    onApplyCamera: (index) => {
      applyCamera(index);
    },
    onLogPose: () => {
      const inv = invert4(controls.viewMatrix);
      if (!inv) return;
      const pose = {
        id: crypto.randomUUID(),
        img_name: `custom_${cameras.length}`,
        width: dom.canvas.width,
        height: dom.canvas.height,
        position: [inv[12], inv[13], inv[14]],
        rotation: [
          [inv[0], inv[4], inv[8]],
          [inv[1], inv[5], inv[9]],
          [inv[2], inv[6], inv[10]],
        ],
        fy: controls.camera.fy,
        fx: controls.camera.fx,
      };
      console.log('Current Camera Pose:', JSON.stringify(pose, null, 2));
    }
  });
  setupStereoButtons(dom, renderOptions);

  const cameraGui = gui.folders.find((f) => f._title === 'Camera');

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

  // Restores a serialized 4x4 view matrix from URL hash.
  // Returns false when hash is missing/invalid so caller can fallback to defaults.
  const setViewFromHash = (hashValue: string) => {
    const matrix = decodeViewMatrix(hashValue);
    if (!matrix) return false;
    controls.setViewMatrix(matrix);
    controls.setCarousel(false);
    return true;
  };

  // Persists the current camera matrix into URL hash for reproducible viewpoints.
  const saveViewToHash = () => {
    location.hash = `#${encodeURIComponent(encodeViewMatrix(controls.viewMatrix))}`;
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
          if (cameraGui) {
            updateCameraDropdown(parsed, cameraGui, {
              onApplyCamera: (index: number) => applyCamera(index),
            });
          }
          applyCamera(0);
          dom.message.textContent = '';
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

    if (controls.isInteracting) {
      targetViewMatrix = null;
    }

    if (targetViewMatrix) {
      const elapsed = now - animationStartTime;
      const duration = Math.max(renderOptions.animationDuration, 1);
      const t = Math.min(elapsed / duration, 1);
      const ease = t * t * (3 - 2 * t);
      const current = controls.viewMatrix;
      const next: Mat4 = [];
      for (let i = 0; i < 16; i++) {
        next[i] = current[i] + (targetViewMatrix[i] - current[i]) * ease;
      }
      controls.setViewMatrix(next);
      if (t >= 1) {
        targetViewMatrix = null;
      }
    }

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
    const fovRad = (renderOptions.fov * Math.PI) / 180;
    const fovFy = logicalHeight / (2 * Math.tan(fovRad / 2));
    const fxFyRatio = controls.camera.fx / Math.max(controls.camera.fy, 1e-6);
    const fovFx = fovFy * fxFyRatio;
    const projection = getProjectionMatrix(
      fovFx,
      fovFy,
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
      focal: [fovFx, fovFy],
      viewport: [logicalWidth, logicalHeight],
      transition: pcTransition,
      pointSize: renderOptions.pointSize,
      splatScale: renderOptions.splatScale,
      antialias: renderOptions.antialias,
      stereoMode: renderOptions.stereoMode,
      brightness: renderOptions.brightness,
      contrast: renderOptions.contrast,
      gamma: renderOptions.gamma,
      blackLevel: renderOptions.blackLevel,
      whiteLevel: renderOptions.whiteLevel,
      intensity: renderOptions.intensity,
      saturate: renderOptions.saturate,
      vibrance: renderOptions.vibrance,
      temperature: renderOptions.temperature,
      tint: renderOptions.tint,
      alpha: renderOptions.alpha,
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
  const dropzone = app.querySelector<HTMLDivElement>('#dropzone');
  const anaglyphButton = app.querySelector<HTMLButtonElement>('#btn-anaglyph');
  const stereoButton = app.querySelector<HTMLButtonElement>('#btn-stereo');

  if (
    !canvas ||
    !message ||
    !fps ||
    !progress ||
    !dropzone ||
    !anaglyphButton ||
    !stereoButton
  ) {
    throw new Error('Missing viewer DOM nodes');
  }

  return { canvas, message, fps, progress, dropzone, anaglyphButton, stereoButton };
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
}) {
  const { applyCamera, getCurrentCameraIndex, saveViewToHash, setCarousel } =
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

function createGui(
  renderOptions: {
    pointCloud: boolean;
    pointSize: number;
    culling: boolean;
    fov: number;
    splatScale: number;
    antialias: number;
    brightness: number;
    contrast: number;
    gamma: number;
    blackLevel: number;
    whiteLevel: number;
    intensity: number;
    saturate: number;
    vibrance: number;
    temperature: number;
    tint: number;
    alpha: number;
    animateCamera: boolean;
    animationDuration: number;
  },
  callbacks: {
    onCamerasLoaded: (cameras: CameraPose[], cameraGui: any, callbacks: any) => void;
    onApplyCamera: (index: number) => void;
    onLogPose: () => void;
  },
) {
  const gui = new GUI({ title: 'Render' });

  const splatGui = gui.addFolder('Splat Settings');
  splatGui.add(renderOptions, 'pointCloud').name('Point Cloud');
  splatGui.add(renderOptions, 'pointSize', 0.5, 6, 0.1).name('Point Size');
  splatGui.add(renderOptions, 'culling').name('Spatially-Varying LOD');
  splatGui.add(renderOptions, 'splatScale', 0, 1, 0.001).name('Splatscale');
  splatGui.add(renderOptions, 'antialias', 0, 4, 0.001).name('Antialias');
  splatGui.close();

  const cameraGui = gui.addFolder('Camera');
  cameraGui.add(renderOptions, 'fov', 20, 120, 0.1).name('FOV');
  cameraGui.add(renderOptions, 'animateCamera').name('Animate Transitions');
  cameraGui.add(renderOptions, 'animationDuration', 0, 3000, 1).name('Animation duration (ms)');

  cameraGui.add({
    loadCameras: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        try {
          const parsed = JSON.parse(await file.text()) as CameraPose[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            callbacks.onCamerasLoaded(parsed, cameraGui, callbacks);
            callbacks.onApplyCamera(0);
            dom.message.textContent = '';
          }
        } catch (err) {
          dom.message.textContent = `Error loading cameras: ${err instanceof Error ? err.message : String(err)}`;
        }
      };
      input.click();
    }
  }, 'loadCameras').name('Load Cameras');

  cameraGui.add({
    logPose: () => {
      callbacks.onLogPose();
    }
  }, 'logPose').name('Log Camera Pose');

  cameraGui.close();

  const colorGui = gui.addFolder('Adjust Colors');
  colorGui.add(renderOptions, 'brightness', -1, 1, 0.001).name('Brightness');
  colorGui.add(renderOptions, 'contrast', 0, 3, 0.001).name('Contrast');
  colorGui.add(renderOptions, 'gamma', 0.1, 3, 0.001).name('Gamma');
  colorGui.add(renderOptions, 'blackLevel', -1, 1, 0.001).name('Blacklevel');
  colorGui.add(renderOptions, 'whiteLevel', -1, 1, 0.001).name('Whitelevel');
  colorGui.add(renderOptions, 'intensity', 0, 3, 0.001).name('Intensity');
  colorGui.add(renderOptions, 'saturate', 0, 3, 0.001).name('Saturate');
  colorGui.add(renderOptions, 'vibrance', -1, 1, 0.001).name('Vibrance');
  colorGui.add(renderOptions, 'temperature', -1, 1, 0.001).name('Temperature');
  colorGui.add(renderOptions, 'tint', -1, 1, 0.001).name('Tint');
  colorGui.add(renderOptions, 'alpha', 0, 1, 0.001).name('Alpha');
  colorGui.close();
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
