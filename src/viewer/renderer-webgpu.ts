import type { Mat4 } from './camera';
import vertexShaderSource from './shaders/splat.vert.wgsl?raw';
import fragmentShaderSource from './shaders/splat.frag.wgsl?raw';

const UNIFORM_FLOATS = 36;
const UNIFORM_BYTES = UNIFORM_FLOATS * 4;

export interface RenderState {
  projection: Mat4;
  view: Mat4;
  focal: [number, number];
}

export interface WebGPURenderer {
  render: (state: RenderState) => void;
  setSplatData: (packed: Uint32Array, vertexCount: number) => void;
  setSortedIndices: (indices: Uint32Array) => void;
}

export async function createWebGPURenderer(canvas: HTMLCanvasElement): Promise<WebGPURenderer> {
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error('No compatible GPU adapter found');

  const device = await adapter.requestDevice();
  const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
  if (!context) throw new Error('Unable to create WebGPU canvas context');

  const format = navigator.gpu.getPreferredCanvasFormat();

  const uniformBuffer = device.createBuffer({
    label: 'viewer uniforms',
    size: UNIFORM_BYTES,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const quadVertices = new Float32Array([-2, -2, 2, -2, -2, 2, 2, 2]);
  const quadVertexBuffer = device.createBuffer({
    label: 'quad vertices',
    size: quadVertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(quadVertexBuffer, 0, quadVertices);

  let splatCapacity = 8;
  let indexCapacity = 4;
  let instanceCount = 0;

  let splatBuffer = device.createBuffer({
    label: 'splat buffer',
    size: splatCapacity * 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  let sortedIndexBuffer = device.createBuffer({
    label: 'sorted index buffer',
    size: indexCapacity * 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
    ],
  });

  const createBindGroup = () =>
    device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: uniformBuffer } },
        { binding: 1, resource: { buffer: splatBuffer } },
        { binding: 2, resource: { buffer: sortedIndexBuffer } },
      ],
    });

  let bindGroup = createBindGroup();

  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: vertexShaderSource }),
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: 8,
          stepMode: 'vertex',
          attributes: [{ shaderLocation: 0, format: 'float32x2', offset: 0 }],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({ code: fragmentShaderSource }),
      entryPoint: 'fs_main',
      targets: [
        {
          format,
          blend: {
            color: {
              srcFactor: 'one-minus-dst-alpha',
              dstFactor: 'one',
              operation: 'add',
            },
            alpha: {
              srcFactor: 'one-minus-dst-alpha',
              dstFactor: 'one',
              operation: 'add',
            },
          },
        },
      ],
    },
    primitive: { topology: 'triangle-strip' },
  });

  const ensureSplatCapacity = (requiredU32: number) => {
    if (requiredU32 <= splatCapacity) return;
    splatCapacity = nextPow2(requiredU32);
    splatBuffer.destroy();
    splatBuffer = device.createBuffer({
      label: 'splat buffer',
      size: splatCapacity * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    bindGroup = createBindGroup();
  };

  const ensureIndexCapacity = (requiredU32: number) => {
    if (requiredU32 <= indexCapacity) return;
    indexCapacity = nextPow2(requiredU32);
    sortedIndexBuffer.destroy();
    sortedIndexBuffer = device.createBuffer({
      label: 'sorted index buffer',
      size: indexCapacity * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    bindGroup = createBindGroup();
  };

  const resize = () => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    context.configure({
      device,
      format,
      alphaMode: 'premultiplied',
    });
  };

  window.addEventListener('resize', resize);
  resize();

  const uniformData = new Float32Array(UNIFORM_FLOATS);

  const render = (state: RenderState) => {
    uniformData.set(state.projection, 0);
    uniformData.set(state.view, 16);
    uniformData[32] = state.focal[0];
    uniformData[33] = state.focal[1];
    uniformData[34] = canvas.width;
    uniformData[35] = canvas.height;
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.setVertexBuffer(0, quadVertexBuffer);
    if (instanceCount > 0) {
      pass.draw(4, instanceCount, 0, 0);
    }
    pass.end();

    device.queue.submit([encoder.finish()]);
  };

  const setSplatData = (packed: Uint32Array, vertexCount: number) => {
    if (vertexCount <= 0 || packed.length <= 0) {
      instanceCount = 0;
      return;
    }
    ensureSplatCapacity(packed.length);
    const upload = new Uint32Array(packed);
    device.queue.writeBuffer(splatBuffer, 0, upload);
    instanceCount = vertexCount;
  };

  const setSortedIndices = (indices: Uint32Array) => {
    if (indices.length <= 0) {
      instanceCount = 0;
      return;
    }
    ensureIndexCapacity(indices.length);
    const upload = new Uint32Array(indices);
    device.queue.writeBuffer(sortedIndexBuffer, 0, upload);
    instanceCount = indices.length;
  };

  return { render, setSplatData, setSortedIndices };
}

function nextPow2(value: number): number {
  let result = 1;
  while (result < value) result <<= 1;
  return result;
}
