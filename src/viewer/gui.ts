/**
 * =============================================================================
 * GUI SETUP FOR 3DGS VIEWER
 * =============================================================================
 *
 * Creates the lil-gui control panel for adjusting render parameters.
 */

import GUI from 'lil-gui';
import type { CameraPose } from './camera';
import { hideSpinner, showSpinner } from './dom';
import type { RenderOptions, ViewerDom } from './types';

/** Callbacks for GUI interactions */
export interface GuiCallbacks {
  onCamerasLoaded: (cameras: CameraPose[], cameraGui: GUI, callbacks: GuiCallbacks) => void;
  onApplyCamera: (index: number) => void;
  onLogPose: () => void;
  onReset: () => void;
}

/**
 * Creates the main GUI control panel.
 *
 * Organized into folders:
 * - Splat Settings: Point cloud toggle, point size, splat scale, antialias
 * - Camera: FOV, animation settings, camera loading
 * - Adjust Colors: Brightness, contrast, gamma, levels, saturation, etc.
 *
 * @param renderOptions - Rendering options to bind to GUI controls
 * @param callbacks - Callback functions for GUI actions
 * @param dom - DOM references for displaying messages
 * @returns The created GUI instance
 */
export function createGui(
  renderOptions: RenderOptions,
  callbacks: GuiCallbacks,
  dom: ViewerDom,
): GUI {
  const gui = new GUI({ title: 'Gaussian Splat Viewer' });
  gui.close();

  const aboutGui = gui.addFolder('About');
  const aboutChildren = (aboutGui as GUI & { $children?: HTMLElement }).$children;
  if (aboutChildren) {
    const intro = document.createElement('div');
    intro.style.padding = '10px 12px 4px';
    intro.style.fontSize = '12px';
    intro.style.lineHeight = '1.45';
    intro.style.opacity = '0.9';
    intro.textContent =
      'A lightweight WebGPU viewer for exploring 3D Gaussian Splat scenes in the browser.';

    const details = document.createElement('ul');
    details.style.margin = '0';
    details.style.padding = '0 18px 8px 28px';
    details.style.fontSize = '12px';
    details.style.lineHeight = '1.5';
    details.style.opacity = '0.85';

    const items = [
      'Loads .splat and .ply scene files.',
      'Supports camera presets, color controls, and stereo viewing.',
      'Includes anaglyph and VR side-by-side modes.',
    ];

    for (const text of items) {
      const li = document.createElement('li');
      li.textContent = text;
      details.append(li);
    }

    const repoRow = document.createElement('div');
    repoRow.style.padding = '8px 12px';
    repoRow.style.display = 'flex';
    repoRow.style.alignItems = 'center';
    repoRow.style.gap = '8px';

    const icon = document.createElement('span');
    icon.innerHTML =
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.55 7.55 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';
    icon.setAttribute('aria-hidden', 'true');
    icon.style.display = 'inline-flex';
    icon.style.alignItems = 'center';
    icon.style.opacity = '0.9';

    const link = document.createElement('a');
    link.href = 'https://github.com/jeantimex/splat';
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = 'jeantimex';
    link.style.color = 'inherit';
    link.style.textDecoration = 'underline';
    link.style.textUnderlineOffset = '0.18em';

    repoRow.append(icon, link);
    aboutChildren.append(intro, details, repoRow);
  }

  // Splat rendering settings
  const splatGui = gui.addFolder('Splat Settings');
  splatGui.add(renderOptions, 'pointCloud').name('Point Cloud');
  splatGui.add(renderOptions, 'pointSize', 0.5, 6, 0.1).name('Point Size');
  splatGui.add(renderOptions, 'splatScale', 0, 1, 0.001).name('Splatscale');
  splatGui.add(renderOptions, 'antialias', 0, 4, 0.001).name('Antialias');
  splatGui.close();

  // Camera settings
  const cameraGui = gui.addFolder('Camera');
  cameraGui.add(renderOptions, 'fov', 20, 120, 0.1).name('FOV');
  cameraGui.add(renderOptions, 'animateCamera').name('Animate Transitions');
  cameraGui.add(renderOptions, 'animationDuration', 0, 3000, 1).name('Animation duration (ms)');

  // Camera loading button
  cameraGui
    .add(
      {
        loadCameras: () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            showSpinner(dom);
            try {
              const parsed = JSON.parse(await file.text()) as CameraPose[];
              if (Array.isArray(parsed) && parsed.length > 0) {
                callbacks.onCamerasLoaded(parsed, cameraGui, callbacks);
                callbacks.onApplyCamera(0);
              }
              hideSpinner(dom);
            } catch (err) {
              hideSpinner(dom);
              dom.message.textContent = `Error loading cameras: ${err instanceof Error ? err.message : String(err)}`;
            }
          };
          input.click();
        },
      },
      'loadCameras',
    )
    .name('Load Cameras');

  // Log current pose button
  cameraGui
    .add(
      {
        logPose: () => {
          callbacks.onLogPose();
        },
      },
      'logPose',
    )
    .name('Log Camera Pose');

  cameraGui.close();

  // Color grading controls
  const colorGui = gui.addFolder('Adjust Colors');
  colorGui.add(renderOptions, 'brightness', -1, 1, 0.001).name('Brightness');
  colorGui.add(renderOptions, 'contrast', 0, 3, 0.001).name('Contrast');
  colorGui.add(renderOptions, 'gamma', 0.1, 3, 0.001).name('Gamma');
  colorGui.add(renderOptions, 'blackLevel', -1, 1, 0.001).name('Blacklevel');
  colorGui.add(renderOptions, 'whiteLevel', -1, 1, 0.001).name('Whitelevel');
  colorGui.add(renderOptions, 'intensity', 0, 3, 0.001).name('Intensity');
  colorGui.add(renderOptions, 'saturate', 0, 3, 0.001).name('Saturate');
  colorGui.add(renderOptions, 'vibrance', -1, 1, 0.001).name('Vibrance');
  colorGui.add(renderOptions, 'temperature', -1, 1, 0.001).name('Temperature');
  colorGui.add(renderOptions, 'tint', -1, 1, 0.001).name('Tint');
  colorGui.add(renderOptions, 'alpha', 0, 1, 0.001).name('Alpha');
  colorGui.close();

  const debugGui = gui.addFolder('Debug');
  debugGui.add(renderOptions, 'debugTimings').name('Show Timings');
  debugGui.close();

  // Reset button at the bottom
  gui
    .add(
      {
        reset: () => {
          callbacks.onReset();
        },
      },
      'reset',
    )
    .name('Reset All Settings');

  return gui;
}
