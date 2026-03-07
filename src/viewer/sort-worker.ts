/**
 * =============================================================================
 * SORT WORKER BRIDGE - MAIN THREAD INTERFACE
 * =============================================================================
 *
 * This module provides the main thread interface to the sort worker.
 * The worker runs in a separate thread to avoid blocking the UI during:
 *
 * 1. DEPTH SORTING (every frame when camera moves)
 *    - Sort Gaussians by view-space depth for correct alpha blending
 *    - Uses counting sort for O(n) performance with millions of Gaussians
 *    - Returns sorted index array for GPU instanced rendering
 *
 * 2. PLY PARSING (on file load)
 *    - Convert PLY format Gaussians to internal packed format
 *    - Extract position, rotation, scale, color, opacity
 *    - Precompute covariance matrices
 *
 * WHY A SEPARATE WORKER?
 * ----------------------
 * Sorting millions of Gaussians takes 5-50ms depending on count.
 * This would cause noticeable frame drops if done on main thread.
 * By running in a worker:
 * - Main thread stays responsive for rendering and user input
 * - Sort can overlap with GPU rendering
 * - Latency is acceptable since sort doesn't need to be perfectly in sync
 *
 * COMMUNICATION PROTOCOL:
 * -----------------------
 * Main → Worker:
 *   - 'view': New viewProjection matrix → triggers sort
 *   - 'buffer': Raw .splat data → store and prepare for sorting
 *   - 'ply': PLY file data → parse and convert to internal format
 *
 * Worker → Main:
 *   - 'depth': Sorted index array → upload to GPU
 *   - 'splat': Packed GPU data → upload to storage buffer
 *   - 'buffer': Converted PLY data → can be saved as .splat
 */

/** Interface for communicating with the sort worker from main thread */
export interface SortWorkerBridge {
  /** Send new camera viewProjection matrix to trigger re-sort */
  postViewProjection: (viewProj: number[]) => void;
  /** Send raw .splat file buffer for processing */
  postSplatBuffer: (buffer: ArrayBuffer, vertexCount: number) => void;
  /** Send PLY file buffer for parsing and conversion */
  postPlyBuffer: (buffer: ArrayBuffer, save?: boolean) => void;
  /** Terminate the worker thread */
  terminate: () => void;
}

/** Result of depth sorting operation */
export interface SortResult {
  /** Gaussian indices in back-to-front order for current view */
  depthIndex: Uint32Array;
  /** Number of visible Gaussians */
  vertexCount: number;
  /** Time taken for sort in milliseconds */
  sortMs: number;
}

/** Packed GPU data for all Gaussians */
export interface SplatPayload {
  /** Packed Gaussian data: 8 uint32 per Gaussian */
  splatData: Uint32Array;
  /** Total number of Gaussians */
  vertexCount: number;
  /** CPU-side load/preprocess timings in milliseconds */
  loadMs: {
    reorderMs: number;
    packMs: number;
    totalMs: number;
  };
}

/** Callbacks for receiving data from the sort worker */
export interface SortWorkerCallbacks {
  /** Called when depth sorting completes */
  onSortResult?: (result: SortResult) => void;
  /** Called when splat data is ready for GPU upload */
  onSplatData?: (payload: SplatPayload) => void;
  /** Called when PLY conversion completes */
  onConvertedBuffer?: (buffer: ArrayBuffer, save: boolean) => void;
}

/** Message types sent from worker to main thread */
type WorkerMessage =
  | { type: 'depth'; depthIndex: ArrayBuffer; vertexCount: number; sortMs: number }
  | {
      type: 'splat';
      splatData: ArrayBuffer;
      vertexCount: number;
      loadMs: { reorderMs: number; packMs: number; totalMs: number };
    }
  | { type: 'buffer'; buffer: ArrayBuffer; save: boolean };

/**
 * Creates a sort worker and returns the bridge interface.
 * The worker is spawned as a module worker for ES module support.
 */
export function createSortWorker(callbacks: SortWorkerCallbacks): SortWorkerBridge {
  const worker = new Worker(new URL('./sort-worker.worker.ts', import.meta.url), {
    type: 'module',
  });

  worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const data = event.data;
    if (data.type === 'depth') {
      callbacks.onSortResult?.({
        depthIndex: new Uint32Array(data.depthIndex),
        vertexCount: data.vertexCount,
        sortMs: data.sortMs,
      });
      return;
    }

    if (data.type === 'splat') {
      callbacks.onSplatData?.({
        splatData: new Uint32Array(data.splatData),
        vertexCount: data.vertexCount,
        loadMs: data.loadMs,
      });
      return;
    }

    if (data.type === 'buffer') {
      callbacks.onConvertedBuffer?.(data.buffer, data.save);
    }
  };

  return {
    postViewProjection(viewProj) {
      worker.postMessage({ type: 'view', viewProj });
    },
    postSplatBuffer(buffer, vertexCount) {
      worker.postMessage({ type: 'buffer', buffer, vertexCount }, [buffer]);
    },
    postPlyBuffer(buffer, save = false) {
      worker.postMessage({ type: 'ply', buffer, save }, [buffer]);
    },
    terminate() {
      worker.terminate();
    },
  };
}
