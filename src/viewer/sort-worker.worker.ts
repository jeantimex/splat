/// <reference lib="webworker" />

/**
 * =============================================================================
 * SORT WORKER - DEPTH SORTING AND DATA PROCESSING FOR 3D GAUSSIAN SPLATTING
 * =============================================================================
 *
 * This Web Worker handles CPU-intensive operations off the main thread:
 *
 * 1. DEPTH SORTING - Critical for Correct Rendering
 *    ------------------------------------------------
 *    3DGS uses alpha blending for semi-transparent Gaussians. For correct
 *    compositing, Gaussians must be drawn in back-to-front order (painter's
 *    algorithm). This worker computes that order every time the camera moves.
 *
 *    ALGORITHM: 16-bit Counting Sort (O(n) complexity)
 *    - Compute depth = dot(viewDir, position) for each Gaussian
 *    - Quantize depths to 16-bit integers (65536 buckets)
 *    - Count occurrences in each bucket
 *    - Compute prefix sums to get starting indices
 *    - Place each Gaussian index at its sorted position
 *
 *    Why counting sort instead of quicksort/mergesort?
 *    - O(n) vs O(n log n) - significant for millions of Gaussians
 *    - Stable and predictable performance
 *    - Cache-friendly memory access patterns
 *    - 16-bit quantization is sufficient for visual quality
 *
 * 2. PLY PARSING - Convert Training Output to Runtime Format
 *    -------------------------------------------------------
 *    3DGS training tools output PLY files with raw Gaussian parameters.
 *    This worker parses both standard and compressed PLY formats,
 *    converting to our optimized runtime format.
 *
 *    PLY Gaussian attributes:
 *    - x, y, z: Position in world space
 *    - scale_0, scale_1, scale_2: Log-space scale (exp() to get actual)
 *    - rot_0, rot_1, rot_2, rot_3: Rotation quaternion
 *    - f_dc_0, f_dc_1, f_dc_2: DC spherical harmonic (→ RGB color)
 *    - opacity: Logit-space opacity (sigmoid() to get [0,1])
 *
 * 3. COVARIANCE COMPUTATION
 *    ----------------------
 *    From rotation quaternion (q) and scale (s), we compute the 3D covariance:
 *
 *    1. Quaternion → Rotation matrix R:
 *       R = [[1-2(qy²+qz²), 2(qxqy-qwqz), 2(qxqz+qwqy)],
 *            [2(qxqy+qwqz), 1-2(qx²+qz²), 2(qyqz-qwqx)],
 *            [2(qxqz-qwqy), 2(qyqz+qwqx), 1-2(qx²+qy²)]]
 *
 *    2. Scale → Scale matrix S = diag(sx, sy, sz)
 *
 *    3. Scale-rotation matrix M = R * S
 *
 *    4. Covariance Σ = M * M^T
 *
 *    The covariance defines the 3D ellipsoid shape of the Gaussian.
 *    We store only the upper triangle (6 values) since Σ is symmetric.
 */

const ctx: DedicatedWorkerGlobalScope = self as unknown as DedicatedWorkerGlobalScope;

/** Messages from main thread to worker */
type MainToWorkerMessage =
  | { type: 'ply'; buffer: ArrayBuffer; save?: boolean }
  | { type: 'buffer'; buffer: ArrayBuffer; vertexCount: number }
  | { type: 'view'; viewProj: number[] };

interface WorkerToMainBuffer {
  type: 'buffer';
  buffer: ArrayBuffer;
  save: boolean;
}

interface WorkerToMainSplat {
  type: 'splat';
  splatData: ArrayBuffer;
  vertexCount: number;
}

interface WorkerToMainDepth {
  type: 'depth';
  depthIndex: ArrayBuffer;
  vertexCount: number;
  sortMs: number;
}

/**
 * Internal CPU-side row format used by both .splat and converted .ply.
 * 32 bytes per Gaussian:
 *   [0-11]:  Position xyz (float32×3 = 12 bytes)
 *   [12-23]: Scale xyz (float32×3 = 12 bytes)
 *   [24-27]: Color RGBA (uint8×4 = 4 bytes)
 *   [28-31]: Rotation quaternion xyzw (uint8×4 = 4 bytes, quantized [-1,1]→[0,255])
 */
const ROW_BYTES = 3 * 4 + 3 * 4 + 4 + 4;
const MORTON_BITS_PER_AXIS = 10;
const MORTON_MAX_COORD = (1 << MORTON_BITS_PER_AXIS) - 1;

// =============================================================================
// WORKER STATE
// =============================================================================

