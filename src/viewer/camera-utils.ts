/**
 * =============================================================================
 * CAMERA UTILITY FUNCTIONS FOR 3DGS VIEWER
 * =============================================================================
 *
 * Helper functions for camera manipulation and stereo rendering.
 */

import { invert4, translate4, type Mat4 } from './camera';
import type { createControls } from './controls';

/**
 * Computes the view matrix for a stereo eye offset.
 *
 * For stereo rendering (anaglyph or side-by-side), we need separate
 * view matrices for left and right eyes. This function creates an
 * offset view by translating the camera position horizontally.
 *
 * @param view - Base view matrix (center eye)
 * @param eyeOffset - Horizontal offset in world units (negative = left, positive = right)
 * @returns View matrix for the offset eye position
 */
export function getEyeViewMatrix(view: Mat4, eyeOffset: number): Mat4 {
  const inv = invert4(view);
  if (!inv) return view;
  // Translate in camera space (X = right)
  const shifted = translate4(inv, eyeOffset, 0, 0);
  const out = invert4(shifted);
  return out ?? view;
}

/**
 * Centers the camera on the loaded splat data.
 *
 * Samples Gaussian positions to find the centroid of the scene,
 * then positions the camera at that center while preserving
 * the current camera orientation.
 *
 * This provides a reasonable initial view when loading a new scene.
 *
 * @param splatData - Packed Gaussian data (8 uint32 per Gaussian)
 * @param vertexCount - Number of Gaussians
 * @param controls - Camera controls to update
 */
export function centerCamera(
  splatData: Uint32Array,
  vertexCount: number,
  controls: ReturnType<typeof createControls>,
): void {
  if (vertexCount === 0) return;

  // Sample up to 10000 positions to compute centroid
  let avgX = 0,
    avgY = 0,
    avgZ = 0;
  const sampleSize = Math.min(vertexCount, 10000);
  const step = Math.floor(vertexCount / sampleSize) * 8; // 8 uint32 per Gaussian

  for (let i = 0; i < sampleSize; i++) {
    // Positions are stored as float32 bit patterns in first 3 uint32
    const x = new Float32Array(splatData.buffer, i * step * 4, 1)[0];
    const y = new Float32Array(splatData.buffer, (i * step + 1) * 4, 1)[0];
    const z = new Float32Array(splatData.buffer, (i * step + 2) * 4, 1)[0];
    avgX += x;
    avgY += y;
    avgZ += z;
  }

  const center = [avgX / sampleSize, avgY / sampleSize, avgZ / sampleSize];

  // Extract current camera orientation from view matrix
  // View matrix columns are camera axes in world space
  const nR = [controls.viewMatrix[0], controls.viewMatrix[4], controls.viewMatrix[8]]; // Right
  const nU = [controls.viewMatrix[1], controls.viewMatrix[5], controls.viewMatrix[9]]; // Up
  const nF = [controls.viewMatrix[2], controls.viewMatrix[6], controls.viewMatrix[10]]; // Forward

  // Position camera at the scene center
  const camPos = center;

  // Build new view matrix with same orientation but new position
  // Translation is computed as: t = -R^T * position
  const nextView: Mat4 = [
    nR[0],
    nU[0],
    nF[0],
    0,
    nR[1],
    nU[1],
    nF[1],
    0,
    nR[2],
    nU[2],
    nF[2],
    0,
    -camPos[0] * nR[0] - camPos[1] * nU[0] - camPos[2] * nF[0],
    -camPos[0] * nR[1] - camPos[1] * nU[1] - camPos[2] * nF[1],
    -camPos[0] * nR[2] - camPos[1] * nU[2] - camPos[2] * nF[2],
    1,
  ];
  controls.setViewMatrix(nextView);
}
