import './style.css';
import GUI from 'lil-gui';
import { createControls } from './viewer/controls';
import { createWebGPURenderer } from './viewer/renderer-webgpu';
import {
  DEFAULT_CAMERAS,
  getProjectionMatrix,
  getViewMatrix,
  multiply4,
  type CameraPose,
  type Mat4,
} from './viewer/camera';
import { SPLAT_ROW_BYTES, streamSplat } from './viewer/loader';
import { createSortWorker } from './viewer/sort-worker';

const STREAM_UPDATE_VERTEX_STEP = 8192;
const PLY_MAGIC = [112, 108, 121, 10];

interface ViewerDom {
  canvas: HTMLCanvasElement;
  message: HTMLDivElement;
  fps: HTMLSpanElement;
  progress: HTMLDivElement;
  camId: HTMLSpanElement;
}

const dom = getViewerDom();

async function main() {
  if (!navigator.gpu) {
    dom.message.textContent = 'WebGPU is not available in this browser.';
    return;
  }

  const renderer = await createWebGPURenderer(dom.canvas);
  const controls = createControls(dom.canvas);
  const renderOptions = {
    pointCloud: false,
    pointSize: 0.5,
  };
  const gui = createGui(renderOptions);

  let cameras: CameraPose[] = [...DEFAULT_CAMERAS];
  let currentCameraIndex = 0;
  let loadedVertices = 0;

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

  const setViewFromHash = (hashValue: string) => {
    const matrix = decodeViewMatrix(hashValue);
    if (!matrix) return false;
    controls.setViewMatrix(matrix);
    controls.setCarousel(false);
    dom.camId.textContent = '';
    return true;
  };

  const saveViewToHash = () => {
    location.hash = `#${encodeURIComponent(encodeViewMatrix(controls.viewMatrix))}`;
    dom.camId.textContent = '';
  };

  const sortWorker = createSortWorker({
    onSortResult: ({ depthIndex }) => {
      renderer.setSortedIndices(depthIndex);
    },
    onSplatData: ({ splatData, vertexCount }) => {
      loadedVertices = vertexCount;
      renderer.setSplatData(splatData, vertexCount);
      dom.message.textContent = '';
    },
    onConvertedBuffer: (buffer, save) => {
      const uint = new Uint8Array(buffer);
      loadedVertices = Math.floor(uint.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      if (save) {
        downloadBinary(uint, 'model.splat');
      }
    },
  });

  if (!setViewFromHash(location.hash.slice(1))) {
    applyCamera(currentCameraIndex);
  }

  registerKeyboardShortcuts({
    applyCamera,
    getCurrentCameraIndex: () => currentCameraIndex,
    saveViewToHash,
    setCarousel: (enabled) => controls.setCarousel(enabled),
    clearCameraLabel: () => {
      dom.camId.textContent = '';
    },
  });

  window.addEventListener('hashchange', () => {
    setViewFromHash(location.hash.slice(1));
  });

  registerDragDrop({
    onFile: async (file) => {
      controls.setCarousel(false);
      dom.message.textContent = `Loading ${file.name}...`;

      if (/\.json$/i.test(file.name)) {
        const parsed = JSON.parse(await file.text()) as CameraPose[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          cameras = parsed;
          applyCamera(0);
          dom.message.textContent = 'Loaded cameras.json';
        }
        return;
      }

      const buffer = await file.arrayBuffer();
      if (isPlyBuffer(buffer)) {
        sortWorker.postPlyBuffer(buffer, true);
        return;
      }

      loadedVertices = Math.floor(buffer.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      dom.message.textContent = '';
    },
  });

  const datasetUrl = new URLSearchParams(window.location.search).get('url') || '/train.splat';
  dom.message.textContent = 'Loading splat data...';

  let lastPostedVertexCount = -1;
  void streamSplat(datasetUrl, ({ vertexCount, buffer, bytesRead, totalBytes, done }) => {
    const shouldPost =
      done ||
      lastPostedVertexCount < 0 ||
      vertexCount - lastPostedVertexCount >= STREAM_UPDATE_VERTEX_STEP;

    if (vertexCount > loadedVertices || done) {
      loadedVertices = vertexCount;
    }

    if (shouldPost) {
      sortWorker.postSplatBuffer(buffer, vertexCount);
      lastPostedVertexCount = vertexCount;
    }

    if (done) {
      dom.progress.style.display = 'none';
      dom.message.textContent = '';
      return;
    }

    const progressValue = totalBytes
      ? Math.min(99, Math.round((100 * bytesRead) / totalBytes))
      : Math.min(99, Math.round(Math.log10(Math.max(bytesRead, 10)) * 20));
    dom.progress.style.width = `${progressValue}%`;
  }).catch((err: unknown) => {
    const text = err instanceof Error ? err.message : String(err);
    dom.message.textContent = `Load failed: ${text}`;
  });

  let lastFrame = performance.now();
  let smoothedFps = 0;

  const frame = (now: number) => {
    const dtMs = Math.max(now - lastFrame, 0.0001);
    lastFrame = now;

    controls.update(dtMs);

    const projection = getProjectionMatrix(
      controls.camera.fx,
      controls.camera.fy,
      dom.canvas.width || window.innerWidth,
      dom.canvas.height || window.innerHeight,
    );

    const viewProj = multiply4(projection, controls.viewMatrix);
    sortWorker.postViewProjection(viewProj);
    renderer.render({
      projection,
      view: controls.viewMatrix,
      focal: [controls.camera.fx, controls.camera.fy],
      pointCloudEnabled: renderOptions.pointCloud,
      pointSize: renderOptions.pointSize,
    });

    const fps = 1000 / dtMs;
    smoothedFps = smoothedFps * 0.9 + fps * 0.1;
    dom.fps.textContent = `${Math.round(smoothedFps)} fps | ${loadedVertices.toLocaleString()} pts`;
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
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('Missing #app root element');

  const canvas = app.querySelector<HTMLCanvasElement>('#canvas');
  const message = app.querySelector<HTMLDivElement>('#message');
  const fps = app.querySelector<HTMLSpanElement>('#fps');
  const progress = app.querySelector<HTMLDivElement>('#progress');
  const camId = app.querySelector<HTMLSpanElement>('#camid');

  if (!canvas || !message || !fps || !progress || !camId) {
    throw new Error('Missing viewer DOM nodes');
  }

  return { canvas, message, fps, progress, camId };
}

function normalizeIndex(index: number, size: number): number {
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
  const rounded = matrix.map((value) => Math.round(value * 100) / 100);
  return JSON.stringify(rounded);
}

function downloadBinary(data: Uint8Array, filename: string) {
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

function createGui(renderOptions: { pointCloud: boolean; pointSize: number }) {
  const gui = new GUI({ title: 'Render' });
  gui.add(renderOptions, 'pointCloud').name('Point Cloud');
  gui.add(renderOptions, 'pointSize', 0.5, 6, 0.1).name('Point Size');
  return gui;
}
