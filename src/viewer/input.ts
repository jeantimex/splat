/**
 * =============================================================================
 * INPUT HANDLING FOR 3DGS VIEWER
 * =============================================================================
 *
 * Keyboard shortcuts and drag-and-drop file handling.
 */

/** Parameters for keyboard shortcut registration */
export interface KeyboardShortcutParams {
  applyCamera: (index: number) => void;
  getCurrentCameraIndex: () => number;
  saveViewToHash: () => void;
  setCarousel: (enabled: boolean) => void;
}

/**
 * Registers global keyboard shortcuts for camera navigation.
 *
 * Shortcuts:
 * - 0-9: Jump to camera preset by number
 * - +/=: Next camera preset
 * - -/_: Previous camera preset
 * - P: Enable carousel (auto-rotation) mode
 * - V: Save current view to URL hash
 *
 * @param params - Callback functions for shortcut actions
 */
export function registerKeyboardShortcuts(params: KeyboardShortcutParams): void {
  const { applyCamera, getCurrentCameraIndex, saveViewToHash, setCarousel } = params;

  // We use keydown only; camera navigation actions are stateless per keypress.
  window.addEventListener('keydown', (event) => {
    // Number keys 0-9: Jump to camera preset
    if (/^\d$/.test(event.key)) {
      applyCamera(Number.parseInt(event.key, 10));
      return;
    }

    // Minus: Previous camera
    if (event.key === '-' || event.key === '_') {
      applyCamera(getCurrentCameraIndex() - 1);
      return;
    }

    // Plus: Next camera
    if (event.key === '+' || event.key === '=') {
      applyCamera(getCurrentCameraIndex() + 1);
      return;
    }

    // P: Enable carousel mode
    if (event.code === 'KeyP') {
      setCarousel(true);
      return;
    }

    // V: Save view to URL hash
    if (event.code === 'KeyV') {
      saveViewToHash();
    }
  });
}

/** Parameters for drag-and-drop registration */
export interface DragDropParams {
  dropzone: HTMLElement;
  onFile: (file: File) => Promise<void>;
}

/**
 * Registers drag-and-drop and click-to-upload handlers for file loading.
 *
 * Supports:
 * - Drag and drop files onto the page
 * - Clicking the dropzone to open a file picker dialog
 *
 * File types:
 * - .splat files: Raw Gaussian splat data
 * - .ply files: PLY format Gaussian data (standard or compressed)
 * - .json files: Camera pose presets
 *
 * @param params - Dropzone element and callback for handling files
 */
export function registerDragDrop(params: DragDropParams): void {
  const { dropzone, onFile } = params;

  // Prevent browser default "open file in tab" behavior so the app can own drop flow.
  const preventDefault = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  document.addEventListener('dragenter', preventDefault);
  document.addEventListener('dragover', preventDefault);
  document.addEventListener('dragleave', preventDefault);
  document.addEventListener('drop', (event) => {
    preventDefault(event);
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    void onFile(file);
  });

  // Create hidden file input for click-to-upload functionality
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.splat,.ply';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // Handle file selection from the file picker
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (file) {
      void onFile(file);
    }
    // Reset input so the same file can be selected again if needed
    fileInput.value = '';
  });

  // Click on dropzone opens the file picker
  dropzone.addEventListener('click', () => {
    fileInput.click();
  });
}
