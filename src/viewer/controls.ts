/**
 * =============================================================================
 * CAMERA CONTROLS FOR 3D GAUSSIAN SPLATTING VIEWER
 * =============================================================================
 *
 * This module provides interactive camera controls for exploring 3DGS scenes.
 *
 * CONTROL MODES:
 * --------------
 * 1. ORBIT (default drag)
 *    - Rotate camera around a focus point
 *    - Horizontal drag: rotate around world Y (yaw)
 *    - Vertical drag: rotate around camera X (pitch)
 *    - Keeps horizon level for natural navigation
 *
 * 2. PAN (Ctrl/Cmd + drag, or right-click drag)
 *    - Translate camera parallel to view plane
 *    - Horizontal drag: move camera left/right
 *    - Vertical drag: move camera up/down
 *
 * 3. ROLL (Shift + drag)
 *    - Rotate camera around its forward axis
 *    - Horizontal drag: clockwise/counter-clockwise roll
 *
 * 4. ZOOM (mouse wheel)
 *    - Move camera forward/backward along view direction
 *    - Scroll up: move closer to scene
 *    - Scroll down: move away from scene
 *
 * INERTIA SYSTEM:
 * ---------------
 * All controls have momentum for smooth, natural-feeling interaction:
 * - Velocity is captured during drag
 * - On release, velocity decays exponentially
 * - Provides smooth coasting after quick gestures
 *
 * The decay is frame-rate independent using: velocity *= decay^(dt/frame_time)
 *
 * KEYBOARD CONTROLS:
 * ------------------
 * - Arrow keys: Translate camera (forward/back/left/right)
 * - WASD: Rotate camera (pitch/yaw)
 *
 * CAROUSEL MODE:
 * --------------
 * An automated orbit mode that slowly rotates the camera for showcasing.
 * Disabled automatically when user interacts with the scene.
 */

import {
  DEFAULT_INTRINSICS,
  DEFAULT_VIEW_MATRIX,
  invert4,
  rotate4,
  translate4,
  type CameraIntrinsics,
  type Mat4,
} from './camera';

/** Public interface for camera controls */
interface ControlsState {
  /** Camera intrinsic parameters (focal lengths) */
  camera: CameraIntrinsics;
  /** Current view matrix (world → camera transform) */
  viewMatrix: Mat4;
  /** True if user is currently interacting (dragging or keys held) */
  isInteracting: boolean;
  /** Set the view matrix directly (for camera presets) */
  setViewMatrix: (matrix: Mat4) => void;
  /** Enable/disable carousel auto-rotation mode */
  setCarousel: (enabled: boolean) => void;
  /** Update function called each frame with delta time */
  update: (dtMs: number) => void;
}

/**
 * Creates camera controls attached to the given canvas.
 *
 * The controls manipulate the VIEW MATRIX, which transforms world
 * coordinates to camera coordinates. To move the camera forward,
 * we actually translate the world backward (hence the inverse operations).
 *
 * @param canvas The canvas element to attach input handlers to
 * @returns ControlsState object for interacting with the camera
 */
