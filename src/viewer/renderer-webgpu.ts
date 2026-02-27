import type { Mat4 } from './camera';
import vertexShaderSource from './shaders/splat.vert.wgsl?raw';
import fragmentShaderSource from './shaders/splat.frag.wgsl?raw';
import anaglyphCompositeShaderSource from './shaders/anaglyph-composite.wgsl?raw';

// 2x mat4 + focal vec2 + viewport vec2 + render params vec4.
// See WGSL Uniforms struct for exact layout.
const UNIFORM_FLOATS = 40;
const UNIFORM_BYTES = UNIFORM_FLOATS * 4;

export interface RenderState {
  projection: Mat4;
  view: Mat4;
  viewLeft: Mat4;
  viewRight: Mat4;
  focal: [number, number];
  pointCloudEnabled: boolean;
  pointSize: number;
  stereoMode: 'off' | 'anaglyph' | 'sbs';
}

export interface WebGPURenderer {
  render: (state: RenderState) => void;
  setSplatData: (packed: Uint32Array, vertexCount: number) => void;
  setSortedIndices: (indices: Uint32Array) => void;
}

export async function createWebGPURenderer(canvas: HTMLCanvasElement): Promise<WebGPURenderer> {
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error('No compatible GPU adapter found');

  // Request adapter-reported limits explicitly so large scenes can bind
  // storage buffers above the default (often 128MB).
  const device = await adapter.requestDevice({
    requiredLimits: {
      maxStorageBufferBindingSize: adapter.limits.maxStorageBufferBindingSize,
      maxBufferSize: adapter.limits.maxBufferSize,
    },
  });
  const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
  if (!context) throw new Error('Unable to create WebGPU canvas context');

  const format = navigator.gpu.getPreferredCanvasFormat();

  // Single uniform buffer updated every frame.
  const uniformBuffer = device.createBuffer({
    label: 'viewer uniforms',
    size: UNIFORM_BYTES,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  // Second uniform buffer for the right-eye stereo pass.
  // Both eyes write different view matrices via device.queue.writeBuffer, which
  // is a queue operation that executes before the command buffer submission.
  // Using a single buffer causes the right-eye write to overwrite the left-eye
  // write before either render pass reads it, making both eyes identical.
  const uniformBufferB = device.createBuffer({
    label: 'viewer uniforms B',
    size: UNIFORM_BYTES,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  // We render every splat as an instanced screen-space quad.
  // The vertex shader expands this quad into ellipse axes per instance.
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

  // Storage buffers:
  // - splatBuffer: packed per-splat payload (8 u32 per splat)
  // - sortedIndexBuffer: depth-sorted instance ids
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

  // Bind group is recreated whenever either storage buffer is reallocated.
  // Accepts an optional uniform buffer so the right-eye pass can use its own.
  const createBindGroup = (ub: GPUBuffer = uniformBuffer) =>
    device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: ub } },
        { binding: 1, resource: { buffer: splatBuffer } },
        { binding: 2, resource: { buffer: sortedIndexBuffer } },
      ],
    });

  let bindGroup = createBindGroup();
  let bindGroupB = createBindGroup(uniformBufferB);

  const createPipeline = (writeMask: GPUColorWriteFlags = GPUColorWrite.ALL) =>
    device.createRenderPipeline({
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
            writeMask,
          },
        ],
      },
      primitive: { topology: 'triangle-strip' },
    });

  const pipeline = createPipeline();

  const anaglyphSampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });
  const anaglyphCompositeBindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
    ],
  });
  const anaglyphCompositePipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [anaglyphCompositeBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: anaglyphCompositeShaderSource }),
      entryPoint: 'vs_main',
    },
    fragment: {
      module: device.createShaderModule({ code: anaglyphCompositeShaderSource }),
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: { topology: 'triangle-strip' },
  });

  let leftEyeTexture = createEyeTexture();
  let rightEyeTexture = createEyeTexture();
  let anaglyphCompositeBindGroup = createAnaglyphCompositeBindGroup();

  const ensureSplatCapacity = (requiredU32: number) => {
    if (requiredU32 <= splatCapacity) return;
    // Grow geometrically to avoid frequent reallocations on incremental loads.
    splatCapacity = nextPow2(requiredU32);
    splatBuffer.destroy();
    splatBuffer = device.createBuffer({
      label: 'splat buffer',
      size: splatCapacity * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    bindGroup = createBindGroup();
    bindGroupB = createBindGroup(uniformBufferB);
  };

  const ensureIndexCapacity = (requiredU32: number) => {
    if (requiredU32 <= indexCapacity) return;
    // Same geometric growth policy for sorted index buffer.
    indexCapacity = nextPow2(requiredU32);
    sortedIndexBuffer.destroy();
    sortedIndexBuffer = device.createBuffer({
      label: 'sorted index buffer',
      size: indexCapacity * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    bindGroup = createBindGroup();
    bindGroupB = createBindGroup(uniformBufferB);
  };

  const resize = () => {
    // Canvas is device-pixel aware; CSS size is handled in styles.
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    context.configure({
      device,
      format,
      alphaMode: 'premultiplied',
    });
    leftEyeTexture.destroy();
    rightEyeTexture.destroy();
    leftEyeTexture = createEyeTexture();
    rightEyeTexture = createEyeTexture();
    anaglyphCompositeBindGroup = createAnaglyphCompositeBindGroup();
  };

  window.addEventListener('resize', resize);
  resize();

  const uniformData = new Float32Array(UNIFORM_FLOATS);

  const render = (state: RenderState) => {
    const writeUniforms = (
      projection: Mat4,
      view: Mat4,
      viewportWidth: number,
      viewportHeight: number,
      ub: GPUBuffer = uniformBuffer,
    ) => {
      uniformData.set(projection, 0);
      uniformData.set(view, 16);
      uniformData[32] = state.focal[0];
      uniformData[33] = state.focal[1];
      uniformData[34] = viewportWidth;
      uniformData[35] = viewportHeight;
      uniformData[36] = state.pointCloudEnabled ? 1 : 0;
      uniformData[37] = state.pointSize;
      uniformData[38] = 0;
      uniformData[39] = 0;
      device.queue.writeBuffer(ub, 0, uniformData);
    };
    const halfWidthProjection = (): Mat4 => {
      const adjusted = [...state.projection];
      adjusted[0] *= 2;
      return adjusted;
    };

    const encoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const drawSplats = (params: {
      targetView: GPUTextureView;
      view: Mat4;
      viewportX: number;
      viewportY: number;
      viewportWidth: number;
      viewportHeight: number;
      projection: Mat4;
      clear: boolean;
      ub?: GPUBuffer;
      bg?: GPUBindGroup;
    }) => {
      const ub = params.ub ?? uniformBuffer;
      const bg = params.bg ?? bindGroup;
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: params.targetView,
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: params.clear ? 'clear' : 'load',
            storeOp: 'store',
          },
        ],
      });
      pass.setBindGroup(0, bg);
      pass.setVertexBuffer(0, quadVertexBuffer);
      pass.setViewport(
        params.viewportX,
        params.viewportY,
        params.viewportWidth,
        params.viewportHeight,
        0,
        1,
      );
      writeUniforms(params.projection, params.view, params.viewportWidth, params.viewportHeight, ub);
      pass.setPipeline(pipeline);
      pass.draw(4, instanceCount, 0, 0);
      pass.end();
    };

    if (instanceCount > 0 && state.stereoMode === 'anaglyph') {
      drawSplats({
        targetView: leftEyeTexture.createView(),
        view: state.viewLeft,
        viewportX: 0,
        viewportY: 0,
        viewportWidth: canvas.width,
        viewportHeight: canvas.height,
        projection: state.projection,
        clear: true,
        ub: uniformBuffer,
        bg: bindGroup,
      });
      drawSplats({
        targetView: rightEyeTexture.createView(),
        view: state.viewRight,
        viewportX: 0,
        viewportY: 0,
        viewportWidth: canvas.width,
        viewportHeight: canvas.height,
        projection: state.projection,
        clear: true,
        ub: uniformBufferB,
        bg: bindGroupB,
      });

      const compositePass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      });
      compositePass.setPipeline(anaglyphCompositePipeline);
      compositePass.setBindGroup(0, anaglyphCompositeBindGroup);
      compositePass.draw(4, 1, 0, 0);
      compositePass.end();
    } else if (instanceCount > 0 && state.stereoMode === 'sbs') {
      const halfWidth = Math.max(1, Math.floor(canvas.width / 2));
      const projectionHalf = halfWidthProjection();

      drawSplats({
        targetView: textureView,
        view: state.viewLeft,
        viewportX: 0,
        viewportY: 0,
        viewportWidth: halfWidth,
        viewportHeight: canvas.height,
        projection: projectionHalf,
        clear: true,
        ub: uniformBuffer,
        bg: bindGroup,
      });
      drawSplats({
        targetView: textureView,
        view: state.viewRight,
        viewportX: halfWidth,
        viewportY: 0,
        viewportWidth: canvas.width - halfWidth,
        viewportHeight: canvas.height,
        projection: projectionHalf,
        clear: false,
        ub: uniformBufferB,
        bg: bindGroupB,
      });
    } else if (instanceCount > 0) {
      drawSplats({
        targetView: textureView,
        view: state.view,
        viewportX: 0,
        viewportY: 0,
        viewportWidth: canvas.width,
        viewportHeight: canvas.height,
        projection: state.projection,
        clear: true,
      });
    } else {
      const emptyPass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      });
      emptyPass.end();
    }

    device.queue.submit([encoder.finish()]);
  };

  const setSplatData = (packed: Uint32Array, vertexCount: number) => {
    if (vertexCount <= 0 || packed.length <= 0) {
      instanceCount = 0;
      return;
    }
    ensureSplatCapacity(packed.length);
    // Upload a copy to prevent accidental external mutation during GPU readback.
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
    // Same defensive copy for indices.
    const upload = new Uint32Array(indices);
    device.queue.writeBuffer(sortedIndexBuffer, 0, upload);
    instanceCount = indices.length;
  };

  function createEyeTexture() {
    return device.createTexture({
      size: {
        width: Math.max(1, canvas.width),
        height: Math.max(1, canvas.height),
        depthOrArrayLayers: 1,
      },
      format,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    });
  }

  function createAnaglyphCompositeBindGroup() {
    return device.createBindGroup({
      layout: anaglyphCompositeBindGroupLayout,
      entries: [
        { binding: 0, resource: anaglyphSampler },
        { binding: 1, resource: leftEyeTexture.createView() },
        { binding: 2, resource: rightEyeTexture.createView() },
      ],
    });
  }

  return { render, setSplatData, setSortedIndices };
}

function nextPow2(value: number): number {
  let result = 1;
  while (result < value) result <<= 1;
  return result;
}
