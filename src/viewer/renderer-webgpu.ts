/**
 * =============================================================================
 * WEBGPU RENDERER FOR 3D GAUSSIAN SPLATTING
 * =============================================================================
 *
 * This module implements the GPU rendering pipeline for 3D Gaussian Splatting
 * using WebGPU. It handles:
 *
 * 1. GPU RESOURCE MANAGEMENT
 *    - Storage buffers for Gaussian data and sorted indices
 *    - Uniform buffers for camera matrices and render parameters
 *    - Off-screen textures for stereo rendering and crossfade effects
 *
 * 2. RENDER PIPELINE SETUP
 *    - Vertex shader: Projects Gaussians to screen-space ellipses
 *    - Fragment shader: Evaluates Gaussian falloff and applies color grading
 *    - Alpha blending: Configured for correct transparent composition
 *
 * 3. INSTANCED RENDERING
 *    - Each Gaussian is rendered as one "instance" of a quad
 *    - Single draw call renders all Gaussians (millions of instances)
 *    - GPU parallelism makes this extremely efficient
 *
 * RENDERING TECHNIQUE:
 * --------------------
 * The key insight of 3DGS is that a 3D Gaussian projects to a 2D Gaussian.
 * Given a 3D Gaussian with covariance Σ₃ₓ₃ and a camera projection, we can
 * compute the 2D covariance Σ₂ₓ₂ analytically using the Jacobian of the
 * projection transform.
 *
 * The 2D covariance defines an ellipse. We render this as a screen-aligned
 * quad, with vertices positioned along the ellipse's principal axes.
 * The fragment shader then evaluates the Gaussian function:
 *
 *   G(x) = exp(-0.5 * x^T * Σ⁻¹ * x)
 *
 * For a 2D Gaussian centered at origin with principal axes aligned to x,y,
 * this simplifies to: G(r) = exp(-0.5 * (x²/σx² + y²/σy²))
 *
 * ALPHA BLENDING:
 * ---------------
 * We use "one-minus-dst-alpha" blending for front-to-back compositing:
 *   dst.rgb = src.rgb * (1 - dst.a) + dst.rgb
 *   dst.a = src.a * (1 - dst.a) + dst.a
 *
 * Combined with back-to-front sorted draw order, this produces:
 *   final = Σᵢ (colorᵢ * αᵢ * ∏ⱼ<ᵢ(1 - αⱼ))
 *
 * This is the standard over operator for alpha compositing.
 */

import type { Mat4 } from './camera';
import vertexShaderSource from './shaders/splat.vert.wgsl?raw';
import fragmentShaderSource from './shaders/splat.frag.wgsl?raw';
import anaglyphCompositeShaderSource from './shaders/anaglyph-composite.wgsl?raw';
import crossfadeCompositeShaderSource from './shaders/crossfade-composite.wgsl?raw';

/**
 * Size of the uniform buffer in 32-bit floats.
 * Layout: 2x mat4 + focal vec2 + viewport vec2 + render params vec4 + color params (3x vec4)
 * Total: 32 + 32 + 8 + 8 + 16 + 48 = 144 bytes = 36 floats... wait, let's recalculate:
 * - projection: mat4x4 = 16 floats
 * - view: mat4x4 = 16 floats
 * - focal: vec2 = 2 floats
 * - viewport: vec2 = 2 floats
 * - render_params: vec4 = 4 floats
 * - color_basic: vec4 = 4 floats
 * - color_levels: vec4 = 4 floats
 * - color_mix: vec4 = 4 floats
 * Total = 52 floats = 208 bytes
 */
const UNIFORM_FLOATS = 52;
const UNIFORM_BYTES = UNIFORM_FLOATS * 4;

/**
 * Per-frame rendering state passed to the renderer.
 *
 * This structure contains all information needed to render one frame:
 * - Camera transforms (view, projection matrices)
 * - Visual parameters (splat scale, color grading)
 * - Stereo mode settings for VR/3D rendering
 */
export interface RenderState {
  /**
   * Projection matrix: transforms camera-space → clip-space (NDC).
   * Defines the camera frustum (FOV, aspect ratio, near/far planes).
   * For 3DGS, we use focal length parameters from training camera.
   */
  projection: Mat4;

  /**
   * View matrix: transforms world-space → camera-space.
   * Represents the camera pose (position + orientation) in the scene.
   * Updated every frame based on user input.
   */
  view: Mat4;

  /** View matrix for left eye (stereo rendering) */
  viewLeft: Mat4;

  /** View matrix for right eye (stereo rendering) */
  viewRight: Mat4;

  /**
   * Focal lengths (fx, fy) in pixels.
   * These come from the camera intrinsics used during Gaussian training.
   * Used in the Jacobian calculation for projecting 3D covariance to 2D.
   */
  focal: [number, number];

