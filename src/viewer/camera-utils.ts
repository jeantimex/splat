/**
 * =============================================================================
 * CAMERA UTILITY FUNCTIONS FOR 3DGS VIEWER
 * =============================================================================
 *
 * Helper functions for camera manipulation and stereo rendering.
 */

import { invert4, translate4, type Mat4 } from './camera';

/** Quaternion as [x, y, z, w] */
export type Quat = [number, number, number, number];

/** Position as [x, y, z] */
export type Vec3 = [number, number, number];

/**
 * Extracts position and rotation quaternion from a view matrix.
 * The view matrix transforms world → camera space.
 *
 * @param view - View matrix (column-major)
 * @returns Object with position and rotation quaternion
 */
export function decomposeViewMatrix(view: Mat4): { position: Vec3; quaternion: Quat } {
  // Invert to get camera-to-world transform
  const inv = invert4(view);
  if (!inv) {
    return { position: [0, 0, 0], quaternion: [0, 0, 0, 1] };
  }

  // Position is the translation column (column 3)
  const position: Vec3 = [inv[12], inv[13], inv[14]];

  // Extract rotation matrix (upper-left 3x3)
  // Column-major: columns are at indices [0,1,2], [4,5,6], [8,9,10]
  const m00 = inv[0], m10 = inv[1], m20 = inv[2];
  const m01 = inv[4], m11 = inv[5], m21 = inv[6];
  const m02 = inv[8], m12 = inv[9], m22 = inv[10];

  // Convert rotation matrix to quaternion
  // Using Shepperd's method for numerical stability
  const trace = m00 + m11 + m22;
  let qx: number, qy: number, qz: number, qw: number;

  if (trace > 0) {
    const s = 0.5 / Math.sqrt(trace + 1.0);
    qw = 0.25 / s;
    qx = (m21 - m12) * s;
    qy = (m02 - m20) * s;
    qz = (m10 - m01) * s;
  } else if (m00 > m11 && m00 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
    qw = (m21 - m12) / s;
    qx = 0.25 * s;
    qy = (m01 + m10) / s;
    qz = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
    qw = (m02 - m20) / s;
    qx = (m01 + m10) / s;
    qy = 0.25 * s;
    qz = (m12 + m21) / s;
  } else {
    const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
    qw = (m10 - m01) / s;
    qx = (m02 + m20) / s;
    qy = (m12 + m21) / s;
    qz = 0.25 * s;
  }

  // Normalize quaternion
  const len = Math.sqrt(qx * qx + qy * qy + qz * qz + qw * qw);
  if (len > 1e-6) {
    qx /= len;
    qy /= len;
    qz /= len;
    qw /= len;
  }

  return { position, quaternion: [qx, qy, qz, qw] };
}

/**
 * Composes a view matrix from position and rotation quaternion.
 *
 * @param position - Camera position in world space
 * @param quaternion - Camera rotation as quaternion [x, y, z, w]
 * @returns View matrix (world → camera transform)
 */
export function composeViewMatrix(position: Vec3, quaternion: Quat): Mat4 {
  const [qx, qy, qz, qw] = quaternion;

  // Convert quaternion to rotation matrix
  const xx = qx * qx, yy = qy * qy, zz = qz * qz;
  const xy = qx * qy, xz = qx * qz, yz = qy * qz;
  const wx = qw * qx, wy = qw * qy, wz = qw * qz;

  // Rotation matrix (camera-to-world)
  const r00 = 1 - 2 * (yy + zz);
  const r01 = 2 * (xy - wz);
  const r02 = 2 * (xz + wy);
  const r10 = 2 * (xy + wz);
  const r11 = 1 - 2 * (xx + zz);
  const r12 = 2 * (yz - wx);
  const r20 = 2 * (xz - wy);
  const r21 = 2 * (yz + wx);
  const r22 = 1 - 2 * (xx + yy);

  // View matrix = inverse of camera-to-world
  // For rotation: inverse = transpose
  // Translation: -R^T * position
  const tx = -(r00 * position[0] + r10 * position[1] + r20 * position[2]);
  const ty = -(r01 * position[0] + r11 * position[1] + r21 * position[2]);
  const tz = -(r02 * position[0] + r12 * position[1] + r22 * position[2]);

  return [
    r00, r01, r02, 0,
    r10, r11, r12, 0,
    r20, r21, r22, 0,
    tx, ty, tz, 1,
  ];
}

/**
 * Spherical linear interpolation (SLERP) between two quaternions.
 * This produces smooth rotation interpolation that follows the shortest arc.
 *
 * @param a - Start quaternion
 * @param b - End quaternion
 * @param t - Interpolation factor [0, 1]
 * @returns Interpolated quaternion
 */
export function slerpQuat(a: Quat, b: Quat, t: number): Quat {
  let [ax, ay, az, aw] = a;
  let [bx, by, bz, bw] = b;

  // Compute dot product (cosine of angle between quaternions)
  let dot = ax * bx + ay * by + az * bz + aw * bw;

  // If dot is negative, negate one quaternion to take shorter path
  if (dot < 0) {
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
    dot = -dot;
  }

  // If quaternions are very close, use linear interpolation
  if (dot > 0.9995) {
    const rx = ax + t * (bx - ax);
    const ry = ay + t * (by - ay);
    const rz = az + t * (bz - az);
    const rw = aw + t * (bw - aw);
    const len = Math.sqrt(rx * rx + ry * ry + rz * rz + rw * rw);
    return [rx / len, ry / len, rz / len, rw / len];
  }

  // SLERP formula
  const theta = Math.acos(dot);
  const sinTheta = Math.sin(theta);
  const wa = Math.sin((1 - t) * theta) / sinTheta;
  const wb = Math.sin(t * theta) / sinTheta;

  return [
    wa * ax + wb * bx,
    wa * ay + wb * by,
    wa * az + wb * bz,
    wa * aw + wb * bw,
  ];
}

/**
 * Linear interpolation between two 3D vectors.
 */
export function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    a[0] + t * (b[0] - a[0]),
    a[1] + t * (b[1] - a[1]),
    a[2] + t * (b[2] - a[2]),
  ];
}

/**
 * Interpolates between two view matrices using SLERP for rotation
 * and linear interpolation for position. This produces natural-looking
 * camera motion that follows smooth arcs for rotation.
 *
 * @param from - Start view matrix
 * @param to - Target view matrix
 * @param t - Interpolation factor [0, 1]
 * @returns Interpolated view matrix
 */
export function interpolateViewMatrix(from: Mat4, to: Mat4, t: number): Mat4 {
  const fromDecomp = decomposeViewMatrix(from);
  const toDecomp = decomposeViewMatrix(to);

  const position = lerpVec3(fromDecomp.position, toDecomp.position, t);
  const quaternion = slerpQuat(fromDecomp.quaternion, toDecomp.quaternion, t);

  return composeViewMatrix(position, quaternion);
}
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
