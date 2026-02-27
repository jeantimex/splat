import {
  DEFAULT_INTRINSICS,
  DEFAULT_VIEW_MATRIX,
  invert4,
  rotate4,
  translate4,
  type CameraIntrinsics,
  type Mat4,
} from './camera';

interface ControlsState {
  camera: CameraIntrinsics;
  viewMatrix: Mat4;
  setViewMatrix: (matrix: Mat4) => void;
  setCarousel: (enabled: boolean) => void;
  update: (dtMs: number) => void;
}

export function createControls(canvas: HTMLCanvasElement): ControlsState {
  let viewMatrix: Mat4 = [...DEFAULT_VIEW_MATRIX];
  let carousel = false;
  let carouselStart = performance.now();
  const activeKeys = new Set<string>();

  let isDragging = false;
  let dragMode: 'orbit' | 'pan' | 'roll' = 'orbit';
  let lastX = 0;
  let lastY = 0;

  // Inertia velocities. Orbit/pan store the normalised screen-space deltas from
  // the most recent drag event; scroll accumulates wheel deltas. All three decay
  // exponentially in update() once the input stops.
  // INERTIA_DECAY is the fraction retained per 60 fps frame; the exponent in
  // update() makes it frame-rate independent.
  const INERTIA_DECAY = 0.92;
  const SCROLL_DECAY = 0.5;
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
    // Kill residual inertia so the new gesture starts clean.
    clearInertia();
  });

  canvas.addEventListener('mouseup', () => {
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

    const dx = (event.clientX - lastX) / Math.max(window.innerWidth, 1);
    const dy = (event.clientY - lastY) / Math.max(window.innerHeight, 1);

    const inv = invert4(viewMatrix);
    if (!inv) return;

    if (dragMode === 'orbit') {
      const d = 4;
      let next = translate4(inv, 0, 0, d);
      // Rotate around world Y to keep the horizon level.
      // viewMatrix[4..6] is the world Y axis [0,1,0] expressed in camera-local
      // coordinates. Using camera-local Y (0,1,0) instead would cause the
      // horizon to roll whenever the camera is pitched up or down.
      next = rotate4(next, 5 * dx, viewMatrix[4], viewMatrix[5], viewMatrix[6]);
      next = rotate4(next, -5 * dy, 1, 0, 0);
      next = translate4(next, 0, 0, -d);
      const out = invert4(next);
      if (out) viewMatrix = out;
      // Snapshot the delta so update() can coast after release.
      orbitVelocity = { dx, dy };
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

    lastX = event.clientX;
    lastY = event.clientY;
  });

  window.addEventListener(
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
    const decay = Math.pow(INERTIA_DECAY, dtMs / (1000 / 60));

    // Orbit inertia — only while the mouse is released.
    if (!isDragging && (Math.abs(orbitVelocity.dx) > 1e-5 || Math.abs(orbitVelocity.dy) > 1e-5)) {
      const inv = invert4(viewMatrix);
      if (inv) {
        const d = 4;
        let next = translate4(inv, 0, 0, d);
        next = rotate4(next, 5 * orbitVelocity.dx, viewMatrix[4], viewMatrix[5], viewMatrix[6]);
        next = rotate4(next, -5 * orbitVelocity.dy, 1, 0, 0);
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
        const out = invert4(rotate4(inv, 5 * rollVelocity, 0, 0, 1));
        if (out) viewMatrix = out;
      }
      rollVelocity *= decay;
    }

    // Pan inertia — only while the mouse is released.
    if (!isDragging && (Math.abs(panVelocity.dx) > 1e-5 || Math.abs(panVelocity.dy) > 1e-5)) {
      const inv = invert4(viewMatrix);
      if (inv) {
        const next = translate4(inv, -10 * panVelocity.dx, -10 * panVelocity.dy, 0);
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
        const next = translate4(inv, 0, 0, scrollVelocity);
        const out = invert4(next);
        if (out) viewMatrix = out;
      }
      scrollVelocity *= Math.pow(SCROLL_DECAY, dtMs / (1000 / 60));
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
