import './style.css';
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

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app root element');

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
const message = document.querySelector<HTMLDivElement>('#message');
const fpsLabel = document.querySelector<HTMLSpanElement>('#fps');
const progress = document.querySelector<HTMLDivElement>('#progress');
const camId = document.querySelector<HTMLSpanElement>('#camid');

if (!canvas || !message || !fpsLabel || !progress || !camId) {
  throw new Error('Missing viewer DOM nodes');
}

const canvasEl = canvas;
const messageEl = message;
const fpsLabelEl = fpsLabel;
const progressEl = progress;
const camIdEl = camId;

async function main() {
  if (!navigator.gpu) {
    messageEl.textContent = 'WebGPU is not available in this browser.';
    return;
  }

  const renderer = await createWebGPURenderer(canvasEl);
  const controls = createControls(canvasEl);
  let cameras: CameraPose[] = [...DEFAULT_CAMERAS];
  let currentCameraIndex = 0;
  let loadedVertices = 0;

  const applyCamera = (index: number) => {
    if (!cameras.length) return;
    currentCameraIndex = ((index % cameras.length) + cameras.length) % cameras.length;
    const camera = cameras[currentCameraIndex];
    controls.camera.fx = camera.fx;
    controls.camera.fy = camera.fy;
    controls.setViewMatrix(getViewMatrix(camera));
    controls.setCarousel(false);
    camIdEl.textContent = `cam ${currentCameraIndex}`;
  };

  const setViewFromHash = (encoded: string) => {
    if (!encoded) return false;
    try {
      const parsed = JSON.parse(decodeURIComponent(encoded)) as unknown;
      if (!Array.isArray(parsed) || parsed.length !== 16) return false;
      const matrix = parsed.map(Number);
      if (matrix.some((value) => Number.isNaN(value))) return false;
      controls.setViewMatrix(matrix as Mat4);
      controls.setCarousel(false);
      camIdEl.textContent = '';
      return true;
    } catch {
      return false;
    }
  };

  const saveViewToHash = () => {
    const rounded = controls.viewMatrix.map((value) => Math.round(value * 100) / 100);
    location.hash = `#${encodeURIComponent(JSON.stringify(rounded))}`;
    camIdEl.textContent = '';
  };
  const sortWorker = createSortWorker({
    onSortResult: ({ depthIndex }) => {
      renderer.setSortedIndices(depthIndex);
    },
    onSplatData: ({ splatData, vertexCount }) => {
      loadedVertices = vertexCount;
      renderer.setSplatData(splatData, vertexCount);
      messageEl.textContent = '';
    },
    onConvertedBuffer: (buffer, save) => {
      const uint = new Uint8Array(buffer);
      loadedVertices = Math.floor(uint.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      if (save) {
        const blob = new Blob([uint], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.download = 'model.splat';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
      }
    },
  });

  if (!setViewFromHash(location.hash.slice(1))) {
    applyCamera(currentCameraIndex);
  }

  const params = new URLSearchParams(window.location.search);
  const datasetUrl = params.get('url') || '/train.splat';

  messageEl.textContent = 'Loading splat data...';
  let lastPostedVertexCount = -1;
  void streamSplat(datasetUrl, ({ vertexCount, buffer, bytesRead, totalBytes, done }) => {
    const shouldPost =
      done || lastPostedVertexCount < 0 || vertexCount - lastPostedVertexCount >= 8192;
    if (vertexCount > loadedVertices || done) {
      loadedVertices = vertexCount;
    }
    if (shouldPost) {
      sortWorker.postSplatBuffer(buffer, vertexCount);
      lastPostedVertexCount = vertexCount;
    }
    if (done) {
      progressEl.style.display = 'none';
      messageEl.textContent = '';
    } else {
      const progressValue = totalBytes
        ? Math.min(99, Math.round((100 * bytesRead) / totalBytes))
        : Math.min(99, Math.round(Math.log10(Math.max(bytesRead, 10)) * 20));
      progressEl.style.width = `${progressValue}%`;
    }
  }).catch((err: unknown) => {
    const text = err instanceof Error ? err.message : String(err);
    messageEl.textContent = `Load failed: ${text}`;
  });

  let lastFrame = performance.now();
  let smoothedFps = 0;

  window.addEventListener('keydown', (event) => {
    if (/^\d$/.test(event.key)) {
      applyCamera(Number.parseInt(event.key, 10));
      return;
    }
    if (event.key === '-' || event.key === '_') {
      applyCamera(currentCameraIndex - 1);
      return;
    }
    if (event.key === '+' || event.key === '=') {
      applyCamera(currentCameraIndex + 1);
      return;
    }
    if (event.code === 'KeyP') {
      controls.setCarousel(true);
      camIdEl.textContent = '';
      return;
    }
    if (event.code === 'KeyV') {
      saveViewToHash();
    }
  });

  window.addEventListener('hashchange', () => {
    setViewFromHash(location.hash.slice(1));
  });

  const preventDefault = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  document.addEventListener('dragenter', preventDefault);
  document.addEventListener('dragover', preventDefault);
  document.addEventListener('dragleave', preventDefault);
  document.addEventListener('drop', async (event) => {
    preventDefault(event);
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    controls.setCarousel(false);
    messageEl.textContent = `Loading ${file.name}...`;

    if (/\.json$/i.test(file.name)) {
      const text = await file.text();
      const parsed = JSON.parse(text) as CameraPose[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        cameras = parsed;
        applyCamera(0);
        messageEl.textContent = 'Loaded cameras.json';
      }
      return;
    }

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const isPly = bytes[0] === 112 && bytes[1] === 108 && bytes[2] === 121 && bytes[3] === 10;
    if (isPly) {
      sortWorker.postPlyBuffer(buffer, true);
    } else {
      loadedVertices = Math.floor(bytes.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      messageEl.textContent = '';
    }
  });

  const frame = (now: number) => {
    const dtMs = Math.max(now - lastFrame, 0.0001);
    lastFrame = now;

    controls.update(dtMs);

    const projection = getProjectionMatrix(
      controls.camera.fx,
      controls.camera.fy,
      canvasEl.width || window.innerWidth,
      canvasEl.height || window.innerHeight,
    );
    const viewProj = multiply4(projection, controls.viewMatrix);
    sortWorker.postViewProjection(viewProj);
    renderer.render({
      projection,
      view: controls.viewMatrix,
      focal: [controls.camera.fx, controls.camera.fy],
    });

    const fps = 1000 / dtMs;
    smoothedFps = smoothedFps * 0.9 + fps * 0.1;
    fpsLabelEl.textContent = `${Math.round(smoothedFps)} fps | ${loadedVertices.toLocaleString()} pts`;
    requestAnimationFrame(frame);
  };

  window.addEventListener('beforeunload', () => sortWorker.terminate());
  requestAnimationFrame(frame);
}

main().catch((err: unknown) => {
  const text = err instanceof Error ? err.message : String(err);
  messageEl.textContent = `Renderer init failed: ${text}`;
});
