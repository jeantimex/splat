/**
 * =============================================================================
 * SHARED TYPES AND CONSTANTS FOR 3DGS VIEWER
 * =============================================================================
 */

/** DOM element references for the viewer UI */
export interface ViewerDom {
  canvas: HTMLCanvasElement;
  gizmo: HTMLCanvasElement;
  message: HTMLDivElement;
  spinner: HTMLDivElement;
  fps: HTMLSpanElement;
  progress: HTMLDivElement;
  dropzone: HTMLDivElement;
  anaglyphButton: HTMLButtonElement;
  stereoButton: HTMLButtonElement;
}

/**
 * Runtime rendering options that affect how Gaussians are displayed.
 *
 * These parameters control the visual appearance and can be adjusted in real-time:
 * - pointCloud: Toggle between Gaussian splatting and simple point cloud rendering
 * - splatScale: Scale factor for Gaussian ellipse size (affects visual density)
 * - antialias: Low-pass filter strength to reduce aliasing on small splats
 *
 * The color grading options (brightness, contrast, gamma, etc.) are applied
 * in the fragment shader after computing the Gaussian contribution.
 */
export interface RenderOptions {
  /** When true, render as simple points instead of Gaussian ellipses */
  pointCloud: boolean;
  /** Size of points in point cloud mode (in pixels) */
  pointSize: number;
  /** Stereo rendering mode for VR/3D viewing */
  stereoMode: 'off' | 'anaglyph' | 'sbs';
  /** Vertical field of view in degrees */
  fov: number;
  /** Multiplier for Gaussian ellipse size (1.0 = original size from training) */
  splatScale: number;
  /** Anti-aliasing filter strength added to 2D covariance diagonal */
  antialias: number;
  /** Additive brightness adjustment (-1 to 1) */
  brightness: number;
  /** Multiplicative contrast (0 = gray, 1 = normal, >1 = enhanced) */
  contrast: number;
  /** Gamma correction exponent (1.0 = linear) */
  gamma: number;
  /** Shadow lift/crush control */
  blackLevel: number;
  /** Highlight lift/crush control */
  whiteLevel: number;
  /** Overall intensity multiplier */
  intensity: number;
  /** Color saturation (0 = grayscale, 1 = normal) */
  saturate: number;
  /** Vibrance (selective saturation for less saturated colors) */
  vibrance: number;
  /** Color temperature shift (negative = cooler, positive = warmer) */
  temperature: number;
  /** Green/magenta tint shift */
  tint: number;
  /** Global alpha multiplier for all Gaussians */
  alpha: number;
  /** Enable smooth camera transitions between preset positions */
  animateCamera: boolean;
  /** Duration of camera transition animation in milliseconds */
  animationDuration: number;
}

/** Default rendering options */
export const DEFAULT_RENDER_OPTIONS: RenderOptions = {
  pointCloud: false,
  pointSize: 0.8,
  stereoMode: 'off',
  fov: 75,
  splatScale: 1,
  antialias: 0.3,
  brightness: 0,
  contrast: 1,
  gamma: 1,
  blackLevel: 0,
  whiteLevel: 0,
  intensity: 1,
  saturate: 1,
  vibrance: 0,
  temperature: 0,
  tint: 0,
  alpha: 1,
  animateCamera: true,
  animationDuration: 1350,
};
