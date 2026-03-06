/**
 * =============================================================================
 * 3D GAUSSIAN SPLATTING (3DGS) VIEWER - MAIN APPLICATION ENTRY POINT
 * =============================================================================
 *
 * This file is the main entry point for a real-time 3D Gaussian Splatting viewer
 * built with WebGPU. 3DGS is a novel view synthesis technique that represents
 * scenes as collections of 3D Gaussian primitives, each with:
 *
 *   - Position (x, y, z): The center of the Gaussian in world space
 *   - Covariance (3x3 matrix): Defines the shape/orientation of the ellipsoid
 *   - Color (RGB): Typically stored as spherical harmonics coefficients
 *   - Opacity (alpha): Transparency of the Gaussian
 *
 * HOW 3DGS RENDERING WORKS (HIGH-LEVEL OVERVIEW):
 * ------------------------------------------------
 * 1. LOAD: Parse .splat or .ply files containing Gaussian parameters
 * 2. PREPROCESS: Convert raw data into GPU-friendly packed format
 * 3. SORT: Order Gaussians back-to-front based on camera view (CPU worker)
 * 4. RENDER: For each Gaussian (as instanced quads):
 *    a. Project 3D Gaussian center to screen space
 *    b. Compute 2D covariance from 3D covariance via Jacobian of projection
 *    c. Extract ellipse axes from eigenvalues of 2D covariance
 *    d. Expand quad vertices along ellipse axes
 *    e. In fragment shader: evaluate Gaussian falloff and alpha-blend
 *
 * ARCHITECTURE:
 * - Main thread: Orchestrates rendering, handles UI, manages camera
 * - Web Worker: Handles CPU-intensive sorting and PLY parsing off main thread
 * - WebGPU: GPU-accelerated rendering with instanced draw calls
 *
 * KEY CONCEPTS:
 * - Alpha Blending: Gaussians are semi-transparent; correct ordering is crucial
 * - Splatting: Each Gaussian "splats" onto the screen as a 2D ellipse
 * - Depth Sorting: Back-to-front ordering ensures proper alpha composition
 */

import './style.css';
import type GUI from 'lil-gui';

// Viewer modules
import {
  DEFAULT_CAMERAS,
  getProjectionMatrix,
  getViewMatrix,
  invert4,
  multiply4,
  type CameraPose,
  type Mat4,
} from './viewer/camera';
import { centerCamera, getEyeViewMatrix, interpolateViewMatrix } from './viewer/camera-utils';
import { createControls } from './viewer/controls';
import { getViewerDom, hideSpinner, setupStereoButtons, showSpinner } from './viewer/dom';
import { createCameraGizmo, type GizmoAxisKey } from './viewer/gizmo';
import { createGui, type GuiCallbacks } from './viewer/gui';
import { registerDragDrop, registerKeyboardShortcuts } from './viewer/input';
import { SPLAT_ROW_BYTES } from './viewer/loader';
import { createWebGPURenderer } from './viewer/renderer-webgpu';
import { createSortWorker } from './viewer/sort-worker';
import { DEFAULT_RENDER_OPTIONS, type RenderOptions } from './viewer/types';
import {
  decodeViewMatrix,
  downloadBinary,
  encodeViewMatrix,
  isPlyBuffer,
  normalizeIndex,
} from './viewer/utils';

// Initialize DOM references
const dom = getViewerDom();

/**
 * Main application entry point.
 *
 * Initializes all subsystems required for 3DGS rendering:
 * 1. WebGPU context and render pipelines
 * 2. Camera controls (orbit, pan, zoom)
 * 3. Sort worker for depth ordering
 * 4. GUI for runtime parameter adjustment
 * 5. Animation loop for continuous rendering
 *
 * The core rendering pipeline follows this flow each frame:
 *
 *   [Camera Update] → [View Matrix] → [Sort Worker]
 *         ↓                               ↓
 *   [Projection Matrix]           [Sorted Indices]
 *         ↓                               ↓
 *         └──────────────┬────────────────┘
 *                        ↓
 *                  [GPU Render]
 *                        ↓
 *               [Alpha-Blended Output]
 */