  /** Logical display size in physical pixels (independent from internal render scale) */
  viewport: [number, number];

  /**
   * Crossfade value between splat and point cloud modes.
   * 0 = full splat (Gaussian ellipses), 1 = full point cloud (simple dots).
   * Values in between blend both rendering modes for smooth transitions.
   */
  transition: number;

  /** Point size in pixels (for point cloud mode) */
  pointSize: number;

  /**
   * Scale multiplier for Gaussian ellipses.
   * Values < 1 make splats smaller (more sparse), > 1 makes them larger (more overlap).
   * Useful for artistic control or debugging.
   */
  splatScale: number;

  /**
   * Anti-aliasing filter strength.
   * Added to the diagonal of the 2D covariance matrix to prevent aliasing
   * when Gaussians project to sub-pixel sizes. Higher values = more blur.
   */
  antialias: number;

  /** Stereo rendering mode: off, red/cyan anaglyph, or side-by-side */
  stereoMode: 'off' | 'anaglyph' | 'sbs';

  // Color grading parameters (applied in fragment shader)
  brightness: number;
  contrast: number;
  gamma: number;
  blackLevel: number;
  whiteLevel: number;
  intensity: number;
  saturate: number;
  vibrance: number;
  temperature: number;
  tint: number;
  alpha: number;
}

export interface WebGPURenderer {
  render: (state: RenderState) => void;
  setSplatData: (packed: Uint32Array, vertexCount: number) => void;
  setSortedIndices: (indices: Uint32Array) => void;
  setResolutionScale: (scale: number) => void;
  consumeTimings: () => { uploadMs: number; renderMs: number };
}

/**
 * Creates and initializes the WebGPU rendering context for 3D Gaussian Splatting.
 *
 * GPU BUFFER ORGANIZATION:
 * ------------------------
 * 1. SPLAT BUFFER (Storage, read-only in shader)
 *    - Contains packed Gaussian data: position, covariance, color
 *    - 8 uint32 (32 bytes) per Gaussian
 *    - Accessed by vertex shader via instance_index → sorted_indices → splat data
 *
 * 2. SORTED INDEX BUFFER (Storage, read-only in shader)
 *    - Maps instance_index to original Gaussian index
 *    - Updated each frame with back-to-front sorted order
 *    - Critical for correct alpha blending
 *
 * 3. UNIFORM BUFFER (Uniform, updated each frame)
 *    - Camera matrices (projection, view)
 *    - Focal lengths and viewport size
 *    - Render parameters (mode, scale, color grading)
 *
 * 4. QUAD VERTEX BUFFER (Vertex)
 *    - Just 4 vertices defining a unit quad
 *    - Shared by all instances; shader scales per-instance
 *
 * RENDERING ARCHITECTURE:
 * -----------------------
 * Uses instanced rendering where each Gaussian is one instance of the quad.
 * The vertex shader:
 *   1. Looks up sorted index to get actual Gaussian data
 *   2. Projects Gaussian center to screen space
 *   3. Computes 2D covariance from 3D covariance
 *   4. Finds ellipse axes from eigendecomposition
 *   5. Positions quad vertex along major/minor axis
 *
 * The fragment shader:
 *   1. Evaluates exp(-0.5 * r²) at fragment position
 *   2. Applies color grading
 *   3. Outputs premultiplied alpha color
 *
 * @param canvas - The HTML canvas element to render to
 * @returns WebGPURenderer interface for controlling rendering
 */
