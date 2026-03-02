/**
 * =============================================================================
 * SPLAT DATA LOADER
 * =============================================================================
 *
 * This module handles streaming and parsing of 3D Gaussian Splatting data files.
 *
 * SPLAT FILE FORMAT (.splat):
 * ---------------------------
 * A binary format storing Gaussian parameters in a fixed 32-byte row structure:
 *
 *   Offset  Size  Type      Description
 *   ------  ----  --------  ----------------------------------------
 *   0       12    float32×3 Position (x, y, z) in world space
 *   12      12    float32×3 Scale (sx, sy, sz) - axis lengths of ellipsoid
 *   24      4     uint8×4   Color (R, G, B, A) - 0-255 each
 *   28      4     uint8×4   Rotation quaternion (x, y, z, w) - quantized
 *
 * The rotation quaternion is stored as 4 bytes, each representing a component
 * scaled from [-1, 1] to [0, 255]. This quantization is lossy but acceptable
 * for visualization purposes.
 *
 * RELATIONSHIP TO GAUSSIAN COVARIANCE:
 * ------------------------------------
 * Each 3D Gaussian is defined by its covariance matrix Σ (3×3 symmetric).
 * Instead of storing Σ directly (6 unique values), we store:
 *   - Scale (s): diagonal of scale matrix S = diag(sx, sy, sz)
 *   - Rotation (q): quaternion representing rotation matrix R
 *
 * The covariance is reconstructed as: Σ = R * S * S^T * R^T
 * This is more compact and allows easy editing of Gaussian shape.
 */

/**
 * Size of one Gaussian record in the .splat file format.
 * 32 bytes = 12 (position) + 12 (scale) + 4 (color) + 4 (quaternion)
 */
export const SPLAT_ROW_BYTES = 3 * 4 + 3 * 4 + 4 + 4;

/** Progress update during streaming load */
export interface StreamUpdate {
  bytesRead: number;
  totalBytes: number | null;
  /** Number of complete Gaussians loaded so far */
  vertexCount: number;
  buffer: ArrayBuffer;
  done: boolean;
}

/**
 * Streams a .splat file from a URL, calling onChunk as data arrives.
 * This enables progressive rendering - users see content before full load.
 *
 * @param url - URL to the .splat file
 * @param onChunk - Called with each chunk of data received
 * @returns The complete file as a Uint8Array
 */
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
