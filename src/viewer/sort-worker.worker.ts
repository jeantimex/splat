/// <reference lib="webworker" />

const ctx: DedicatedWorkerGlobalScope = self as unknown as DedicatedWorkerGlobalScope;

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
}

// Internal CPU-side row format used by both .splat and converted .ply:
// position xyz (float32x3), scale xyz (float32x3), color rgba8, quaternion xyzw8.
const ROW_BYTES = 3 * 4 + 3 * 4 + 4 + 4;

let sourceBuffer: ArrayBuffer | null = null;
let vertexCount = 0;
let viewProj: number[] = [];
let lastProj: number[] = [];
let lastVertexCount = -1;
let depthIndex = new Uint32Array();
let sortRunning = false;

const floatView = new Float32Array(1);
const int32View = new Int32Array(floatView.buffer);

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

function postSplatPayload() {
  if (!sourceBuffer || vertexCount <= 0) return;
  const fBuffer = new Float32Array(sourceBuffer);
  const uBuffer = new Uint8Array(sourceBuffer);
  const packed = new Uint32Array(vertexCount * 8);
  const packedBytes = new Uint8Array(packed.buffer);

  for (let i = 0; i < vertexCount; i++) {
    // Copy center position bit-pattern directly; vertex shader bitcasts back to f32.
    packed[8 * i + 0] = int32ViewFromFloat(fBuffer[8 * i + 0]);
    packed[8 * i + 1] = int32ViewFromFloat(fBuffer[8 * i + 1]);
    packed[8 * i + 2] = int32ViewFromFloat(fBuffer[8 * i + 2]);

    packedBytes[4 * (8 * i + 7) + 0] = uBuffer[32 * i + 24 + 0];
    packedBytes[4 * (8 * i + 7) + 1] = uBuffer[32 * i + 24 + 1];
    packedBytes[4 * (8 * i + 7) + 2] = uBuffer[32 * i + 24 + 2];
    packedBytes[4 * (8 * i + 7) + 3] = uBuffer[32 * i + 24 + 3];

    const scale = [fBuffer[8 * i + 3], fBuffer[8 * i + 4], fBuffer[8 * i + 5]];
    const rot = [
      (uBuffer[32 * i + 28 + 0] - 128) / 128,
      (uBuffer[32 * i + 28 + 1] - 128) / 128,
      (uBuffer[32 * i + 28 + 2] - 128) / 128,
      (uBuffer[32 * i + 28 + 3] - 128) / 128,
    ];

    // Build scale-rot matrix from quantized quaternion + scale.
    const m = [
      1.0 - 2.0 * (rot[2] * rot[2] + rot[3] * rot[3]),
      2.0 * (rot[1] * rot[2] + rot[0] * rot[3]),
      2.0 * (rot[1] * rot[3] - rot[0] * rot[2]),

      2.0 * (rot[1] * rot[2] - rot[0] * rot[3]),
      1.0 - 2.0 * (rot[1] * rot[1] + rot[3] * rot[3]),
      2.0 * (rot[2] * rot[3] + rot[0] * rot[1]),

      2.0 * (rot[1] * rot[3] + rot[0] * rot[2]),
      2.0 * (rot[2] * rot[3] - rot[0] * rot[1]),
      1.0 - 2.0 * (rot[1] * rot[1] + rot[2] * rot[2]),
    ].map((value, idx) => value * scale[Math.floor(idx / 3)]);

    // Upper triangle of covariance in world space.
    const sigma = [
      m[0] * m[0] + m[3] * m[3] + m[6] * m[6],
      m[0] * m[1] + m[3] * m[4] + m[6] * m[7],
      m[0] * m[2] + m[3] * m[5] + m[6] * m[8],
      m[1] * m[1] + m[4] * m[4] + m[7] * m[7],
      m[1] * m[2] + m[4] * m[5] + m[7] * m[8],
      m[2] * m[2] + m[5] * m[5] + m[8] * m[8],
    ];

    packed[8 * i + 4] = packHalf2x16(4 * sigma[0], 4 * sigma[1]);
    packed[8 * i + 5] = packHalf2x16(4 * sigma[2], 4 * sigma[3]);
    packed[8 * i + 6] = packHalf2x16(4 * sigma[4], 4 * sigma[5]);
  }

  // Transfer ownership of packed buffer to main thread (zero-copy semantics).
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

function runSort(proj: number[]) {
  if (!sourceBuffer || vertexCount <= 0 || proj.length < 16) return;
  const fBuffer = new Float32Array(sourceBuffer);

  if (lastVertexCount === vertexCount) {
    // Skip sort when view direction barely changed.
    const dot = lastProj[2] * proj[2] + lastProj[6] * proj[6] + lastProj[10] * proj[10];
    if (Math.abs(dot - 1) < 0.01) return;
  } else {
    postSplatPayload();
    lastVertexCount = vertexCount;
  }

  // Project centers to a scalar depth key in view-projection space.
  let maxDepth = -Infinity;
  let minDepth = Infinity;
  const sizeList = new Int32Array(vertexCount);

  for (let i = 0; i < vertexCount; i++) {
    const depth =
      ((proj[2] * fBuffer[8 * i + 0] +
        proj[6] * fBuffer[8 * i + 1] +
        proj[10] * fBuffer[8 * i + 2]) *
        4096) |
      0;

    sizeList[i] = depth;
    if (depth > maxDepth) maxDepth = depth;
    if (depth < minDepth) minDepth = depth;
  }

  // 16-bit counting sort:
  // fast enough for large splat sets and stable for alpha blending order.
  const depthInv = (256 * 256 - 1) / (maxDepth - minDepth || 1);
  const counts0 = new Uint32Array(256 * 256);
  for (let i = 0; i < vertexCount; i++) {
    sizeList[i] = ((sizeList[i] - minDepth) * depthInv) | 0;
    counts0[sizeList[i]]++;
  }

  const starts0 = new Uint32Array(256 * 256);
  for (let i = 1; i < 256 * 256; i++) {
    starts0[i] = starts0[i - 1] + counts0[i - 1];
  }

  depthIndex = new Uint32Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) {
    depthIndex[starts0[sizeList[i]]++] = i;
  }

  lastProj = proj.slice();
  const msg: WorkerToMainDepth = {
    type: 'depth',
    depthIndex: depthIndex.buffer,
    vertexCount,
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
    sourceBuffer = processPlyBuffer(msg.buffer);
    vertexCount = Math.floor(sourceBuffer.byteLength / ROW_BYTES);
    const out: WorkerToMainBuffer = {
      type: 'buffer',
      buffer: sourceBuffer,
      save: Boolean(msg.save),
    };
    ctx.postMessage(out);
    return;
  }

  if (msg.type === 'buffer') {
    // Raw splat upload path (already in internal 32-byte row format).
    sourceBuffer = msg.buffer;
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