/** Raw splat data in internal 32-byte row format */
let sourceBuffer: ArrayBuffer | null = null;
/** Number of Gaussians in the current scene */
let vertexCount = 0;
/** Current viewProjection matrix (for depth calculation) */
let viewProj: number[] = [];
/** Previous viewProjection matrix (for change detection) */
let lastProj: number[] = [];
/** Previous vertex count (to detect scene changes) */
let lastVertexCount = -1;
/** Flag to prevent concurrent sorts */
let sortRunning = false;

/**
 * Pre-allocated arrays for sorting (reused across frames to avoid allocation):
 * - sizeList: Quantized depth values for each Gaussian
 * - visibleIndices: Original indices of visible Gaussians
 * - counts0: Bucket counts for counting sort (64K buckets for 16-bit depth)
 * - starts0: Prefix sums giving start position of each bucket
 */
let sizeList = new Int32Array(0);
let visibleIndices = new Uint32Array(0);
const counts0 = new Uint32Array(256 * 256); // 64K = 2^16 buckets
const starts0 = new Uint32Array(256 * 256);

/** Shared buffer for float32 ↔ int32 bit reinterpretation */
const floatView = new Float32Array(1);
const int32View = new Int32Array(floatView.buffer);

// =============================================================================
// FLOAT16 PACKING FOR COVARIANCE DATA
// =============================================================================

/**
 * Converts float32 to float16 (IEEE 754 half-precision).
 *
 * Float16 format: 1 sign + 5 exponent + 10 mantissa bits
 * Range: ±65504, precision: ~0.1% relative error
 *
 * Used to pack 3D covariance (6 values) into 3 uint32 (6 float16).
 * This halves memory bandwidth compared to float32, which is important
 * when reading millions of Gaussians every frame.
 *
 * The precision loss is acceptable for covariance since:
 * 1. Gaussians are smoothly varying - small errors aren't visible
 * 2. The values are scale factors, not absolute positions
 * 3. Anti-aliasing filter masks very small splats anyway
 */
function floatToHalf(float: number): number {
  // Custom float32 -> float16 conversion used to pack covariance terms.
  // This keeps GPU payload compact while preserving enough precision.
  floatView[0] = float;
  const f = int32View[0];

  const sign = (f >> 31) & 0x0001;
  const exp = (f >> 23) & 0x00ff;
  let frac = f & 0x007fffff;

  let newExp: number;
  if (exp === 0) {
    newExp = 0;
  } else if (exp < 113) {
    newExp = 0;
    frac |= 0x00800000;
    frac = frac >> (113 - exp);
    if (frac & 0x01000000) {
      newExp = 1;
      frac = 0;
    }
  } else if (exp < 142) {
    newExp = exp - 112;
  } else {
    newExp = 31;
    frac = 0;
  }

  return (sign << 15) | (newExp << 10) | (frac >> 13);
}

function packHalf2x16(x: number, y: number): number {
  return (floatToHalf(x) | (floatToHalf(y) << 16)) >>> 0;
}

function splitBy3(value: number): number {
  let x = value & MORTON_MAX_COORD;
  x = (x | (x << 16)) & 0x030000ff;
  x = (x | (x << 8)) & 0x0300f00f;
  x = (x | (x << 4)) & 0x030c30c3;
  x = (x | (x << 2)) & 0x09249249;
  return x >>> 0;
}

function morton3D(x: number, y: number, z: number): number {
  return (splitBy3(x) | (splitBy3(y) << 1) | (splitBy3(z) << 2)) >>> 0;
}

function reorderRowsMorton(buffer: ArrayBuffer): ArrayBuffer {
  const count = Math.floor(buffer.byteLength / ROW_BYTES);
  if (count <= 1) return buffer;

  const positions = new Float32Array(buffer);
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (let i = 0; i < count; i++) {
    const x = positions[i * 8 + 0];
    const y = positions[i * 8 + 1];
    const z = positions[i * 8 + 2];
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
  }

  const spanX = Math.max(maxX - minX, 1e-6);
  const spanY = Math.max(maxY - minY, 1e-6);
  const spanZ = Math.max(maxZ - minZ, 1e-6);
  const keys = new Uint32Array(count);
  const order = new Uint32Array(count);

  for (let i = 0; i < count; i++) {
    const x = positions[i * 8 + 0];
    const y = positions[i * 8 + 1];
    const z = positions[i * 8 + 2];
    const qx = Math.max(
      0,
      Math.min(MORTON_MAX_COORD, Math.floor(((x - minX) / spanX) * MORTON_MAX_COORD)),
    );
    const qy = Math.max(
      0,
      Math.min(MORTON_MAX_COORD, Math.floor(((y - minY) / spanY) * MORTON_MAX_COORD)),
    );
    const qz = Math.max(
      0,
      Math.min(MORTON_MAX_COORD, Math.floor(((z - minZ) / spanZ) * MORTON_MAX_COORD)),
    );
    keys[i] = morton3D(qx, qy, qz);
    order[i] = i;
  }

  order.sort((a, b) => keys[a] - keys[b]);

  const inputBytes = new Uint8Array(buffer);
  const reordered = new Uint8Array(buffer.byteLength);
  for (let i = 0; i < count; i++) {
    const srcOffset = order[i] * ROW_BYTES;
    reordered.set(inputBytes.subarray(srcOffset, srcOffset + ROW_BYTES), i * ROW_BYTES);
  }

  return reordered.buffer;
}

