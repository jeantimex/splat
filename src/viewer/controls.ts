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
  let dragMode: 'orbit' | 'pan' = 'orbit';
  let lastX = 0;
  let lastY = 0;

  window.addEventListener('keydown', (event) => activeKeys.add(event.code));
  window.addEventListener('keyup', (event) => activeKeys.delete(event.code));
  window.addEventListener('blur', () => activeKeys.clear());

  canvas.addEventListener('mousedown', (event) => {
    event.preventDefault();
    carousel = false;
    isDragging = true;
    dragMode = event.ctrlKey || event.metaKey || event.button === 2 ? 'pan' : 'orbit';
    lastX = event.clientX;
    lastY = event.clientY;
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
      next = rotate4(next, 5 * dx, 0, 1, 0);
      next = rotate4(next, -5 * dy, 1, 0, 0);
      next = translate4(next, 0, 0, -d);
      const out = invert4(next);
      if (out) viewMatrix = out;
    } else {
      const next = translate4(inv, -10 * dx, 0, 10 * dy);
      const out = invert4(next);
      if (out) viewMatrix = out;
    }

    lastX = event.clientX;
    lastY = event.clientY;
  });

  window.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      carousel = false;
      const inv = invert4(viewMatrix);
      if (!inv) return;

      const z = (-10 * event.deltaY) / Math.max(window.innerHeight, 1);
      const next = translate4(inv, 0, 0, z);
      const out = invert4(next);
      if (out) viewMatrix = out;
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
    },
    setCarousel(enabled) {
      carousel = enabled;
      if (enabled) carouselStart = performance.now();
    },
    update,
  };
}
