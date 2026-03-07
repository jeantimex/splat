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
  const gui = new GUI({ title: 'Render' });

  // Reset button at the top
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

  return gui;
}
