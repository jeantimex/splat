import type { Mat4 } from './camera';

export interface CameraGizmo {
  update: (view: Mat4) => void;
}

type AxisSpec = {
  key: 'x' | 'y' | 'z' | '-x' | '-y' | '-z';
  vector: [number, number, number];
  color: string;
  label: '' | 'X' | 'Y' | 'Z';
  filled: boolean;
  flipVertical: boolean;
};

const AXES: AxisSpec[] = [
  // Requested convention: +Y up, +X right, +Z towards the viewer.
  { key: 'x', vector: [1, 0, 0], color: '#ff4a4a', label: 'X', filled: true, flipVertical: true },
  {
    key: '-x',
    vector: [-1, 0, 0],
    color: '#ff4a4a',
    label: '',
    filled: false,
    flipVertical: true,
  },
  {
    key: 'y',
    vector: [0, -1, 0],
    color: '#45ff57',
    label: 'Y',
    filled: true,
    flipVertical: true,
  },
  {
    key: '-y',
    vector: [0, 1, 0],
    color: '#45ff57',
    label: '',
    filled: false,
    flipVertical: true,
  },
  // Camera space here has +Z away from viewer, so we flip world Z for gizmo labeling.
  {
    key: 'z',
    vector: [0, 0, -1],
    color: '#6870ff',
    label: 'Z',
    filled: true,
    flipVertical: true,
  },
  {
    key: '-z',
    vector: [0, 0, 1],
    color: '#6870ff',
    label: '',
    filled: false,
    flipVertical: true,
  },
];

export function createCameraGizmo(canvas: HTMLCanvasElement): CameraGizmo {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to create camera gizmo 2D context');
  }

  const size = 120;
  const center = size * 0.5;
  const armLength = 46;
  const radius = 13;

  const toCamera = (view: Mat4, v: [number, number, number]) => {
    const x = view[0] * v[0] + view[4] * v[1] + view[8] * v[2];
    const y = view[1] * v[0] + view[5] * v[1] + view[9] * v[2];
    const z = view[2] * v[0] + view[6] * v[1] + view[10] * v[2];
    return { x, y, z };
  };

  const drawNode = (
    x: number,
    y: number,
    color: string,
    filled: boolean,
    label: string,
    alpha: number,
  ) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;

    if (filled) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      if (label) {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y + 0.5);
      }
    } else {
      ctx.fillStyle = '#1a2127';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawLink = (x: number, y: number, color: string, alpha: number) => {
    const dx = x - center;
    const dy = y - center;
    if (dx * dx + dy * dy < 2) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();
  };

  const update = (view: Mat4) => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const targetSize = Math.round(size * dpr);
    if (canvas.width !== targetSize || canvas.height !== targetSize) {
      canvas.width = targetSize;
      canvas.height = targetSize;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const points = AXES.map((axis) => {
      const cam = toCamera(view, axis.vector);
      return {
        ...axis,
        cx: center + cam.x * armLength,
        cy: center + (axis.flipVertical ? 1 : -1) * cam.y * armLength,
        depth: cam.z,
      };
    });

    // Draw positive axis stems before nodes for a cleaner gizmo look.
    for (const p of points) {
      if (p.filled) {
        // depth<0 is closer to viewer in this camera convention.
        const linkAlpha = Math.max(0.45, Math.min(1, 0.85 - p.depth * 0.25));
        drawLink(p.cx, p.cy, p.color, linkAlpha);
      }
    }

    // Back-to-front draw for correct overlap.
    points.sort((a, b) => b.depth - a.depth);

    for (const p of points) {
      const alpha = Math.max(0.4, Math.min(1, 0.85 - p.depth * 0.25));
      drawNode(p.cx, p.cy, p.color, p.filled, p.label, alpha);
    }
  };

  return { update };
}