async function main() {
  // Hard fail early when WebGPU is unavailable so we do not initialize
  // event listeners or workers that can never render.
  if (!navigator.gpu) {
    dom.message.textContent = 'WebGPU is not available in this browser.';
    return;
  }

  // ==========================================================================
  // INITIALIZE CORE SUBSYSTEMS
  // ==========================================================================

  const renderer = await createWebGPURenderer(dom.canvas);
  const controls = createControls(dom.canvas);
  const renderOptions: RenderOptions = { ...DEFAULT_RENDER_OPTIONS };
  let cameras: CameraPose[] = [...DEFAULT_CAMERAS];
  let currentCameraIndex = 0;

  // Camera animation state
  let startViewMatrix: Mat4 | null = null;
  let targetViewMatrix: Mat4 | null = null;
  let animationStartTime = 0;

  const animateToView = (nextView: Mat4) => {
    if (renderOptions.animateCamera) {
      startViewMatrix = [...controls.viewMatrix];
      targetViewMatrix = [...nextView];
      animationStartTime = performance.now();
    } else {
      controls.setViewMatrix(nextView);
      startViewMatrix = null;
      targetViewMatrix = null;
    }
  };

  const normalize3 = (v: [number, number, number]): [number, number, number] => {
    const len = Math.hypot(v[0], v[1], v[2]);
    if (len < 1e-8) return [0, 0, 1];
    return [v[0] / len, v[1] / len, v[2] / len];
  };

  const cross3 = (
    a: [number, number, number],
    b: [number, number, number],
  ): [number, number, number] => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];

  const computeSnapViewMatrix = (axis: GizmoAxisKey): Mat4 | null => {
    const axisDirection: Record<GizmoAxisKey, [number, number, number]> = {
      x: [1, 0, 0],
      '-x': [-1, 0, 0],
      y: [0, -1, 0],
      '-y': [0, 1, 0],
      z: [0, 0, -1],
      '-z': [0, 0, 1],
    };

    const inv = invert4(controls.viewMatrix);
    if (!inv) return null;

    const currentPosition: [number, number, number] = [inv[12], inv[13], inv[14]];
    const currentForward = normalize3([inv[8], inv[9], inv[10]]);

    // Match controls orbit pivot convention (fixed focus distance in front of camera).
    const focusDistance = 4;
    const pivot: [number, number, number] = [
      currentPosition[0] + currentForward[0] * focusDistance,
      currentPosition[1] + currentForward[1] * focusDistance,
      currentPosition[2] + currentForward[2] * focusDistance,
    ];

    // Axis button selects which world-axis side the camera moves to.
    const orbitDir = axisDirection[axis];
    const snappedPosition: [number, number, number] = [
      pivot[0] + orbitDir[0] * focusDistance,
      pivot[1] + orbitDir[1] * focusDistance,
      pivot[2] + orbitDir[2] * focusDistance,
    ];

    const forward = normalize3([
      pivot[0] - snappedPosition[0],
      pivot[1] - snappedPosition[1],
      pivot[2] - snappedPosition[2],
    ]);
    const upRef: [number, number, number] =
      Math.abs(forward[1]) > 0.98 ? [0, 0, 1] : [0, 1, 0];
    const right = normalize3(cross3(upRef, forward));
    const up = normalize3(cross3(forward, right));

    const cameraToWorld: Mat4 = [
      right[0],
      right[1],
      right[2],
      0,
      up[0],
      up[1],
      up[2],
      0,
      forward[0],
      forward[1],
      forward[2],
      0,
      snappedPosition[0],
      snappedPosition[1],
      snappedPosition[2],
      1,
    ];

    return invert4(cameraToWorld);
  };

  const gizmo = createCameraGizmo(dom.gizmo, {
    onAxisClick: (axis) => {
      controls.setCarousel(false);
      const snapped = computeSnapViewMatrix(axis);
      if (!snapped) return;
      animateToView(snapped);
    },
  });

  // ==========================================================================
  // CAMERA PRESET MANAGEMENT
  // ==========================================================================

  /**
   * Applies a camera preset (intrinsics + pose) to the live controls.
   * Optionally animates the transition for smooth camera movement.
   */
  const applyCamera = (index: number) => {
    if (!cameras.length) return;
    currentCameraIndex = normalizeIndex(index, cameras.length);
    const camera = cameras[currentCameraIndex];

    const nextView = getViewMatrix(camera);
    animateToView(nextView);

    controls.camera.fx = camera.fx;
    controls.camera.fy = camera.fy;
    controls.setCarousel(false);
  };

  // Camera dropdown state
  const cameraState = { selectedCamera: '' };
  let cameraDropdown: ReturnType<GUI['add']> | null = null;

  /**
   * Updates the camera dropdown in the GUI with new camera list.
   */
  const updateCameraDropdown = (
    newCameras: CameraPose[],
    cameraGui: GUI,
    callbacks: GuiCallbacks,
  ) => {
    if (cameraDropdown) {
      cameraDropdown.destroy();
    }
    const cameraNames = newCameras.map((c, i) => `${i + 1}: ${c.img_name}`);
    cameraState.selectedCamera = cameraNames[0] || '';
    cameraDropdown = cameraGui
      .add(cameraState, 'selectedCamera', cameraNames)
      .name('Positions')
      .onChange((displayName: string) => {
        const indexStr = displayName.split(':')[0];
        const index = Number.parseInt(indexStr, 10) - 1;
        if (index >= 0 && index < newCameras.length) {
          callbacks.onApplyCamera(index);
        }
      });
  };

  // ==========================================================================
  // GUI SETUP
  // ==========================================================================

  const guiCallbacks: GuiCallbacks = {
    onCamerasLoaded: (newCameras, cameraGui, callbacks) => {
      cameras = newCameras;
      updateCameraDropdown(newCameras, cameraGui, callbacks);
    },
    onApplyCamera: (index) => {
      applyCamera(index);
    },
    onLogPose: () => {
      const inv = invert4(controls.viewMatrix);
      if (!inv) return;
      const pose = {
        id: crypto.randomUUID(),
        img_name: `custom_${cameras.length}`,
        width: dom.canvas.width,
        height: dom.canvas.height,
        position: [inv[12], inv[13], inv[14]],
        rotation: [
          [inv[0], inv[4], inv[8]],
          [inv[1], inv[5], inv[9]],
          [inv[2], inv[6], inv[10]],
        ],
        fy: controls.camera.fy,
        fx: controls.camera.fx,
      };
      console.log('Current Camera Pose:', JSON.stringify(pose, null, 2));
    },
    onReset: () => {
      Object.assign(renderOptions, DEFAULT_RENDER_OPTIONS);
      gui.controllersRecursive().forEach((c) => c.updateDisplay());
      updateStereoUi();
    },
  };

  const gui = createGui(renderOptions, guiCallbacks, dom);
  const updateStereoUi = setupStereoButtons(dom, renderOptions);
  const cameraGui = gui.folders.find((f) => f._title === 'Camera');

  // ==========================================================================
  // RENDER STATE
  // ==========================================================================

  let loadedVertices = 0;
  let pcTransition = 0; // Crossfade: 0 = splat, 1 = point cloud
  let renderScale = 1;
  let lastCameraMotionAt = performance.now();
  let lastScaleChangeAt = 0;
  const previousViewMatrix: Mat4 = [...controls.viewMatrix];
  let hasPostedViewProj = false;
  let lastViewProjPostAt = 0;
  const lastPostedViewProj = new Float32Array(16);
  let sortMsSample = 0;
  let sortMsPending = false;

  // ==========================================================================
  // URL HASH CAMERA PERSISTENCE
  // ==========================================================================

  /** Restores view matrix from URL hash, returns false if invalid */
  const setViewFromHash = (hashValue: string): boolean => {
    const matrix = decodeViewMatrix(hashValue);
    if (!matrix) return false;
    controls.setViewMatrix(matrix);
    controls.setCarousel(false);
    return true;
  };

  /** Saves current view matrix to URL hash */
  const saveViewToHash = () => {
    location.hash = `#${encodeURIComponent(encodeViewMatrix(controls.viewMatrix))}`;
  };

  // ==========================================================================
  // SORT WORKER SETUP
  // ==========================================================================

  /**
   * The sort worker handles CPU-intensive tasks off the main thread:
   * 1. PLY parsing and conversion to internal format
   * 2. Depth sorting for correct alpha blending (back-to-front order)
   */
  const sortWorker = createSortWorker({
    onSortResult: ({ depthIndex, sortMs }) => {
      renderer.setSortedIndices(depthIndex);
      sortMsSample = sortMs;
      sortMsPending = true;
    },
    onSplatData: ({ splatData, vertexCount }) => {
      loadedVertices = vertexCount;
      renderer.setSplatData(splatData, vertexCount);
      hideSpinner(dom);
      dom.dropzone.classList.add('hidden');
      centerCamera(splatData, vertexCount, controls);
    },
    onConvertedBuffer: (buffer, save) => {
      const uint = new Uint8Array(buffer);
      loadedVertices = Math.floor(uint.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      if (save) {
        downloadBinary(uint, 'model.splat');
      }
    },
  });

  // ==========================================================================
  // INPUT HANDLING
  // ==========================================================================

  // Restore camera from URL hash, or use default preset
  if (!setViewFromHash(location.hash.slice(1))) {
    applyCamera(currentCameraIndex);
  }

  // Register keyboard shortcuts
  registerKeyboardShortcuts({
    applyCamera,
    getCurrentCameraIndex: () => currentCameraIndex,
    saveViewToHash,
    setCarousel: (enabled) => controls.setCarousel(enabled),
  });

  // Handle URL hash changes
  window.addEventListener('hashchange', () => {
    setViewFromHash(location.hash.slice(1));
  });

  // Register drag-and-drop and click-to-upload file handling
  registerDragDrop({
    dropzone: dom.dropzone,
    onFile: async (file) => {
      controls.setCarousel(false);
      showSpinner(dom);

      // Handle camera JSON files
      if (/\.json$/i.test(file.name)) {
        const parsed = JSON.parse(await file.text()) as CameraPose[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          cameras = parsed;
          if (cameraGui) {
            updateCameraDropdown(parsed, cameraGui, guiCallbacks);
          }
          applyCamera(0);
          hideSpinner(dom);
        }
        return;
      }

      // Handle scene files (PLY or SPLAT)
      const buffer = await file.arrayBuffer();
      if (isPlyBuffer(buffer)) {
        sortWorker.postPlyBuffer(buffer, false);
        return;
      }

      loadedVertices = Math.floor(buffer.byteLength / SPLAT_ROW_BYTES);
      sortWorker.postSplatBuffer(buffer, loadedVertices);
      // Note: hideSpinner is called in onSplatData callback
    },
  });

  dom.progress.style.display = 'none';
  dom.message.textContent = '';

  // ==========================================================================
  // RENDER LOOP
  // ==========================================================================

  let lastFrame = performance.now();
  let smoothedFps = 0;
  let smoothedSortMs = 0;
  let smoothedUploadMs = 0;
  let smoothedRenderMs = 0;

  /**
   * Main render loop - called every frame via requestAnimationFrame.
   *
   * Steps:
   * 1. Update camera controls (process input, apply inertia)
   * 2. Animate camera transitions if active
   * 3. Compute projection matrix from FOV and viewport
   * 4. Send viewProjection to sort worker if camera moved
   * 5. Render all Gaussians with current sorted order
   * 6. Update performance stats
   */
  const frame = (now: number) => {
    const dtMs = Math.max(now - lastFrame, 0.0001);
    const dtForControls = Math.min(dtMs, 34);
    lastFrame = now;

    // Update camera controls
    controls.update(dtForControls);
    gizmo.update(controls.viewMatrix);

    // Cancel animation if user is interacting
    if (controls.isInteracting) {
      startViewMatrix = null;
      targetViewMatrix = null;
    }

    // Animate camera transition using SLERP for smooth rotation
    if (startViewMatrix && targetViewMatrix) {
      const elapsed = now - animationStartTime;
      const duration = Math.max(renderOptions.animationDuration, 1);
      const t = Math.min(elapsed / duration, 1);
      const ease = t * t * (3 - 2 * t); // Smoothstep easing

      const next = interpolateViewMatrix(startViewMatrix, targetViewMatrix, ease);
      controls.setViewMatrix(next);

      if (t >= 1) {
        startViewMatrix = null;
        targetViewMatrix = null;
      }
    }

    // Track camera motion for adaptive resolution
    let viewDelta = 0;
    for (let i = 0; i < 16; i++) {
      const current = controls.viewMatrix[i];
      viewDelta += Math.abs(current - previousViewMatrix[i]);
      previousViewMatrix[i] = current;
    }
    if (viewDelta > 1e-4) {
      lastCameraMotionAt = now;
    }

    // Adaptive resolution: lower during motion, restore when still.
    // In point-cloud mode this can cause visible brightness pumping while dragging,
    // so keep full internal resolution for stable point coverage.
    const cameraActive = now - lastCameraMotionAt < 140;
    const canChangeScale = now - lastScaleChangeAt > 180;
    if (renderOptions.pointCloud) {
      if (renderScale !== 1) {
        renderScale = 1;
        lastScaleChangeAt = now;
        renderer.setResolutionScale(renderScale);
      }
    } else if (cameraActive && renderScale > 0.7 && canChangeScale) {
      renderScale = 0.7;
      lastScaleChangeAt = now;
      renderer.setResolutionScale(renderScale);
    } else if (!cameraActive && renderScale < 1 && canChangeScale) {
      renderScale = renderScale < 0.85 ? 0.85 : 1;
      lastScaleChangeAt = now;
      renderer.setResolutionScale(renderScale);
    }

    // Animate splat ↔ point cloud crossfade
    const pcTarget = renderOptions.pointCloud ? 1 : 0;
    if (pcTransition !== pcTarget) {
      const step = (dtMs / 500) * Math.sign(pcTarget - pcTransition);
      pcTransition =
        pcTarget > pcTransition
          ? Math.min(pcTarget, pcTransition + step)
          : Math.max(pcTarget, pcTransition + step);

      if (Math.abs(pcTransition - pcTarget) < 0.001) {
        pcTransition = pcTarget;
      }
    }

    // Compute projection matrix
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const logicalWidth = Math.max(1, Math.round(dom.canvas.clientWidth * dpr));
    const logicalHeight = Math.max(1, Math.round(dom.canvas.clientHeight * dpr));
    const fovRad = (renderOptions.fov * Math.PI) / 180;
    const fovFy = logicalHeight / (2 * Math.tan(fovRad / 2));
    const fxFyRatio = controls.camera.fx / Math.max(controls.camera.fy, 1e-6);
    const fovFx = fovFy * fxFyRatio;
    const projection = getProjectionMatrix(fovFx, fovFy, logicalWidth, logicalHeight);

    // Post view-projection to sort worker if needed
    const viewProj = multiply4(projection, controls.viewMatrix);
    let maxViewProjDelta = 0;
    for (let i = 0; i < 16; i++) {
      maxViewProjDelta = Math.max(maxViewProjDelta, Math.abs(viewProj[i] - lastPostedViewProj[i]));
    }
    const postIntervalMs = cameraActive ? 28 : 85;
    const timeSincePost = now - lastViewProjPostAt;
    const shouldPostView =
      !hasPostedViewProj ||
      (maxViewProjDelta > 0.0005 && timeSincePost >= postIntervalMs) ||
      timeSincePost >= 220;

    if (shouldPostView) {
      sortWorker.postViewProjection(viewProj);
      for (let i = 0; i < 16; i++) {
        lastPostedViewProj[i] = viewProj[i];
      }
      hasPostedViewProj = true;
      lastViewProjPostAt = now;
    }

    // Render frame
    const eyeOffset = renderOptions.stereoMode === 'anaglyph' ? 0.04 : 0.065;
    renderer.render({
      projection,
      view: controls.viewMatrix,
      viewLeft: getEyeViewMatrix(controls.viewMatrix, -eyeOffset),
      viewRight: getEyeViewMatrix(controls.viewMatrix, eyeOffset),
      focal: [fovFx, fovFy],
      viewport: [logicalWidth, logicalHeight],
      transition: pcTransition,
      pointSize: renderOptions.pointSize,
      splatScale: renderOptions.splatScale,
      antialias: renderOptions.antialias,
      stereoMode: renderOptions.stereoMode,
      brightness: renderOptions.brightness,
      contrast: renderOptions.contrast,
      gamma: renderOptions.gamma,
      blackLevel: renderOptions.blackLevel,
      whiteLevel: renderOptions.whiteLevel,
      intensity: renderOptions.intensity,
      saturate: renderOptions.saturate,
      vibrance: renderOptions.vibrance,
      temperature: renderOptions.temperature,
      tint: renderOptions.tint,
      alpha: renderOptions.alpha,
    });

    // Update performance stats
    const timings = renderer.consumeTimings();
    const fps = 1000 / dtMs;
    smoothedFps = smoothedFps * 0.9 + fps * 0.1;
    smoothedUploadMs = smoothedUploadMs * 0.85 + timings.uploadMs * 0.15;
    smoothedRenderMs = smoothedRenderMs * 0.85 + timings.renderMs * 0.15;
    if (sortMsPending) {
      smoothedSortMs = smoothedSortMs * 0.75 + sortMsSample * 0.25;
      sortMsPending = false;
    } else {
      smoothedSortMs *= 0.99;
    }

    dom.fps.textContent = `${Math.round(smoothedFps)} fps | ${loadedVertices.toLocaleString()} pts | sort ${smoothedSortMs.toFixed(1)}ms | upload ${smoothedUploadMs.toFixed(2)}ms | render ${smoothedRenderMs.toFixed(2)}ms`;

    requestAnimationFrame(frame);
  };

  // ==========================================================================
  // CLEANUP AND START
  // ==========================================================================

  window.addEventListener('beforeunload', () => sortWorker.terminate());
  window.addEventListener('beforeunload', () => gui.destroy());
  window.addEventListener('beforeunload', () => gizmo.destroy());
  requestAnimationFrame(frame);
}

// Start the application
main().catch((err: unknown) => {
  const text = err instanceof Error ? err.message : String(err);
  dom.message.textContent = `Renderer init failed: ${text}`;
});