/**
 * PACK GAUSSIAN DATA FOR GPU UPLOAD
 * ==================================
 *
 * Converts internal 32-byte row format to GPU-optimized 32-byte packed format.
 * The key difference is that we precompute the 3D covariance matrix here,
 * saving work in the vertex shader.
 *
 * INPUT (per Gaussian, 32 bytes):
 *   position: float32×3 (12 bytes)
 *   scale: float32×3 (12 bytes)
 *   color: uint8×4 (4 bytes)
 *   rotation: uint8×4 (4 bytes, quantized quaternion)
 *
 * OUTPUT (per Gaussian, 32 bytes = 8 uint32):
 *   [0-2]: Position x,y,z as float32 bit patterns
 *   [3]:   (unused)
 *   [4-6]: Covariance upper triangle as 6 float16 packed into 3 uint32
 *   [7]:   Color RGBA8 packed into 1 uint32
 *
 * COVARIANCE COMPUTATION:
 * -----------------------
 * The 3D covariance matrix Σ defines the ellipsoid shape of each Gaussian.
 * It's computed from rotation quaternion q and scale vector s:
 *
 *   1. Convert quaternion to rotation matrix R (3×3)
 *   2. Create scale matrix S = diag(s.x, s.y, s.z)
 *   3. Compute M = R × S (scale-rotation matrix)
 *   4. Compute Σ = M × Mᵀ (covariance)
 *
 * Since Σ is symmetric, we only store 6 values: [σxx, σxy, σxz, σyy, σyz, σzz]
 */
function postSplatPayload() {
  if (!sourceBuffer || vertexCount <= 0) return;
  const fBuffer = new Float32Array(sourceBuffer);
  const uBuffer = new Uint8Array(sourceBuffer);
  const packed = new Uint32Array(vertexCount * 8);
  const packedBytes = new Uint8Array(packed.buffer);

  for (let i = 0; i < vertexCount; i++) {
    // Copy center position bit-pattern directly; vertex shader bitcasts back to f32.
    // Using bitcast preserves exact float values without conversion overhead.
    packed[8 * i + 0] = int32ViewFromFloat(fBuffer[8 * i + 0]); // x
    packed[8 * i + 1] = int32ViewFromFloat(fBuffer[8 * i + 1]); // y
    packed[8 * i + 2] = int32ViewFromFloat(fBuffer[8 * i + 2]); // z

    // Copy RGBA8 color (bytes 24-27 of input)
    packedBytes[4 * (8 * i + 7) + 0] = uBuffer[32 * i + 24 + 0]; // R
    packedBytes[4 * (8 * i + 7) + 1] = uBuffer[32 * i + 24 + 1]; // G
    packedBytes[4 * (8 * i + 7) + 2] = uBuffer[32 * i + 24 + 2]; // B
    packedBytes[4 * (8 * i + 7) + 3] = uBuffer[32 * i + 24 + 3]; // A

    // Extract scale (float32×3)
    const scale = [fBuffer[8 * i + 3], fBuffer[8 * i + 4], fBuffer[8 * i + 5]];

    // Dequantize rotation quaternion from uint8 [0,255] to float [-1,1]
    // The quaternion is stored as (w, x, y, z) but we use index 0 as w here
    const rot = [
      (uBuffer[32 * i + 28 + 0] - 128) / 128, // qw
      (uBuffer[32 * i + 28 + 1] - 128) / 128, // qx
      (uBuffer[32 * i + 28 + 2] - 128) / 128, // qy
      (uBuffer[32 * i + 28 + 3] - 128) / 128, // qz
    ];

    /**
     * Build the scale-rotation matrix M = R × S.
     *
     * Quaternion to rotation matrix formula:
     *   R = [[1-2(qy²+qz²), 2(qxqy-qwqz), 2(qxqz+qwqy)],
     *        [2(qxqy+qwqz), 1-2(qx²+qz²), 2(qyqz-qwqx)],
     *        [2(qxqz-qwqy), 2(qyqz+qwqx), 1-2(qx²+qy²)]]
     *
     * We multiply each row by the corresponding scale component
     * to combine R and S in one step.
     */
    const m = [
      // First row of R, scaled by scale[0]
      1.0 - 2.0 * (rot[2] * rot[2] + rot[3] * rot[3]),
      2.0 * (rot[1] * rot[2] + rot[0] * rot[3]),
      2.0 * (rot[1] * rot[3] - rot[0] * rot[2]),

      // Second row of R, scaled by scale[1]
      2.0 * (rot[1] * rot[2] - rot[0] * rot[3]),
      1.0 - 2.0 * (rot[1] * rot[1] + rot[3] * rot[3]),
      2.0 * (rot[2] * rot[3] + rot[0] * rot[1]),

      // Third row of R, scaled by scale[2]
      2.0 * (rot[1] * rot[3] + rot[0] * rot[2]),
      2.0 * (rot[2] * rot[3] - rot[0] * rot[1]),
      1.0 - 2.0 * (rot[1] * rot[1] + rot[2] * rot[2]),
    ].map((value, idx) => value * scale[Math.floor(idx / 3)]);

    /**
     * Compute 3D covariance Σ = M × Mᵀ.
     *
     * Since Σ is symmetric (Σᵢⱼ = Σⱼᵢ), we only compute and store
     * the upper triangle: σxx, σxy, σxz, σyy, σyz, σzz
     *
     * Each element: σᵢⱼ = Σₖ M[i][k] × M[j][k]
     *
     * The 4× multiplier is a convention that simplifies the shader math.
     */
    const sigma = [
      m[0] * m[0] + m[3] * m[3] + m[6] * m[6], // σxx
      m[0] * m[1] + m[3] * m[4] + m[6] * m[7], // σxy
      m[0] * m[2] + m[3] * m[5] + m[6] * m[8], // σxz
      m[1] * m[1] + m[4] * m[4] + m[7] * m[7], // σyy
      m[1] * m[2] + m[4] * m[5] + m[7] * m[8], // σyz
      m[2] * m[2] + m[5] * m[5] + m[8] * m[8], // σzz
    ];

    // Pack 6 float16 covariance values into 3 uint32
    packed[8 * i + 4] = packHalf2x16(4 * sigma[0], 4 * sigma[1]); // σxx, σxy
    packed[8 * i + 5] = packHalf2x16(4 * sigma[2], 4 * sigma[3]); // σxz, σyy
    packed[8 * i + 6] = packHalf2x16(4 * sigma[4], 4 * sigma[5]); // σyz, σzz
  }

  // Transfer ownership of packed buffer to main thread (zero-copy semantics).
  // After this, 'packed' is no longer usable in this worker.
  const msg: WorkerToMainSplat = {
    type: 'splat',
    splatData: packed.buffer,
    vertexCount,
  };
  ctx.postMessage(msg, [packed.buffer]);
}

