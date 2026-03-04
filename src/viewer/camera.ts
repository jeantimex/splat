/**
 * =============================================================================
 * CAMERA MATHEMATICS FOR 3D GAUSSIAN SPLATTING
 * =============================================================================
 *
 * This module provides camera matrix computations essential for 3DGS rendering.
 *
 * COORDINATE SYSTEMS:
 * -------------------
 * 1. WORLD SPACE: The global coordinate system where Gaussians are defined
 *    - Origin and axes determined by the training data
 *    - Gaussian positions are in world space
 *
 * 2. CAMERA SPACE (View Space): Relative to camera position/orientation
 *    - Origin at camera position
 *    - +X points right, +Y points up, +Z points backward (into screen)
 *    - View matrix transforms world → camera space
 *
 * 3. CLIP SPACE (NDC): Normalized device coordinates after projection
 *    - X, Y ∈ [-1, 1] for visible content
 *    - Z ∈ [0, 1] for depth (WebGPU convention)
 *    - Projection matrix transforms camera → clip space
 *
 * 4. SCREEN SPACE: Final pixel coordinates
 *    - X ∈ [0, width], Y ∈ [0, height]
 *    - GPU handles clip → screen transform
 *
 * MATRIX CONVENTIONS:
 * -------------------
 * - Column-major storage (like WebGL/WebGPU)
 * - Mat4 = [m00, m10, m20, m30, m01, m11, m21, m31, m02, ...]
 * - Right-handed coordinate system
 * - Transforms applied right-to-left: proj × view × position
 *
 * INTRINSIC VS EXTRINSIC PARAMETERS:
 * ----------------------------------
 * - Intrinsics (fx, fy): Focal lengths, determine field of view
 * - Extrinsics (position, rotation): Camera pose in world space
 *
 * For 3DGS, intrinsics should match the training camera to ensure
 * Gaussians project correctly. Mismatched intrinsics cause distortion.
 */

/** 4x4 matrix stored as 16 floats in column-major order */
export type Mat4 = number[];

/**
 * Camera intrinsic parameters.
 * These define the camera's optical properties (like a lens).
 */
export interface CameraIntrinsics {
  /**
   * Horizontal focal length in pixels.
   * Relates to horizontal FOV: fov_x = 2 * atan(width / (2 * fx))
   */
  fx: number;
  /**
   * Vertical focal length in pixels.
   * Relates to vertical FOV: fov_y = 2 * atan(height / (2 * fy))
   */
  fy: number;
}

/**
 * Complete camera pose from training data.
 * Combines intrinsics (optical) with extrinsics (position/orientation).
 *
 * This format matches COLMAP/NeRF camera conventions used in 3DGS training.
 */
export interface CameraPose extends CameraIntrinsics {
  /** Unique identifier for this camera */
  id: number | string;
  /** Reference image filename (from training dataset) */
  img_name: string;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /**
   * Camera position in world space [x, y, z].
   * This is where the camera is located.
   */
  position: [number, number, number];
  /**
   * Rotation matrix as 3x3 array (row-major).
   * Transforms from camera space to world space.
   *
   * Columns represent camera axes in world coordinates:
   *   - Column 0: Camera right (+X)
   *   - Column 1: Camera up (+Y)
   *   - Column 2: Camera forward (+Z, into scene)
   */
  rotation: [[number, number, number], [number, number, number], [number, number, number]];
}

export const DEFAULT_INTRINSICS: CameraIntrinsics = {
  fx: 1159.5880733038064,
  fy: 1164.6601287484507,
};

