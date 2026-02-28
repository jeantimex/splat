export interface SortWorkerBridge {
  postViewProjection: (viewProj: number[]) => void;
  postSplatBuffer: (buffer: ArrayBuffer, vertexCount: number) => void;
  postPlyBuffer: (buffer: ArrayBuffer, save?: boolean) => void;
  terminate: () => void;
}

export interface SortResult {
  depthIndex: Uint32Array;
  vertexCount: number;
  sortMs: number;
}

export interface SplatPayload {
  splatData: Uint32Array;
  vertexCount: number;
}

export interface SortWorkerCallbacks {
  onSortResult?: (result: SortResult) => void;
  onSplatData?: (payload: SplatPayload) => void;
  onConvertedBuffer?: (buffer: ArrayBuffer, save: boolean) => void;
}

type WorkerMessage =
  | { type: 'depth'; depthIndex: ArrayBuffer; vertexCount: number; sortMs: number }
  | { type: 'splat'; splatData: ArrayBuffer; vertexCount: number }
  | { type: 'buffer'; buffer: ArrayBuffer; save: boolean };

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