function int32ViewFromFloat(value: number): number {
  floatView[0] = value;
  return int32View[0] >>> 0;
}

/**
 * DEPTH SORTING - Core Algorithm for Back-to-Front Rendering
 * ===========================================================
 *
 * This function sorts all Gaussians by depth (distance from camera) so they
 * can be rendered in back-to-front order for correct alpha blending.
 *
 * WHY SORTING IS NECESSARY:
 * -------------------------
 * 3DGS Gaussians are semi-transparent. The alpha blending equation is:
 *   C_final = Σᵢ (Cᵢ × αᵢ × ∏ⱼ<ᵢ(1 - αⱼ))
 *
 * This is order-dependent! Drawing Gaussian A then B gives different
 * results than drawing B then A. Correct compositing requires back-to-front.
 *
 * DEPTH CALCULATION:
 * ------------------
 * For each Gaussian position p = (x, y, z), we compute:
 *   depth = viewDir · p = proj[2]*x + proj[6]*y + proj[10]*z
 *
 * The viewProjection matrix columns contain the camera axes:
 *   proj[2,6,10] = forward direction (Z axis in camera space)
 *
 * This gives the signed distance along the view direction.
 * Larger depth = farther from camera = should be drawn first.
 *
 * SORTING ALGORITHM: 16-bit Counting Sort
 * ---------------------------------------
 * We use counting sort instead of comparison-based sorts because:
 * 1. O(n) time complexity vs O(n log n) for quicksort/mergesort
 * 2. For millions of Gaussians, this is significantly faster
 * 3. Stable sort (preserves order of equal-depth Gaussians)
 *
 * Steps:
 * 1. Compute depth for each Gaussian
 * 2. Find min/max depth range
 * 3. Quantize depths to 16-bit integers (64K buckets)
 * 4. Count occurrences in each bucket
 * 5. Compute prefix sum to get bucket starting positions
 * 6. Place each Gaussian index at its sorted position
 *
 * EARLY EXIT OPTIMIZATION:
 * ------------------------
 * We skip re-sorting if the camera hasn't moved significantly:
 * - View direction change < ~1 degree (dot product > 0.99)
 * - Position change < 0.01 units
 *
 * @param proj - ViewProjection matrix (16 floats, column-major)
 */
