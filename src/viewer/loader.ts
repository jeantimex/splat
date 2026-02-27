export const SPLAT_ROW_BYTES = 3 * 4 + 3 * 4 + 4 + 4;

export interface StreamUpdate {
  bytesRead: number;
  totalBytes: number | null;
  vertexCount: number;
  buffer: ArrayBuffer;
  done: boolean;
}

export async function streamSplat(
  url: string,
  onChunk: (payload: StreamUpdate) => void,
): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`Unable to load splat data from ${url}`);
  }

  const contentLength = Number(response.headers.get('content-length') || 0);
  const totalBytes = contentLength > 0 ? contentLength : null;
  let data = new Uint8Array(Math.max(contentLength, 1024 * 1024));
  const reader = response.body.getReader();

  let bytesRead = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (bytesRead + value.byteLength > data.byteLength) {
      const grown = new Uint8Array(Math.max(data.byteLength * 2, bytesRead + value.byteLength));
      grown.set(data);
      data = grown;
    }
    data.set(value, bytesRead);
    bytesRead += value.byteLength;

    onChunk({
      bytesRead,
      totalBytes,
      vertexCount: Math.floor(bytesRead / SPLAT_ROW_BYTES),
      buffer: data.buffer,
      done: false,
    });
  }

  const finalBuffer = data.buffer.slice(0, bytesRead);
  onChunk({
    bytesRead,
    totalBytes,
    vertexCount: Math.floor(bytesRead / SPLAT_ROW_BYTES),
    buffer: finalBuffer,
    done: true,
  });
  return new Uint8Array(finalBuffer);
}