export async function createWebGPURenderer(canvas: HTMLCanvasElement): Promise<WebGPURenderer> {
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error('No compatible GPU adapter found');

  /**
   * Request adapter-reported limits explicitly so large scenes can bind
   * storage buffers above the default (often 128MB).
   * 3DGS scenes can have millions of Gaussians, requiring large buffers.
   */
  const device = await adapter.requestDevice({
    requiredLimits: {
      maxStorageBufferBindingSize: adapter.limits.maxStorageBufferBindingSize,
      maxBufferSize: adapter.limits.maxBufferSize,
    },
  });
  const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
  if (!context) throw new Error('Unable to create WebGPU canvas context');

  const format = navigator.gpu.getPreferredCanvasFormat();

  /**
   * Multiple uniform buffers are needed for stereo rendering.
   * Each eye/mode combination needs its own uniform buffer because
   * they're rendered in separate passes with different matrices.
   */
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

  /**
   * QUAD GEOMETRY FOR INSTANCED SPLATTING
   * -------------------------------------
   * We render every Gaussian as an instanced screen-space quad.
   * The quad is a simple 4-vertex triangle strip covering [-2, 2] in local coords.
   *
   * Why [-2, 2] instead of [-1, 1]?
   * The Gaussian exp(-0.5 * r²) falls to exp(-2) ≈ 0.135 at r=2.
   * Using r=2 captures ~95% of the Gaussian's visible contribution.
   * This balances fill rate (smaller quads) vs quality (capturing the tails).
   *
   * The vertex shader scales and positions this quad per-instance based on
   * the projected 2D covariance ellipse of each Gaussian.
   */
  const quadVertices = new Float32Array([-2, -2, 2, -2, -2, 2, 2, 2]);
  const quadVertexBuffer = device.createBuffer({
    label: 'quad vertices',
    size: quadVertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(quadVertexBuffer, 0, quadVertices);

  /** Current allocated capacity for splat data (in uint32 elements) */
  let splatCapacity = 8;
  /** Current allocated capacity for sorted indices (in uint32 elements) */
  let indexCapacity = 4;
  /** Number of Gaussians to render (= number of instances in draw call) */
  let instanceCount = 0;

  /**
   * GPU STORAGE BUFFERS FOR GAUSSIAN DATA
   * -------------------------------------
   * These are the primary data structures for 3DGS rendering:
   *
   * SPLAT BUFFER:
   * Contains packed Gaussian parameters, 8 uint32 (32 bytes) per Gaussian:
   *   [0-2]: Position (x, y, z) as float32 bit patterns
   *   [3]:   Unused/padding
   *   [4-6]: Covariance upper triangle (6 float16 packed into 3 uint32)
   *   [7]:   Color RGBA8 packed into one uint32
   *
   * The covariance is stored as the upper triangle of the 3×3 symmetric matrix:
   *   | σxx  σxy  σxz |
   *   | σxy  σyy  σyz |  → stored as [σxx, σxy, σxz, σyy, σyz, σzz]
   *   | σxz  σyz  σzz |
   *
   * SORTED INDEX BUFFER:
   * Maps GPU instance_index to original Gaussian index in back-to-front order.
   * Updated every frame (or when camera moves significantly) by the sort worker.
   *
   * This indirection allows us to reorder rendering without moving the actual
   * Gaussian data, which would be expensive for millions of Gaussians.
   */
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
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' },
      },
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

  /**
   * CREATE RENDER PIPELINE FOR GAUSSIAN SPLATTING
   * ----------------------------------------------
   *
   * VERTEX SHADER (splat.vert.wgsl):
   * - Receives quad corner position + instance_index
   * - Looks up Gaussian data via sorted_indices[instance_index]
   * - Projects 3D Gaussian center to 2D screen position
   * - Computes 2D covariance via Jacobian projection (explained in shader)
   * - Extracts ellipse axes from eigenvalues of 2D covariance
   * - Positions quad vertex along major/minor axis
   *
   * FRAGMENT SHADER (splat.frag.wgsl):
   * - Receives interpolated local quad position
   * - Evaluates Gaussian: exp(-0.5 * dot(pos, pos))
   * - Applies color grading transforms
   * - Outputs premultiplied alpha color
   *
   * ALPHA BLENDING CONFIGURATION:
   * -----------------------------
   * This is critical for correct transparent rendering!
   *
   * We use "one-minus-dst-alpha" blending, also known as "under" compositing:
   *   new_dst.rgb = src.rgb * (1 - dst.a) + dst.rgb * 1
   *   new_dst.a   = src.a * (1 - dst.a) + dst.a * 1
   *
   * With back-to-front sorted rendering:
   * - Start with dst = (0, 0, 0, 0) - transparent background
   * - Draw farthest Gaussian first: dst = src * (1 - 0) = src
   * - Each subsequent Gaussian blends on top of existing content
   *
   * Final color = Σᵢ (colorᵢ × αᵢ × ∏ⱼ<ᵢ(1 - αⱼ))
   *
   * The fragment shader outputs PREMULTIPLIED ALPHA:
   *   output.rgb = color * alpha
   *   output.a = alpha
   *
   * This is required because the blend factors expect premultiplied values.
   */
  const createPipeline = (writeMask: GPUColorWriteFlags = GPUColorWrite.ALL) =>
    device.createRenderPipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      vertex: {
        module: device.createShaderModule({ code: vertexShaderSource }),
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 8, // 2 floats × 4 bytes = 8 bytes per vertex
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
            /**
             * Alpha blending for transparent Gaussians.
             * Using "one-minus-dst-alpha" implements the "under" operator
             * which, combined with back-to-front sorting, gives correct compositing.
             */
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
  let resolutionScale = 1;
  let configuredWidth = 0;
  let configuredHeight = 0;
  let uploadMsAccum = 0;
  let renderMsLast = 0;

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
    const nextWidth = Math.max(1, Math.round(canvas.clientWidth * dpr * resolutionScale));
    const nextHeight = Math.max(1, Math.round(canvas.clientHeight * dpr * resolutionScale));
    if (nextWidth === configuredWidth && nextHeight === configuredHeight) return;
    configuredWidth = nextWidth;
    configuredHeight = nextHeight;
    canvas.width = nextWidth;
    canvas.height = nextHeight;
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
    const renderStart = performance.now();
    // writeUniforms queues data to a specific uniform buffer.
    // mode: 0 = splat, 1 = point cloud.
    // opacity: per-pass opacity multiplier for crossfade (1 = fully visible).
    const writeUniforms = (
      projection: Mat4,
      view: Mat4,
      logicalViewportWidth: number,
      logicalViewportHeight: number,
      mode: number,
      opacity: number,
      ub: GPUBuffer,
    ) => {
      uniformData.set(projection, 0);
      uniformData.set(view, 16);
      uniformData[32] = state.focal[0];
      uniformData[33] = state.focal[1];
      uniformData[34] = logicalViewportWidth;
      uniformData[35] = logicalViewportHeight;
      uniformData[36] = mode;
      uniformData[37] = state.pointSize;
      uniformData[38] = opacity;
      uniformData[39] = state.splatScale;
      uniformData[40] = state.brightness;
      uniformData[41] = state.contrast;
      uniformData[42] = state.gamma;
      uniformData[43] = state.alpha;
      uniformData[44] = state.blackLevel;
      uniformData[45] = state.whiteLevel;
      uniformData[46] = state.intensity;
      uniformData[47] = state.saturate;
      uniformData[48] = state.vibrance;
      uniformData[49] = state.temperature;
      uniformData[50] = state.tint;
      uniformData[51] = state.antialias;
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
      logicalViewportWidth: number;
      logicalViewportHeight: number;
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
        params.logicalViewportWidth,
        params.logicalViewportHeight,
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
      logicalW: number,
      logicalH: number,
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
          logicalViewportWidth: logicalW,
          logicalViewportHeight: logicalH,
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
          logicalViewportWidth: logicalW,
          logicalViewportHeight: logicalH,
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
          logicalViewportWidth: logicalW,
          logicalViewportHeight: logicalH,
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
          logicalViewportWidth: logicalW,
          logicalViewportHeight: logicalH,
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
          logicalViewportWidth: logicalW,
          logicalViewportHeight: logicalH,
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
        state.viewport[0],
        state.viewport[1],
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
        state.viewport[0],
        state.viewport[1],
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
      const logicalHalfWidth = Math.max(1, Math.floor(state.viewport[0] / 2));
      const logicalRightWidth = Math.max(1, state.viewport[0] - logicalHalfWidth);

      drawEye(
        textureView,
        state.viewLeft,
        0,
        0,
        halfWidth,
        canvas.height,
        logicalHalfWidth,
        state.viewport[1],
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
        logicalRightWidth,
        state.viewport[1],
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
        state.viewport[0],
        state.viewport[1],
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
    renderMsLast = performance.now() - renderStart;
  };

  const setSplatData = (packed: Uint32Array, vertexCount: number) => {
    if (vertexCount <= 0 || packed.length <= 0) {
      instanceCount = 0;
      return;
    }
    const uploadStart = performance.now();
    ensureSplatCapacity(packed.length);
    // Upload a copy to prevent accidental external mutation during GPU readback.
    const upload = new Uint32Array(packed);
    device.queue.writeBuffer(splatBuffer, 0, upload);
    uploadMsAccum += performance.now() - uploadStart;
    instanceCount = vertexCount;
  };

  const setSortedIndices = (indices: Uint32Array) => {
    if (indices.length <= 0) {
      instanceCount = 0;
      return;
    }
    const uploadStart = performance.now();
    ensureIndexCapacity(indices.length);
    // Same defensive copy for indices.
    const upload = new Uint32Array(indices);
    device.queue.writeBuffer(sortedIndexBuffer, 0, upload);
    uploadMsAccum += performance.now() - uploadStart;
    instanceCount = indices.length;
  };

  const setResolutionScale = (scale: number) => {
    const clamped = Math.max(0.3, Math.min(1, scale));
    const quantized = Math.round(clamped * 20) / 20;
    if (Math.abs(quantized - resolutionScale) < 1e-6) return;
    resolutionScale = quantized;
    resize();
  };

  const consumeTimings = () => {
    const timings = { uploadMs: uploadMsAccum, renderMs: renderMsLast };
    uploadMsAccum = 0;
    return timings;
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

  return { render, setSplatData, setSortedIndices, setResolutionScale, consumeTimings };
}

function nextPow2(value: number): number {
  let result = 1;
  while (result < value) result <<= 1;
  return result;
}