function runSort(proj: number[]) {
  if (!sourceBuffer || vertexCount <= 0 || proj.length < 16) return;
  const sortStart = performance.now();
  const fBuffer = new Float32Array(sourceBuffer);

  /**
   * Early exit if camera hasn't moved significantly.
   *
   * We check:
   * 1. View direction: dot product of old and new forward vectors
   *    dot ≈ 1 means same direction (cos(0°) = 1)
   * 2. Position: squared distance between camera positions
   *
   * This optimization saves significant CPU time during static views.
   */
  if (lastVertexCount === vertexCount) {
    // Compare view directions using dot product of forward vectors
    const dot = lastProj[2] * proj[2] + lastProj[6] * proj[6] + lastProj[10] * proj[10];
    if (Math.abs(dot - 1) < 0.01) {
      // Check if camera position changed
      const distSq =
        (lastProj[12] - proj[12]) ** 2 +
        (lastProj[13] - proj[13]) ** 2 +
        (lastProj[14] - proj[14]) ** 2;
      if (distSq < 0.0001) return; // Skip sort - camera didn't move enough
    }
  } else {
    // Scene changed - need to recompute and upload splat data
    postSplatPayload();
    lastVertexCount = vertexCount;
  }

  // Initialize depth range tracking
  let maxDepth = -Infinity;
  let minDepth = Infinity;

  // Grow work arrays if needed (reuse to avoid allocation)
  if (sizeList.length < vertexCount) {
    sizeList = new Int32Array(vertexCount);
    visibleIndices = new Uint32Array(vertexCount);
  }

  /**
   * PASS 1: Compute depths and find range
   *
   * Depth is computed as dot product of view direction with position.
   * The view direction is extracted from viewProjection matrix:
   *   forward = (proj[2], proj[6], proj[10])
   *
   * We multiply by 4096 for integer quantization precision.
   */
  for (let i = 0; i < vertexCount; i++) {
    const x = fBuffer[8 * i + 0];
    const y = fBuffer[8 * i + 1];
    const z = fBuffer[8 * i + 2];

    visibleIndices[i] = i;

    // Depth = dot(viewDir, position), scaled for integer precision
    const depth = ((proj[2] * x + proj[6] * y + proj[10] * z) * 4096) | 0;
    sizeList[i] = depth;
    if (depth > maxDepth) maxDepth = depth;
    if (depth < minDepth) minDepth = depth;
  }

  const renderCount = vertexCount;
  if (renderCount === 0) {
    const msg: WorkerToMainDepth = {
      type: 'depth',
      depthIndex: new Uint32Array(0).buffer,
      vertexCount: 0,
      sortMs: performance.now() - sortStart,
    };
    ctx.postMessage(msg, [msg.depthIndex]);
    return;
  }

  /**
   * PASS 2: Counting Sort (16-bit buckets)
   *
   * Step 1: Normalize depths to [0, 65535] range
   * Step 2: Count occurrences in each of 64K buckets
   */
  const depthInv = (256 * 256 - 1) / (maxDepth - minDepth || 1);
  counts0.fill(0); // Reset bucket counts

  for (let i = 0; i < renderCount; i++) {
    // Normalize depth to 16-bit range
    sizeList[i] = ((sizeList[i] - minDepth) * depthInv) | 0;
    // Increment bucket count
    counts0[sizeList[i]]++;
  }

  /**
   * PASS 3: Compute prefix sums (cumulative counts)
   *
   * After this, starts0[i] = number of elements with depth < i
   * This tells us where each bucket starts in the output array.
   */
  starts0[0] = 0;
  for (let i = 1; i < 256 * 256; i++) {
    starts0[i] = starts0[i - 1] + counts0[i - 1];
  }

  /**
   * PASS 4: Place elements in sorted order
   *
   * For each Gaussian, place its index at the position given by starts0.
   * Increment starts0 after each placement to handle duplicates.
   *
   * Result: depthIndex[0..n-1] contains Gaussian indices in
   * back-to-front order (smallest depth first = farthest = draw first).
   */
  const depthIndex = new Uint32Array(renderCount);
  for (let i = 0; i < renderCount; i++) {
    const originalIdx = visibleIndices[i];
    depthIndex[starts0[sizeList[i]]++] = originalIdx;
  }

  // Remember this projection for early exit check next frame
  lastProj = proj.slice();

  // Send sorted indices to main thread (zero-copy transfer)
  const msg: WorkerToMainDepth = {
    type: 'depth',
    depthIndex: depthIndex.buffer,
    vertexCount: renderCount,
    sortMs: performance.now() - sortStart,
  };
  ctx.postMessage(msg, [depthIndex.buffer]);
}