export const DEFAULT_CAMERAS: CameraPose[] = [
  {
    id: 0,
    img_name: '00001',
    width: 1959,
    height: 1090,
    position: [-3.0089893469241797, -0.11086489695181866, -3.7527640949141428],
    rotation: [
      [0.877318, 0, 0.479909],
      [0.013344, 0.999613, -0.024394],
      [-0.479724, 0.027805, 0.876979],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 1,
    img_name: '00009',
    width: 1959,
    height: 1090,
    position: [-2.5199776022057296, -0.09704735754873686, -3.6247725540304545],
    rotation: [
      [0.9982731285632193, -0.011928707708098955, -0.05751927260507243],
      [0.0065061360949636325, 0.9955928229282383, -0.09355533724430458],
      [0.058381769258182864, 0.09301955098900708, 0.9939511719154457],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 2,
    img_name: '00017',
    width: 1959,
    height: 1090,
    position: [-0.7737533667465242, -0.3364271945329695, -2.9358969417573753],
    rotation: [
      [0.9998813418672372, 0.013742375651625236, -0.0069605529394208224],
      [-0.014268370388586709, 0.996512943252834, -0.08220929105659476],
      [0.00580653013657589, 0.08229885200307129, 0.9965907801935302],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 3,
    img_name: '00025',
    width: 1959,
    height: 1090,
    position: [1.2198221749590001, -0.2196687861401182, -2.3183162007028453],
    rotation: [
      [0.9208648867765482, 0.0012010625395201253, 0.389880004297208],
      [-0.06298204172269357, 0.987319521752825, 0.14571693239364383],
      [-0.3847611242348369, -0.1587410451475895, 0.9092635249821667],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 4,
    img_name: '00033',
    width: 1959,
    height: 1090,
    position: [1.742387858893817, -0.13848225198886954, -2.0566370113193146],
    rotation: [
      [0.24669889292141334, -0.08370189346592856, -0.9654706879349405],
      [0.11343747891376445, 0.9919082664242816, -0.05700815184573074],
      [0.9624300466054861, -0.09545671285663988, 0.2541976029815521],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 5,
    img_name: '00041',
    width: 1959,
    height: 1090,
    position: [3.6567309419223935, -0.16470990600750707, -1.3458085590422042],
    rotation: [
      [0.2341293058324528, -0.02968330457755884, -0.9717522161434825],
      [0.10270823606832301, 0.99469554638321, -0.005638106875665722],
      [0.9667649592295676, -0.09848690996657204, 0.2359360976431732],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 6,
    img_name: '00049',
    width: 1959,
    height: 1090,
    position: [3.9013554243203497, -0.2597500978038105, -0.8106154188297828],
    rotation: [
      [0.6717235545638952, -0.015718162115524837, -0.7406351366386528],
      [0.055627354673906296, 0.9980224478387622, 0.029270992841185218],
      [0.7387104058127439, -0.060861588786650656, 0.6712695459756353],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 7,
    img_name: '00057',
    width: 1959,
    height: 1090,
    position: [4.742994605467533, -0.05591660945412069, 0.9500365976084458],
    rotation: [
      [-0.17042655709210375, 0.01207080756938, -0.9852964448542146],
      [0.1165090336695526, 0.9931575292530063, -0.00798543433078162],
      [0.9784581921120181, -0.1161568667478904, -0.1706667764862097],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 8,
    img_name: '00065',
    width: 1959,
    height: 1090,
    position: [4.34676307626522, 0.08168160516967145, 1.0876221470355405],
    rotation: [
      [-0.003575447631888379, -0.044792503246552894, -0.9989899137764799],
      [0.10770152645126597, 0.9931680875192705, -0.04491693593046672],
      [0.9941768441149182, -0.10775333677534978, 0.0012732004866391048],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
  {
    id: 9,
    img_name: '00073',
    width: 1959,
    height: 1090,
    position: [3.264984351114202, 0.078974937336732, 1.0117200284114904],
    rotation: [
      [-0.026919994628162257, -0.1565891128261527, -0.9872968974090509],
      [0.08444552208239385, 0.983768234577625, -0.1583319754069128],
      [0.9960643893290491, -0.0876350978794554, -0.013259786205163005],
    ],
    fy: 1164.6601287484507,
    fx: 1159.5880733038064,
  },
];

export const DEFAULT_VIEW_MATRIX: Mat4 = [
  0.471108, -0.01768, 0.88, 0, 0, 0.999799, 0.02, 0, -0.882075, -0.009442, 0.47, 0, 0.07, 0.03,
  6.55, 1,
];

/**
 * Creates a perspective projection matrix from camera intrinsics.
 *
 * This matrix transforms camera-space coordinates to clip-space (NDC).
 * The projection uses focal lengths (fx, fy) which encapsulate the
 * field of view information from the training camera.
 *
 * PROJECTION MATH:
 * ----------------
 * For a point (X, Y, Z) in camera space:
 *   x_clip = (2 * fx / width) * X
 *   y_clip = (2 * fy / height) * Y  (negated for Y-down convention)
 *   z_clip = (Z - znear) * zfar / (zfar - znear)
 *
 * The result is in clip space where visible content has:
 *   x, y ∈ [-1, 1] and z ∈ [0, 1] (WebGPU depth convention)
 *
 * RELATIONSHIP TO FOV:
 * --------------------
 *   fx = width / (2 * tan(fov_x / 2))
 *   fy = height / (2 * tan(fov_y / 2))
 *
 * @param fx Horizontal focal length in pixels
 * @param fy Vertical focal length in pixels
 * @param width Viewport width in pixels
 * @param height Viewport height in pixels
 * @returns 4x4 projection matrix in column-major order
 */
export function getProjectionMatrix(fx: number, fy: number, width: number, height: number): Mat4 {
  const znear = 0.2; // Near clip plane
  const zfar = 200; // Far clip plane

  // Column-major 4x4 projection matrix
  // Note: fy is negated because screen Y is typically inverted (Y-down)
  return [
    // Column 0
    (2 * fx) / width, // m00: X scale
    0,
    0,
    0,
    // Column 1
    0,
    -(2 * fy) / height, // m11: Y scale (negated for Y-down)
    0,
    0,
    // Column 2
    0,
    0,
    zfar / (zfar - znear), // m22: Z scale for [0,1] depth
    1, // m32: perspective divide indicator
    // Column 3
    0,
    0,
    -(zfar * znear) / (zfar - znear), // m23: Z translation
    0,
  ];
}

/**
 * Creates a view matrix from a camera pose.
 *
 * The view matrix transforms world-space coordinates to camera-space.
 * It's the inverse of the camera's world transform:
 *   V = (T × R)⁻¹ = R⁻¹ × T⁻¹ = Rᵀ × (-Rᵀ × position)
 *
 * VIEW MATRIX STRUCTURE:
 * ----------------------
 * | R00  R10  R20  0 |   where R is rotation (transposed for inverse)
 * | R01  R11  R21  0 |   and the last column is -Rᵀ × position
 * | R02  R12  R22  0 |
 * | tx   ty   tz   1 |
 *
 * The result transforms a world point to camera coordinates:
 *   cam_pos = V × world_pos
 *
 * @param camera Camera pose with position and rotation
 * @returns 4x4 view matrix in column-major order
 */
export function getViewMatrix(camera: CameraPose): Mat4 {
  // Flatten 3x3 rotation to array (row-major input)
  const r = camera.rotation.flat();
  const t = camera.position;

  // Compute translation: -Rᵀ × t
  // This moves the world so camera is at origin
  const tx = -t[0] * r[0] - t[1] * r[3] - t[2] * r[6];
  const ty = -t[0] * r[1] - t[1] * r[4] - t[2] * r[7];
  const tz = -t[0] * r[2] - t[1] * r[5] - t[2] * r[8];

  // Column-major 4x4 view matrix
  return [
    // Column 0 (camera X axis in world)
    r[0],
    r[1],
    r[2],
    0,
    // Column 1 (camera Y axis in world)
    r[3],
    r[4],
    r[5],
    0,
    // Column 2 (camera Z axis in world)
    r[6],
    r[7],
    r[8],
    0,
    // Column 3 (translation to camera origin)
    tx,
    ty,
    tz,
    1,
  ];
}

/**
 * Multiplies two 4x4 matrices: result = a × b
 *
 * Matrix multiplication order matters:
 *   (a × b) × v = a × (b × v)
 *
 * For transform composition, rightmost is applied first:
 *   projection × view × model × vertex
 *
 * @param a Left matrix (applied second)
 * @param b Right matrix (applied first)
 * @returns Product matrix a × b
 */
export function multiply4(a: Mat4, b: Mat4): Mat4 {
  // Column 0 of result
  return [
    b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12],
    b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13],
    b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14],
    b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15],
    // Column 1 of result
    b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12],
    b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13],
    b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14],
    b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15],
    // Column 2 of result
    b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12],
    b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13],
    b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14],
    b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15],
    // Column 3 of result
    b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12],
    b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13],
    b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14],
    b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15],
  ];
}