export function createControls(canvas: HTMLCanvasElement): ControlsState {
  // ============================================================================
  // CONTROL STATE
  // ============================================================================

  /** Current camera view matrix (transforms world → camera space) */
  let viewMatrix: Mat4 = [...DEFAULT_VIEW_MATRIX];

  /** Carousel mode enabled (auto-rotation for showcase) */
  let carousel = false;
  /** Time when carousel mode was started (for animation timing) */
  let carouselStart = performance.now();

  /** Currently pressed keyboard keys */
  const activeKeys = new Set<string>();

  // ============================================================================
  // MOUSE DRAG STATE
  // ============================================================================

  /** Whether mouse is currently being dragged */
  let isDragging = false;
  /** Current drag mode: orbit (rotate), pan (translate), or roll */
  let dragMode: 'orbit' | 'pan' | 'roll' = 'orbit';
  /** Last mouse position for computing deltas */
  let lastX = 0;
  let lastY = 0;
  /** Timestamp of last mouse move (for stale drag detection) */
  let lastDragMoveAt = 0;

  // ============================================================================
  // INERTIA SYSTEM
  // ============================================================================
  /**
   * Inertia provides smooth camera motion after user interaction stops.
   *
   * Each control mode has its own velocity:
   * - orbitVelocity: rotation speed (normalized screen deltas)
   * - panVelocity: translation speed (normalized screen deltas)
   * - rollVelocity: roll rotation speed
   * - scrollVelocity: zoom speed
   *
   * Velocities decay exponentially: v *= decay^(dt/reference_frame_time)
   * This ensures consistent feel regardless of frame rate.
   */
  const INERTIA_DECAY = 0.92;  // Fraction retained per 60fps frame for orbit/pan
  const SCROLL_DECAY = 0.5;    // Faster decay for scroll (feels more responsive)

  let orbitVelocity = { dx: 0, dy: 0 };
  let panVelocity = { dx: 0, dy: 0 };
  let rollVelocity = 0;
  let scrollVelocity = 0;

  const clearInertia = () => {
    orbitVelocity = { dx: 0, dy: 0 };
    panVelocity = { dx: 0, dy: 0 };
    rollVelocity = 0;
    scrollVelocity = 0;
  };

  window.addEventListener('keydown', (event) => activeKeys.add(event.code));
  window.addEventListener('keyup', (event) => activeKeys.delete(event.code));
  window.addEventListener('blur', () => activeKeys.clear());

  canvas.addEventListener('mousedown', (event) => {
    event.preventDefault();
    carousel = false;
    isDragging = true;
    if (event.shiftKey) dragMode = 'roll';
    else if (event.ctrlKey || event.metaKey || event.button === 2) dragMode = 'pan';
    else dragMode = 'orbit';
    lastX = event.clientX;
    lastY = event.clientY;
    lastDragMoveAt = performance.now();
    // Kill residual inertia so the new gesture starts clean.
    clearInertia();
  });

  canvas.addEventListener('mouseup', () => {
    // If pointer stopped before release, do not apply stale release inertia.
    if (performance.now() - lastDragMoveAt > 80) {
      clearInertia();
    }
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  canvas.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    event.preventDefault();

    const dx = (event.clientX - lastX) / Math.max(window.innerWidth, 1);
    const dy = (event.clientY - lastY) / Math.max(window.innerHeight, 1);

    lastX = event.clientX;
    lastY = event.clientY;
    lastDragMoveAt = performance.now();

    if (Math.abs(dx) < 1e-10 && Math.abs(dy) < 1e-10) return;

    let sdx = dx;
    let sdy = dy;

    const inv = invert4(viewMatrix);
    if (!inv) return;

    if (dragMode === 'orbit') {
      /**
       * ORBIT CONTROL - Arcball-style camera rotation
       * =============================================
       *
       * The orbit works by:
       * 1. Move camera backward to orbit distance (translate +Z)
       * 2. Apply rotations around the origin
       * 3. Move camera forward back to original distance (translate -Z)
       *
       * This creates the effect of orbiting around a point 'd' units
       * in front of the camera.
       *
       * HORIZON LOCK:
       * We rotate around the WORLD Y-axis (up) for horizontal motion,
       * not the camera's Y-axis. This keeps the horizon level as the
       * user orbits, which feels more natural.
       *
       * To find world-Y in view matrix coordinates, we read column 1
       * (the camera's Y basis vector in world space).
       */
      const d = 4;  // Orbit distance (units in front of camera)
      let next = translate4(inv, 0, 0, d);  // Step back to orbit point

      // Extract camera's Y-axis (world up) from view matrix
      const axisY = [viewMatrix[4], viewMatrix[5], viewMatrix[6]];
      const axisYLen = Math.hypot(axisY[0], axisY[1], axisY[2]);

      // Yaw: rotate around world Y (horizontal drag)
      if (axisYLen > 1e-6) {
        next = rotate4(
          next,
          5 * sdx,  // Scale factor for sensitivity
          axisY[0] / axisYLen,
          axisY[1] / axisYLen,
          axisY[2] / axisYLen,
        );
      }

      /**
       * PITCH CLAMPING
       * Prevent the camera from flipping over the poles (gimbal lock avoidance).
       *
       * axisY[2] represents how aligned the camera's up is with world Z.
       * When |axisY[2]| ≈ 1, camera is looking nearly straight up or down.
       * Clamping at 0.98 (~78°) prevents uncomfortable flipping.
       */
      const currentPitch = axisY[2] / axisYLen;
      if ((sdy > 0 && currentPitch < 0.98) || (sdy < 0 && currentPitch > -0.98)) {
        next = rotate4(next, -5 * sdy, 1, 0, 0);  // Pitch around camera X
      }

      next = translate4(next, 0, 0, -d);  // Step forward to original distance
      const out = invert4(next);
      if (out) viewMatrix = out;

      // Store velocity for inertia (coasting after release)
      orbitVelocity = { dx: sdx, dy: sdy };
    } else if (dragMode === 'roll') {
      // Rotate around the camera's local Z axis (the forward axis).
      // Horizontal drag rolls the camera: right = clockwise, left = counter-clockwise.
      const out = invert4(rotate4(inv, 5 * dx, 0, 0, 1));
      if (out) viewMatrix = out;
      rollVelocity = dx;
    } else {
      const next = translate4(inv, -10 * dx, -10 * dy, 0);
      const out = invert4(next);
      if (out) viewMatrix = out;
      panVelocity = { dx, dy };
    }
  });

  canvas.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      carousel = false;
      // Accumulate into scrollVelocity; update() applies and decays it each frame.
      // Multiple wheel events between frames are handled correctly by accumulation.
      scrollVelocity += (-10 * event.deltaY) / Math.max(window.innerHeight, 1);
    },
    { passive: false },
  );

  const update = (dtMs: number) => {
    if (carousel) {
      const t = Math.sin((performance.now() - carouselStart) / 5000);
      let inv = invert4(DEFAULT_VIEW_MATRIX);
      if (!inv) return;
      inv = translate4(inv, 2.5 * t, 0, 6 * (1 - Math.cos(t)));
      inv = rotate4(inv, -0.6 * t, 0, 1, 0);
      const next = invert4(inv);
      if (next) viewMatrix = next;
      return;
    }

    // Frame-rate independent exponential decay.
    const dtFactor = dtMs / (1000 / 60);
    const decay = Math.pow(INERTIA_DECAY, dtFactor);

    // Orbit inertia — only while the mouse is released.
    if (!isDragging && (Math.abs(orbitVelocity.dx) > 1e-5 || Math.abs(orbitVelocity.dy) > 1e-5)) {
      const inv = invert4(viewMatrix);
      if (inv) {
        const d = 4;
        let next = translate4(inv, 0, 0, d);
        // Apply velocity proportional to dtFactor for frame-rate independence.
        const axisY = [viewMatrix[4], viewMatrix[5], viewMatrix[6]];
        const axisYLen = Math.hypot(axisY[0], axisY[1], axisY[2]);
        if (axisYLen > 1e-6) {
          next = rotate4(
            next,
            5 * orbitVelocity.dx * dtFactor,
            axisY[0] / axisYLen,
            axisY[1] / axisYLen,
            axisY[2] / axisYLen,
          );
        }

        // Apply pitch inertia with clamping.
        const currentPitch = axisY[2] / axisYLen;
        const pitchDelta = -5 * orbitVelocity.dy * dtFactor;
        if ((pitchDelta > 0 && currentPitch < 0.98) || (pitchDelta < 0 && currentPitch > -0.98)) {
          next = rotate4(next, pitchDelta, 1, 0, 0);
        }

        next = translate4(next, 0, 0, -d);
        const out = invert4(next);
        if (out) viewMatrix = out;
      }
      orbitVelocity.dx *= decay;
      orbitVelocity.dy *= decay;
    }

    // Roll inertia — only while the mouse is released.
    if (!isDragging && Math.abs(rollVelocity) > 1e-5) {
      const inv = invert4(viewMatrix);
      if (inv) {
        const out = invert4(rotate4(inv, 5 * rollVelocity * dtFactor, 0, 0, 1));
        if (out) viewMatrix = out;
      }
      rollVelocity *= decay;
    }

    // Pan inertia — only while the mouse is released.
    if (!isDragging && (Math.abs(panVelocity.dx) > 1e-5 || Math.abs(panVelocity.dy) > 1e-5)) {
      const inv = invert4(viewMatrix);
      if (inv) {
        const next = translate4(
          inv,
          -10 * panVelocity.dx * dtFactor,
          -10 * panVelocity.dy * dtFactor,
          0,
        );
        const out = invert4(next);
        if (out) viewMatrix = out;
      }
      panVelocity.dx *= decay;
      panVelocity.dy *= decay;
    }

    // Scroll inertia — always active (wheel events only accumulate, never apply directly).
    // Uses a separate, faster decay so zoom doesn't coast as long as orbit/pan.
    if (Math.abs(scrollVelocity) > 1e-5) {
      const inv = invert4(viewMatrix);
      if (inv) {
        // Scroll velocity is already delta-based, but we scale it by dtFactor
        // for consistent application during decay.
        const next = translate4(inv, 0, 0, scrollVelocity * dtFactor);
        const out = invert4(next);
        if (out) viewMatrix = out;
      }
      scrollVelocity *= Math.pow(SCROLL_DECAY, dtFactor);
    }

    // Keyboard controls.
    const inv = invert4(viewMatrix);
    if (!inv) return;

    const moveSpeed = 0.003 * dtMs;
    const rotateSpeed = 0.0008 * dtMs;

    let next = inv;
    let changed = false;

    if (activeKeys.has('ArrowUp')) {
      next = translate4(next, 0, 0, moveSpeed);
      changed = true;
    }
    if (activeKeys.has('ArrowDown')) {
      next = translate4(next, 0, 0, -moveSpeed);
      changed = true;
    }
    if (activeKeys.has('ArrowLeft')) {
      next = translate4(next, -moveSpeed, 0, 0);
      changed = true;
    }
    if (activeKeys.has('ArrowRight')) {
      next = translate4(next, moveSpeed, 0, 0);
      changed = true;
    }

    if (activeKeys.has('KeyA')) {
      next = rotate4(next, -rotateSpeed, 0, 1, 0);
      changed = true;
    }
    if (activeKeys.has('KeyD')) {
      next = rotate4(next, rotateSpeed, 0, 1, 0);
      changed = true;
    }
    if (activeKeys.has('KeyW')) {
      next = rotate4(next, rotateSpeed * 0.7, 1, 0, 0);
      changed = true;
    }
    if (activeKeys.has('KeyS')) {
      next = rotate4(next, -rotateSpeed * 0.7, 1, 0, 0);
      changed = true;
    }

    if (!changed) return;
    const out = invert4(next);
    if (out) viewMatrix = out;
  };

  return {
    camera: { ...DEFAULT_INTRINSICS },
    get viewMatrix() {
      return viewMatrix;
    },
    get isInteracting() {
      return isDragging || activeKeys.size > 0;
    },
    setViewMatrix(matrix) {
      viewMatrix = [...matrix];
      clearInertia();
    },
    setCarousel(enabled) {
      carousel = enabled;
      if (enabled) {
        carouselStart = performance.now();
        clearInertia();
      }
    },
    update,
  };
}