function processPlyBuffer(inputBuffer: ArrayBuffer): ArrayBuffer {
  const ubuf = new Uint8Array(inputBuffer);
  const header = new TextDecoder().decode(ubuf.slice(0, 1024 * 10));
  const headerEnd = 'end_header\n';
  const headerEndIndex = header.indexOf(headerEnd);
  if (headerEndIndex < 0) throw new Error('Unable to read .ply file header');

  // We parse PLY structure as generic elements to support both:
  // - standard Gaussian PLY (explicit attributes)
  // - SuperSplat compressed PLY (chunk + packed vertex fields)
  const headerLines = header.slice(0, headerEndIndex).split('\n');
  const elements: Array<{
    name: string;
    count: number;
    properties: Array<{ type: string; name: string }>;
  }> = [];
  let currentElement:
    | {
        name: string;
        count: number;
        properties: Array<{ type: string; name: string }>;
      }
    | undefined;

  for (const line of headerLines) {
    if (line.startsWith('element ')) {
      const [, name, count] = line.split(/\s+/);
      currentElement = { name, count: Number.parseInt(count, 10), properties: [] };
      elements.push(currentElement);
      continue;
    }
    if (line.startsWith('property ') && currentElement) {
      const [, type, name] = line.split(/\s+/);
      currentElement.properties.push({ type, name });
    }
  }

  const vertexElement = elements.find((element) => element.name === 'vertex');
  if (!vertexElement) throw new Error('Unable to parse PLY vertex element');

  const isCompressedPly = vertexElement.properties.some(
    (property) => property.name === 'packed_position',
  );
  if (isCompressedPly) {
    return processCompressedPlyBuffer(inputBuffer, elements, headerEndIndex + headerEnd.length);
  }

  return processStandardPlyBuffer(inputBuffer, vertexElement, headerEndIndex + headerEnd.length);
}

function processStandardPlyBuffer(
  inputBuffer: ArrayBuffer,
  vertexElement: {
    name: string;
    count: number;
    properties: Array<{ type: string; name: string }>;
  },
  vertexDataStart: number,
): ArrayBuffer {
  const plyVertexCount = vertexElement.count;
  // Map PLY scalar types to DataView getters.
  const typeMap: Record<string, string> = {
    double: 'getFloat64',
    int: 'getInt32',
    uint: 'getUint32',
    float: 'getFloat32',
    short: 'getInt16',
    ushort: 'getUint16',
    uchar: 'getUint8',
  };

  let rowOffset = 0;
  const offsets: Record<string, number> = {};
  const types: Record<string, string> = {};

  for (const property of vertexElement.properties) {
    const getter = typeMap[property.type] ?? 'getInt8';
    types[property.name] = getter;
    offsets[property.name] = rowOffset;
    rowOffset += Number.parseInt(getter.replace(/[^\d]/g, ''), 10) / 8;
  }

  const dataView = new DataView(inputBuffer, vertexDataStart);
  let row = 0;
  // Attribute accessor resolves current row lazily.
  const attrs = new Proxy<Record<string, number>>(
    {},
    {
      get(_target, prop: string): number {
        const getter = types[prop];
        if (!getter) throw new Error(`${prop} not found in PLY`);
        const fn = (
          dataView as unknown as Record<string, (offset: number, littleEndian?: boolean) => number>
        )[getter];
        return fn.call(dataView, row * rowOffset + offsets[prop], true);
      },
    },
  );

  // Importance sort (size * opacity) improves progressive quality.
  const sizeList = new Float32Array(plyVertexCount);
  const sizeIndex = new Uint32Array(plyVertexCount);
  for (row = 0; row < plyVertexCount; row++) {
    sizeIndex[row] = row;
    if (!types.scale_0) continue;
    const size = Math.exp(attrs.scale_0) * Math.exp(attrs.scale_1) * Math.exp(attrs.scale_2);
    const opacity = 1 / (1 + Math.exp(-attrs.opacity));
    sizeList[row] = size * opacity;
  }
  sizeIndex.sort((b, a) => sizeList[a] - sizeList[b]);

  const output = new ArrayBuffer(ROW_BYTES * plyVertexCount);
  for (let j = 0; j < plyVertexCount; j++) {
    row = sizeIndex[j];

    const position = new Float32Array(output, j * ROW_BYTES, 3);
    const scales = new Float32Array(output, j * ROW_BYTES + 12, 3);
    const rgba = new Uint8ClampedArray(output, j * ROW_BYTES + 24, 4);
    const rot = new Uint8ClampedArray(output, j * ROW_BYTES + 28, 4);

    if (types.scale_0) {
      const qlen = Math.sqrt(
        attrs.rot_0 ** 2 + attrs.rot_1 ** 2 + attrs.rot_2 ** 2 + attrs.rot_3 ** 2,
      );
      rot[0] = (attrs.rot_0 / qlen) * 128 + 128;
      rot[1] = (attrs.rot_1 / qlen) * 128 + 128;
      rot[2] = (attrs.rot_2 / qlen) * 128 + 128;
      rot[3] = (attrs.rot_3 / qlen) * 128 + 128;

      scales[0] = Math.exp(attrs.scale_0);
      scales[1] = Math.exp(attrs.scale_1);
      scales[2] = Math.exp(attrs.scale_2);
    } else {
      scales[0] = 0.01;
      scales[1] = 0.01;
      scales[2] = 0.01;

      rot[0] = 255;
      rot[1] = 0;
      rot[2] = 0;
      rot[3] = 0;
    }

    position[0] = attrs.x;
    position[1] = attrs.y;
    position[2] = attrs.z;

    if (types.f_dc_0) {
      const shC0 = 0.28209479177387814;
      rgba[0] = (0.5 + shC0 * attrs.f_dc_0) * 255;
      rgba[1] = (0.5 + shC0 * attrs.f_dc_1) * 255;
      rgba[2] = (0.5 + shC0 * attrs.f_dc_2) * 255;
    } else {
      rgba[0] = attrs.red;
      rgba[1] = attrs.green;
      rgba[2] = attrs.blue;
    }
    rgba[3] = types.opacity ? (1 / (1 + Math.exp(-attrs.opacity))) * 255 : 255;
  }

  return output;
}

