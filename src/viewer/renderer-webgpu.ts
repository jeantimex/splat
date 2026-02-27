import type { Mat4 } from './camera';
import vertexShaderSource from './shaders/splat.vert.wgsl?raw';
import fragmentShaderSource from './shaders/splat.frag.wgsl?raw';
import anaglyphCompositeShaderSource from './shaders/anaglyph-composite.wgsl?raw';
import crossfadeCompositeShaderSource from './shaders/crossfade-composite.wgsl?raw';

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
  // 0 = full splat, 1 = full point cloud; values in between crossfade both layers.
  transition: number;
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
  const makeUniformBuffer = (label: string) =>
    device.createBuffer({
      label,
      size: UNIFORM_BYTES,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

  const uniformBuffer = makeUniformBuffer('viewer uniforms');
  const uniformBufferB = makeUniformBuffer('viewer uniforms B');
  const uniformBufferC = makeUniformBuffer('viewer uniforms C');
  const uniformBufferD = makeUniformBuffer('viewer uniforms D');

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
  const createBindGroup = (ub: GPUBuffer) =>
    device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: ub } },
        { binding: 1, resource: { buffer: splatBuffer } },
        { binding: 2, resource: { buffer: sortedIndexBuffer } },
      ],
    });

  const rebuildBindGroups = () => {
    bindGroup = createBindGroup(uniformBuffer);
    bindGroupB = createBindGroup(uniformBufferB);
    bindGroupC = createBindGroup(uniformBufferC);
    bindGroupD = createBindGroup(uniformBufferD);
  };

  let bindGroup = createBindGroup(uniformBuffer);
  let bindGroupB = createBindGroup(uniformBufferB);
  let bindGroupC = createBindGroup(uniformBufferC);
  let bindGroupD = createBindGroup(uniformBufferD);

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

  const crossfadeCompositeBindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
    ],
  });
  const crossfadeCompositePipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [crossfadeCompositeBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: crossfadeCompositeShaderSource }),
      entryPoint: 'vs_main',
    },
    fragment: {
      module: device.createShaderModule({ code: crossfadeCompositeShaderSource }),
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: { topology: 'triangle-strip' },
  });

  const crossfadeUniformBuffer = device.createBuffer({
    label: 'crossfade uniforms',
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  let leftEyeTexture = createEyeTexture();
  let rightEyeTexture = createEyeTexture();
  let offscreenSplatTexture = createEyeTexture();
  let offscreenPointTexture = createEyeTexture();
  let anaglyphCompositeBindGroup = createAnaglyphCompositeBindGroup();
  let crossfadeCompositeBindGroup = createCrossfadeCompositeBindGroup();

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
    rebuildBindGroups();
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
    rebuildBindGroups();
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
    [leftEyeTexture, rightEyeTexture, offscreenSplatTexture, offscreenPointTexture].forEach((t) =>
      t.destroy(),
    );
    leftEyeTexture = createEyeTexture();
    rightEyeTexture = createEyeTexture();
    offscreenSplatTexture = createEyeTexture();
    offscreenPointTexture = createEyeTexture();
    anaglyphCompositeBindGroup = createAnaglyphCompositeBindGroup();
    crossfadeCompositeBindGroup = createCrossfadeCompositeBindGroup();
  };

  window.addEventListener('resize', resize);
  resize();

  const uniformData = new Float32Array(UNIFORM_FLOATS);

  const render = (state: RenderState) => {
    // writeUniforms queues data to a specific uniform buffer.
    // mode: 0 = splat, 1 = point cloud.
    // opacity: per-pass opacity multiplier for crossfade (1 = fully visible).
    const writeUniforms = (
      projection: Mat4,
      view: Mat4,
      viewportWidth: number,
      viewportHeight: number,
      mode: number,
      opacity: number,
      ub: GPUBuffer,
    ) => {
      uniformData.set(projection, 0);
      uniformData.set(view, 16);
      uniformData[32] = state.focal[0];
      uniformData[33] = state.focal[1];
      uniformData[34] = viewportWidth;
      uniformData[35] = viewportHeight;
      uniformData[36] = mode;
      uniformData[37] = state.pointSize;
      uniformData[38] = opacity;
      uniformData[39] = 0;
      device.queue.writeBuffer(ub, 0, uniformData);
    };
    const halfWidthProjection = (): Mat4 => {
      const adjusted = [...state.projection];
      adjusted[0] *= 2;
      return adjusted;
    };

    const t = Math.max(0, Math.min(1, state.transition));
    const isCrossfading = t > 0 && t < 1;

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
      mode: number;
      opacity: number;
      ub: GPUBuffer;
      bg: GPUBindGroup;
    }) => {
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
      pass.setBindGroup(0, params.bg);
      pass.setVertexBuffer(0, quadVertexBuffer);
      pass.setViewport(
        params.viewportX,
        params.viewportY,
        params.viewportWidth,
        params.viewportHeight,
        0,
        1,
      );
      writeUniforms(
        params.projection,
        params.view,
        params.viewportWidth,
        params.viewportHeight,
        params.mode,
        params.opacity,
        params.ub,
      );
      pass.setPipeline(pipeline);
      pass.draw(4, instanceCount, 0, 0);
      pass.end();
    };

    // Draw a single eye viewpoint, handling the crossfade by issuing a second
    // pass (point cloud, on top) when the transition is mid-flight.
    const drawEye = (
      targetView: GPUTextureView,
      eyeView: Mat4,
      x: number,
      y: number,
      w: number,
      h: number,
      projection: Mat4,
      clearFirst: boolean,
      ubSplat: GPUBuffer,
      bgSplat: GPUBindGroup,
      ubPoint: GPUBuffer,
      bgPoint: GPUBindGroup,
      forceTwoPass: boolean,
    ) => {
      if (!isCrossfading) {
        // Steady state: single pass at full opacity in whichever mode is active.
        const mode = t < 0.5 ? 0 : 1;
        drawSplats({
          targetView,
          view: eyeView,
          viewportX: x,
          viewportY: y,
          viewportWidth: w,
          viewportHeight: h,
          projection,
          clear: clearFirst,
          mode,
          opacity: 1,
          ub: mode === 0 ? ubSplat : ubPoint,
          bg: mode === 0 ? bgSplat : bgPoint,
        });
      } else if (forceTwoPass) {
        // Crossfade: splats drawn first (back), then point cloud on top.
        // Used for SBS mode where we render directly to sub-viewports.
        drawSplats({
          targetView,
          view: eyeView,
          viewportX: x,
          viewportY: y,
          viewportWidth: w,
          viewportHeight: h,
          projection,
          clear: clearFirst,
          mode: 0,
          opacity: 1 - t,
          ub: ubSplat,
          bg: bgSplat,
        });
        drawSplats({
          targetView,
          view: eyeView,
          viewportX: x,
          viewportY: y,
          viewportWidth: w,
          viewportHeight: h,
          projection,
          clear: false,
          mode: 1,
          opacity: t,
          ub: ubPoint,
          bg: bgPoint,
        });
      } else {
        // High-quality crossfade: render each layer at full opacity to off-screen textures,
        // then composite them using the mix() shader.
        device.queue.writeBuffer(crossfadeUniformBuffer, 0, new Float32Array([t]));

        drawSplats({
          targetView: offscreenSplatTexture.createView(),
          view: eyeView,
          viewportX: 0,
          viewportY: 0,
          viewportWidth: w,
          viewportHeight: h,
          projection,
          clear: true,
          mode: 0,
          opacity: 1,
          ub: ubSplat,
          bg: bgSplat,
        });
        drawSplats({
          targetView: offscreenPointTexture.createView(),
          view: eyeView,
          viewportX: 0,
          viewportY: 0,
          viewportWidth: w,
          viewportHeight: h,
          projection,
          clear: true,
          mode: 1,
          opacity: 1,
          ub: ubPoint,
          bg: bgPoint,
        });

        const compositePass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: targetView,
              clearValue: { r: 0, g: 0, b: 0, a: 1 },
              loadOp: clearFirst ? 'clear' : 'load',
              storeOp: 'store',
            },
          ],
        });
        compositePass.setPipeline(crossfadeCompositePipeline);
        compositePass.setBindGroup(0, crossfadeCompositeBindGroup);
        compositePass.setViewport(x, y, w, h, 0, 1);
        compositePass.draw(4, 1, 0, 0);
        compositePass.end();
      }
    };

    if (instanceCount > 0 && state.stereoMode === 'anaglyph') {
      drawEye(
        leftEyeTexture.createView(),
        state.viewLeft,
        0,
        0,
        canvas.width,
        canvas.height,
        state.projection,
        true,
        uniformBuffer,
        bindGroup,
        uniformBufferC,
        bindGroupC,
        false,
      );
      drawEye(
        rightEyeTexture.createView(),
        state.viewRight,
        0,
        0,
        canvas.width,
        canvas.height,
        state.projection,
        true,
        uniformBufferB,
        bindGroupB,
        uniformBufferD,
        bindGroupD,
        false,
      );

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

      drawEye(
        textureView,
        state.viewLeft,
        0,
        0,
        halfWidth,
        canvas.height,
        projectionHalf,
        true,
        uniformBuffer,
        bindGroup,
        uniformBufferC,
        bindGroupC,
        true,
      );
      drawEye(
        textureView,
        state.viewRight,
        halfWidth,
        0,
        canvas.width - halfWidth,
        canvas.height,
        projectionHalf,
        false,
        uniformBufferB,
        bindGroupB,
        uniformBufferD,
        bindGroupD,
        true,
      );
    } else if (instanceCount > 0) {
      drawEye(
        textureView,
        state.view,
        0,
        0,
        canvas.width,
        canvas.height,
        state.projection,
        true,
        uniformBuffer,
        bindGroup,
        uniformBufferC,
        bindGroupC,
        false,
      );
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

  function createCrossfadeCompositeBindGroup() {
    return device.createBindGroup({
      layout: crossfadeCompositeBindGroupLayout,
      entries: [
        { binding: 0, resource: anaglyphSampler },
        { binding: 1, resource: offscreenSplatTexture.createView() },
        { binding: 2, resource: offscreenPointTexture.createView() },
        { binding: 3, resource: { buffer: crossfadeUniformBuffer } },
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
