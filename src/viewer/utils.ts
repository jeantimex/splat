/**
 * =============================================================================
 * UTILITY FUNCTIONS FOR 3DGS VIEWER
 * =============================================================================
 *
 * General-purpose utility functions.
 */

import type { Mat4 } from './camera';

/**
 * ASCII bytes for the text "ply\n" (112='p', 108='l', 121='y', 10='\n').
 * PLY (Polygon File Format) is a common format for 3D Gaussian Splatting data.
 * We use this magic number to quickly identify PLY files vs raw .splat files.
 */
const PLY_MAGIC = [112, 108, 121, 10];

/**
 * Safe modulo that works for negative inputs.
 *
 * JavaScript's % operator returns negative values for negative inputs,
 * but for array indexing we want to wrap around: -1 % 5 = 4, not -1.
 *
 * @param index - The index to normalize
 * @param size - The array size to wrap within
 * @returns Index in range [0, size-1]
 */
export function normalizeIndex(index: number, size: number): number {
  return ((index % size) + size) % size;
}

/**
 * Decodes a view matrix from a URL-encoded JSON string.
 *
 * @param encoded - URL-encoded JSON array of 16 numbers
 * @returns Decoded 4x4 matrix, or null if invalid
 */
export function decodeViewMatrix(encoded: string): Mat4 | null {
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

/**
 * Encodes a view matrix to a JSON string suitable for URL storage.
 * Quantizes values to 2 decimal places for shorter URLs.
 *
 * @param matrix - 4x4 view matrix
 * @returns JSON string representation
 */
export function encodeViewMatrix(matrix: Mat4): string {
  // Quantize for shorter URL hash while keeping usable precision.
  const rounded = matrix.map((value) => Math.round(value * 100) / 100);
  return JSON.stringify(rounded);
}

/**
 * Triggers a browser download of binary data.
 *
 * @param data - Binary data to download
 * @param filename - Suggested filename for the download
 */
export function downloadBinary(data: Uint8Array, filename: string): void {
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

/**
 * Checks if a buffer contains PLY file data by examining the magic header.
 *
 * @param buffer - Buffer to check
 * @returns True if buffer starts with "ply\n"
 */
export function isPlyBuffer(buffer: ArrayBuffer): boolean {
  // Header-only check; sufficient for routing dropped files.
  const bytes = new Uint8Array(buffer);
  return PLY_MAGIC.every((value, index) => bytes[index] === value);
}