function processCompressedPlyBuffer(
  inputBuffer: ArrayBuffer,
  elements: Array<{
    name: string;
    count: number;
    properties: Array<{ type: string; name: string }>;
  }>,
  dataStart: number,
): ArrayBuffer {
  // Compressed layout:
  // - chunk table with min/max ranges
  // - packed vertex payload (position/rotation/scale/color as uint32)
  const chunkElement = elements.find((element) => element.name === 'chunk');
  const vertexElement = elements.find((element) => element.name === 'vertex');
  if (!chunkElement || !vertexElement) {
    throw new Error('Compressed PLY missing chunk/vertex elements');
  }

  const chunkCount = chunkElement.count;
  const vertexCount = vertexElement.count;
  const chunkStride = 18 * 4;
  const vertexStride = 4 * 4;
  const vertexStart = dataStart + chunkCount * chunkStride;
  const dv = new DataView(inputBuffer);

  const output = new ArrayBuffer(ROW_BYTES * vertexCount);
  const q11Max = 2047;
  const q10Max = 1023;
  const sqrt2 = 1.4142135623730951;

  for (let i = 0; i < vertexCount; i++) {
    // Vertices are chunk-local; each chunk describes value ranges.
    const chunkIndex = i >> 8;
    const chunkBase = dataStart + chunkIndex * chunkStride;
    const vertexBase = vertexStart + i * vertexStride;

    const minX = dv.getFloat32(chunkBase + 0, true);
    const minY = dv.getFloat32(chunkBase + 4, true);
    const minZ = dv.getFloat32(chunkBase + 8, true);
    const maxX = dv.getFloat32(chunkBase + 12, true);
    const maxY = dv.getFloat32(chunkBase + 16, true);
    const maxZ = dv.getFloat32(chunkBase + 20, true);

    const minScaleX = dv.getFloat32(chunkBase + 24, true);
    const minScaleY = dv.getFloat32(chunkBase + 28, true);
    const minScaleZ = dv.getFloat32(chunkBase + 32, true);
    const maxScaleX = dv.getFloat32(chunkBase + 36, true);
    const maxScaleY = dv.getFloat32(chunkBase + 40, true);
    const maxScaleZ = dv.getFloat32(chunkBase + 44, true);

    const minR = dv.getFloat32(chunkBase + 48, true);
    const minG = dv.getFloat32(chunkBase + 52, true);
    const minB = dv.getFloat32(chunkBase + 56, true);
    const maxR = dv.getFloat32(chunkBase + 60, true);
    const maxG = dv.getFloat32(chunkBase + 64, true);
    const maxB = dv.getFloat32(chunkBase + 68, true);

    const packedPosition = dv.getUint32(vertexBase + 0, true);
    const packedRotation = dv.getUint32(vertexBase + 4, true);
    const packedScale = dv.getUint32(vertexBase + 8, true);
    const packedColor = dv.getUint32(vertexBase + 12, true);

    const px = (packedPosition >> 21) & 0x7ff;
    const py = (packedPosition >> 11) & 0x3ff;
    const pz = packedPosition & 0x7ff;

    const sx = (packedScale >> 21) & 0x7ff;
    const sy = (packedScale >> 11) & 0x3ff;
    const sz = packedScale & 0x7ff;

    // Unpack quantized center using chunk-local min/max ranges.
    const position = new Float32Array(output, i * ROW_BYTES, 3);
    position[0] = minX + (px / q11Max) * (maxX - minX);
    position[1] = minY + (py / q10Max) * (maxY - minY);
    position[2] = minZ + (pz / q11Max) * (maxZ - minZ);

    // Scale is stored in log domain; exponentiate back to linear scale.
    const scales = new Float32Array(output, i * ROW_BYTES + 12, 3);
    const logScaleX = minScaleX + (sx / q11Max) * (maxScaleX - minScaleX);
    const logScaleY = minScaleY + (sy / q10Max) * (maxScaleY - minScaleY);
    const logScaleZ = minScaleZ + (sz / q11Max) * (maxScaleZ - minScaleZ);
    scales[0] = Math.max(1e-6, Math.exp(logScaleX));
    scales[1] = Math.max(1e-6, Math.exp(logScaleY));
    scales[2] = Math.max(1e-6, Math.exp(logScaleZ));

    const rgba = new Uint8ClampedArray(output, i * ROW_BYTES + 24, 4);
    const cr = (packedColor >> 24) & 0xff;
    const cg = (packedColor >> 16) & 0xff;
    const cb = (packedColor >> 8) & 0xff;
    const co = packedColor & 0xff;
    const colorR = minR + (cr / 255) * (maxR - minR);
    const colorG = minG + (cg / 255) * (maxG - minG);
    const colorB = minB + (cb / 255) * (maxB - minB);
    rgba[0] = clamp255(colorR * 255);
    rgba[1] = clamp255(colorG * 255);
    rgba[2] = clamp255(colorB * 255);
    rgba[3] = co;

    // Decode 2+10+10+10 packed quaternion (largest component omitted).
    const rot = new Uint8ClampedArray(output, i * ROW_BYTES + 28, 4);
    const quat = decodePackedQuaternion(packedRotation, sqrt2);
    rot[0] = clamp255(quat[0] * 128 + 128);
    rot[1] = clamp255(quat[1] * 128 + 128);
    rot[2] = clamp255(quat[2] * 128 + 128);
    rot[3] = clamp255(quat[3] * 128 + 128);
  }

  return output;
}