/**
 * Computes the inverse of a 4x4 matrix.
 *
 * Used for camera manipulation:
 * - To get world-to-camera transform from camera-to-world (and vice versa)
 * - To extract camera position from view matrix
 *
 * Uses the adjugate matrix method:
 *   A⁻¹ = adj(A) / det(A)
 *
 * @param a Input matrix to invert
 * @returns Inverse matrix, or null if matrix is singular (det = 0)
 */
export function invert4(a: Mat4): Mat4 | null {
  // Compute 2x2 determinants of upper-left and lower-right quadrants
  const b00 = a[0] * a[5] - a[1] * a[4];
  const b01 = a[0] * a[6] - a[2] * a[4];
  const b02 = a[0] * a[7] - a[3] * a[4];
  const b03 = a[1] * a[6] - a[2] * a[5];
  const b04 = a[1] * a[7] - a[3] * a[5];
  const b05 = a[2] * a[7] - a[3] * a[6];
  const b06 = a[8] * a[13] - a[9] * a[12];
  const b07 = a[8] * a[14] - a[10] * a[12];
  const b08 = a[8] * a[15] - a[11] * a[12];
  const b09 = a[9] * a[14] - a[10] * a[13];
  const b10 = a[9] * a[15] - a[11] * a[13];
  const b11 = a[10] * a[15] - a[11] * a[14];

  // Compute determinant using Laplace expansion
  const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) return null; // Singular matrix, no inverse

  // Compute adjugate matrix divided by determinant
  return [
    (a[5] * b11 - a[6] * b10 + a[7] * b09) / det,
    (a[2] * b10 - a[1] * b11 - a[3] * b09) / det,
    (a[13] * b05 - a[14] * b04 + a[15] * b03) / det,
    (a[10] * b04 - a[9] * b05 - a[11] * b03) / det,
    (a[6] * b08 - a[4] * b11 - a[7] * b07) / det,
    (a[0] * b11 - a[2] * b08 + a[3] * b07) / det,
    (a[14] * b02 - a[12] * b05 - a[15] * b01) / det,
    (a[8] * b05 - a[10] * b02 + a[11] * b01) / det,
    (a[4] * b10 - a[5] * b08 + a[7] * b06) / det,
    (a[1] * b08 - a[0] * b10 - a[3] * b06) / det,
    (a[12] * b04 - a[13] * b02 + a[15] * b00) / det,
    (a[9] * b02 - a[8] * b04 - a[11] * b00) / det,
    (a[5] * b07 - a[4] * b09 - a[6] * b06) / det,
    (a[0] * b09 - a[1] * b07 + a[2] * b06) / det,
    (a[13] * b01 - a[12] * b03 - a[14] * b00) / det,
    (a[8] * b03 - a[9] * b01 + a[10] * b00) / det,
  ];
}

