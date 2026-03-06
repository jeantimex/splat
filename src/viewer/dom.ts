/**
 * =============================================================================
 * DOM UTILITIES FOR 3DGS VIEWER
 * =============================================================================
 *
 * Functions for querying and manipulating DOM elements.
 */

import type { ViewerDom } from './types';

/**
 * Queries and returns all required DOM elements for the viewer.
 * Throws if any element is missing.
 */
export function getViewerDom(): ViewerDom {
  // We query from #app to avoid accidental collisions with unrelated DOM ids.
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('Missing #app root element');

  const canvas = app.querySelector<HTMLCanvasElement>('#canvas');
  const gizmo = app.querySelector<HTMLCanvasElement>('#gizmo');
  const message = app.querySelector<HTMLDivElement>('#message');
  const spinner = app.querySelector<HTMLDivElement>('#spinner');
  const fps = app.querySelector<HTMLSpanElement>('#fps');
  const progress = app.querySelector<HTMLDivElement>('#progress');
  const dropzone = app.querySelector<HTMLDivElement>('#dropzone');
  const anaglyphButton = app.querySelector<HTMLButtonElement>('#btn-anaglyph');
  const stereoButton = app.querySelector<HTMLButtonElement>('#btn-stereo');

  if (
    !canvas ||
    !gizmo ||
    !message ||
    !spinner ||
    !fps ||
    !progress ||
    !dropzone ||
    !anaglyphButton ||
    !stereoButton
  ) {
    throw new Error('Missing viewer DOM nodes');
  }

  return {
    canvas,
    gizmo,
    message,
    spinner,
    fps,
    progress,
    dropzone,
    anaglyphButton,
    stereoButton,
  };
}

/**
 * Shows the loading spinner.
 */
export function showSpinner(dom: ViewerDom): void {
  dom.spinner.classList.remove('hidden');
  dom.dropzone.classList.add('hidden');
}

/**
 * Hides the loading spinner.
 */
export function hideSpinner(dom: ViewerDom): void {
  dom.spinner.classList.add('hidden');
}

/**
 * Sets up the stereo mode toggle buttons (anaglyph and side-by-side).
 *
 * @param viewerDom - DOM element references
 * @param renderOptions - Object containing stereoMode property to toggle
 * @returns Function to update button UI state
 */
export function setupStereoButtons(
  viewerDom: ViewerDom,
  renderOptions: { stereoMode: 'off' | 'anaglyph' | 'sbs' },
): () => void {
  const updateUi = () => {
    const anaglyphActive = renderOptions.stereoMode === 'anaglyph';
    const stereoActive = renderOptions.stereoMode === 'sbs';
    viewerDom.anaglyphButton.classList.toggle('active', anaglyphActive);
    viewerDom.stereoButton.classList.toggle('active', stereoActive);
    viewerDom.anaglyphButton.setAttribute('aria-pressed', String(anaglyphActive));
    viewerDom.stereoButton.setAttribute('aria-pressed', String(stereoActive));
  };

  viewerDom.anaglyphButton.addEventListener('click', () => {
    renderOptions.stereoMode = renderOptions.stereoMode === 'anaglyph' ? 'off' : 'anaglyph';
    updateUi();
  });

  viewerDom.stereoButton.addEventListener('click', () => {
    renderOptions.stereoMode = renderOptions.stereoMode === 'sbs' ? 'off' : 'sbs';
    updateUi();
  });

  updateUi();
  return updateUi;
}