function decodePackedQuaternion(packed: number, sqrt2: number): [number, number, number, number] {
  const largestIndex = (packed >> 30) & 0x3;
  const a = (packed >> 20) & 0x3ff;
  const b = (packed >> 10) & 0x3ff;
  const c = packed & 0x3ff;
  const v0 = (a / 1023 - 0.5) * sqrt2;
  const v1 = (b / 1023 - 0.5) * sqrt2;
  const v2 = (c / 1023 - 0.5) * sqrt2;

  // Reconstruct omitted largest component from unit-length constraint.
  const quat: [number, number, number, number] = [0, 0, 0, 0];
  const rem = [v0, v1, v2];
  let remIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === largestIndex) continue;
    quat[i] = rem[remIdx++];
  }

  const sumSquares = quat[0] ** 2 + quat[1] ** 2 + quat[2] ** 2 + quat[3] ** 2;
  quat[largestIndex] = Math.sqrt(Math.max(0, 1 - sumSquares));
  return quat;
}

function clamp255(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function throttledSort() {
  // Coalesce rapid view updates so sort work does not backlog.
  if (sortRunning) return;
  sortRunning = true;
  const lastView = viewProj;
  runSort(lastView);
  setTimeout(() => {
    sortRunning = false;
    if (lastView !== viewProj) {
      throttledSort();
    }
  }, 0);
}

ctx.onmessage = (event: MessageEvent<MainToWorkerMessage>) => {
  const msg = event.data;
  if (msg.type === 'ply') {
    // Reset state before conversion so UI can reflect transient empty payload.
    vertexCount = 0;
    runSort(viewProj);
    sourceBuffer = reorderRowsMorton(processPlyBuffer(msg.buffer));
    vertexCount = Math.floor(sourceBuffer.byteLength / ROW_BYTES);
    postSplatPayload();
    lastVertexCount = vertexCount;
    if (viewProj.length >= 16) {
      runSort(viewProj);
    }
    if (msg.save) {
      const savedBuffer = sourceBuffer.slice(0);
      const out: WorkerToMainBuffer = {
        type: 'buffer',
        buffer: savedBuffer,
        save: true,
      };
      ctx.postMessage(out, [savedBuffer]);
    }
    return;
  }

  if (msg.type === 'buffer') {
    // Raw splat upload path (already in internal 32-byte row format).
    sourceBuffer = reorderRowsMorton(msg.buffer);
    vertexCount = msg.vertexCount;
    return;
  }

  if (msg.type === 'view') {
    // Sorting is view-dependent; every camera update can change draw order.
    viewProj = msg.viewProj;
    throttledSort();
  }
};

export {};