/**
 * Applies rotation to a 4x4 matrix around an arbitrary axis.
 *
 * Uses the axis-angle rotation formula (Rodrigues' rotation):
 *   R = I*cos(θ) + (1-cos(θ))*k⊗k + sin(θ)*K
 *
 * Where k is the unit axis vector and K is its skew-symmetric matrix.
 *
 * For camera control, this enables:
 * - Orbit: rotate around world Y axis
 * - Tilt: rotate around camera X axis
 * - Roll: rotate around camera Z axis
 *
 * @param a Input matrix to rotate
 * @param rad Rotation angle in radians
 * @param x X component of rotation axis
 * @param y Y component of rotation axis
 * @param z Z component of rotation axis
 * @returns Rotated matrix
 */
export function rotate4(a: Mat4, rad: number, x: number, y: number, z: number): Mat4 {
  // Normalize rotation axis
  const len = Math.hypot(x, y, z);
  if (!len) return a; // Zero-length axis, no rotation

  x /= len;
  y /= len;
  z /= len;

  const s = Math.sin(rad);
  const c = Math.cos(rad);
  const t = 1 - c;

  // Build 3x3 rotation matrix (Rodrigues' formula)
  const b00 = x * x * t + c;
  const b01 = y * x * t + z * s;
  const b02 = z * x * t - y * s;
  const b10 = x * y * t - z * s;
  const b11 = y * y * t + c;
  const b12 = z * y * t + x * s;
  const b20 = x * z * t + y * s;
  const b21 = y * z * t - x * s;
  const b22 = z * z * t + c;

  // Multiply a × R (only upper-left 3x3 changes)
  return [
    // Column 0
    a[0] * b00 + a[4] * b01 + a[8] * b02,
    a[1] * b00 + a[5] * b01 + a[9] * b02,
    a[2] * b00 + a[6] * b01 + a[10] * b02,
    a[3] * b00 + a[7] * b01 + a[11] * b02,
    // Column 1
    a[0] * b10 + a[4] * b11 + a[8] * b12,
    a[1] * b10 + a[5] * b11 + a[9] * b12,
    a[2] * b10 + a[6] * b11 + a[10] * b12,
    a[3] * b10 + a[7] * b11 + a[11] * b12,
    // Column 2
    a[0] * b20 + a[4] * b21 + a[8] * b22,
    a[1] * b20 + a[5] * b21 + a[9] * b22,
    a[2] * b20 + a[6] * b21 + a[10] * b22,
    a[3] * b20 + a[7] * b21 + a[11] * b22,
    // Column 3 (translation unchanged)
    ...a.slice(12, 16),
  ];
}

/**
 * Applies translation to a 4x4 matrix.
 *
 * Translation is applied in the matrix's local coordinate system:
 *   - x: Move along matrix's X axis
 *   - y: Move along matrix's Y axis
 *   - z: Move along matrix's Z axis
 *
 * For camera control:
 * - z > 0: Move forward (into scene)
 * - x > 0: Strafe right
 * - y > 0: Move up
 *
 * @param a Input matrix to translate
 * @param x Translation along local X axis
 * @param y Translation along local Y axis
 * @param z Translation along local Z axis
 * @returns Translated matrix
 */
export function translate4(a: Mat4, x: number, y: number, z: number): Mat4 {
  // Only column 3 (translation) changes
  // New translation = old translation + rotation × (x, y, z)
  return [
    // Columns 0-2 unchanged
    ...a.slice(0, 12),
    // Column 3 (updated translation)
    a[0] * x + a[4] * y + a[8] * z + a[12], // tx
    a[1] * x + a[5] * y + a[9] * z + a[13], // ty
    a[2] * x + a[6] * y + a[10] * z + a[14], // tz
    a[3] * x + a[7] * y + a[11] * z + a[15], // tw (usually 1)
  ];
}
