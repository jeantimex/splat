# WebGPU 3D Gaussian Splatting Viewer

A real-time 3D Gaussian Splatting (3DGS) viewer built with WebGPU and TypeScript. This viewer renders 3D scenes represented as collections of Gaussian primitives, enabling high-quality novel view synthesis directly in the browser.

https://github.com/user-attachments/assets/d013dd1a-3a8e-4057-9a6a-5d398f1e121f

[Live demo](https://jeantimex.github.io/splat/)

## Overview

3D Gaussian Splatting is a novel rendering technique that represents scenes as millions of 3D Gaussian primitives. Each Gaussian is defined by:

- **Position** (x, y, z): Center point in world space
- **Covariance** (3x3 matrix): Defines the ellipsoid shape and orientation
- **Color** (RGB): Stored as spherical harmonic coefficients or direct RGB
- **Opacity** (alpha): Transparency of the Gaussian

This viewer implements the full rendering pipeline described in ["3D Gaussian Splatting for Real-Time Radiance Field Rendering"](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) (Kerbl et al., 2023).

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Main Thread                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │   Camera    │───▶│   Controls  │───▶│   Renderer  │───▶│    GUI      │   │
│  │  (camera.ts)│    │(controls.ts)│    │(renderer-   │    │  (gui.ts)   │   │
│  │             │    │             │    │ webgpu.ts)  │    │             │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│         │                                      ▲                            │
│         ▼                                      │                            │
│  ┌─────────────────────────────────────────────┴───────────────────────┐    │
│  │                        Sort Worker Bridge                           │    │
│  │                        (sort-worker.ts)                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │ postMessage
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Web Worker                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Sort Worker                                      │    │
│  │                    (sort-worker.worker.ts)                          │    │
│  │  • Depth sorting (counting sort, O(n))                              │    │
│  │  • PLY parsing and conversion                                       │    │
│  │  • Raw .splat / converted .ply transfer                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Components

| Module                  | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `main.ts`               | Application entry point, orchestrates subsystems    |
| `renderer-webgpu.ts`    | WebGPU rendering pipeline with instanced drawing    |
| `camera.ts`             | Matrix math for view/projection transforms          |
| `controls.ts`           | Orbit, pan, zoom, roll camera controls with inertia |
| `sort-worker.worker.ts` | Off-thread depth sorting and PLY parsing            |
| `loader.ts`             | Streaming .splat file loader                        |
| `shaders/*.wgsl`        | WGSL vertex and fragment shaders                    |

## Rendering Pipeline

The rendering pipeline follows these steps each frame:

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Camera Update  │────▶│  View Matrix   │────▶│  Sort Worker   │
│ (user input)   │     │  (controls)    │     │  (depth order) │
└────────────────┘     └────────────────┘     └───────┬────────┘
                                                      │
┌────────────────┐     ┌────────────────┐             │
│   Projection   │────▶│  GPU Render    │◀────────────┘
│    Matrix      │     │  (instanced)   │   sorted indices
└────────────────┘     └───────┬────────┘
                               │
                       ┌───────▼────────┐
                       │ Alpha-Blended  │
                       │    Output      │
                       └────────────────┘
```

### GPU Buffer Layout

**Splat Buffer** (32 bytes per Gaussian):

| Offset | Size | Type      | Description                                 |
| ------ | ---- | --------- | ------------------------------------------- |
| 0-11   | 12   | float32×3 | Position (x, y, z)                          |
| 12-23  | 12   | float32×3 | Scale (sx, sy, sz)                          |
| 24-27  | 4    | uint8×4   | Color (R, G, B, A)                          |
| 28-31  | 4    | uint8×4   | Rotation quaternion (quantized qw, qx, qy, qz) |

**Sorted Index Buffer**: Maps draw instance index to Gaussian index for back-to-front rendering.

## Depth Sorting Algorithm

Correct alpha blending requires back-to-front draw order. The sort worker uses **16-bit counting sort** for O(n) performance:

1. **Compute depth**: For each Gaussian, calculate `depth = dot(viewDir, position)`
2. **Find range**: Track min/max depth values
3. **Quantize**: Map depths to 16-bit integers (65,536 buckets)
4. **Count**: Tally occurrences in each bucket
5. **Prefix sum**: Compute cumulative counts for bucket positions
6. **Place**: Output Gaussian indices in sorted order

This approach handles millions of Gaussians in 5-30ms, compared to ~100ms for comparison-based sorts.

## 3D to 2D Projection

The key mathematical insight of 3DGS is that a 3D Gaussian projects to a 2D Gaussian analytically. In this viewer, the GPU reconstructs the 3D covariance from:

- Scale and rotation stored in the raw `.splat` row
- View matrix V
- Projection focal lengths (fx, fy)

The 2D covariance is computed as:

```
Σ₂ₓ₂ = J × V × Σ₃ₓ₃ × Vᵀ × Jᵀ
```

Where J is the Jacobian of perspective projection:

```
J = | fx/z    0    -fx·x/z² |
    |   0   fy/z   -fy·y/z² |
```

The 2D covariance defines an ellipse. We extract its axes via eigendecomposition and render each Gaussian as a screen-aligned quad scaled along these axes. Moving this covariance reconstruction into the vertex shader keeps `.splat` load times low because the worker no longer precomputes packed covariance on the CPU.

## Alpha Blending

The viewer uses "one-minus-dst-alpha" blending for correct transparent compositing:

```
dst.rgb = src.rgb × (1 - dst.a) + dst.rgb
dst.a   = src.a × (1 - dst.a) + dst.a
```

Combined with back-to-front sorted draw order, this produces:

```
final = Σᵢ (colorᵢ × αᵢ × ∏ⱼ<ᵢ(1 - αⱼ))
```

The fragment shader outputs **premultiplied alpha**: `(color × alpha, alpha)`.

## File Formats

### .splat Format

Binary format with 32 bytes per Gaussian:

| Offset | Size | Type      | Description                     |
| ------ | ---- | --------- | ------------------------------- |
| 0-11   | 12   | float32×3 | Position (x, y, z)              |
| 12-23  | 12   | float32×3 | Scale (sx, sy, sz)              |
| 24-27  | 4    | uint8×4   | Color (R, G, B, A)              |
| 28-31  | 4    | uint8×4   | Rotation quaternion (quantized) |

### .ply Format

The viewer supports both standard and compressed PLY formats from 3DGS training tools. Attributes parsed:

- `x, y, z`: Position
- `scale_0, scale_1, scale_2`: Log-space scale
- `rot_0, rot_1, rot_2, rot_3`: Rotation quaternion
- `f_dc_0, f_dc_1, f_dc_2`: DC spherical harmonic (color)
- `opacity`: Logit-space opacity

## Features

### Rendering Modes

- **Gaussian Splatting**: Full ellipse rendering with soft falloff
- **Point Cloud**: Simple dot rendering for debugging
- **Crossfade**: Smooth transition between modes

### Stereo Rendering

- **Anaglyph**: Red/cyan stereoscopic output
- **Side-by-Side**: VR headset compatible output

### Camera Controls

| Input                  | Action                            |
| ---------------------- | --------------------------------- |
| Left drag              | Orbit (rotate around focus point) |
| Right drag / Ctrl+drag | Pan (translate parallel to view)  |
| Shift+drag             | Roll (rotate around view axis)    |
| Scroll wheel           | Zoom (move forward/backward)      |
| Arrow keys             | Translate camera                  |
| WASD                   | Rotate camera                     |

All controls feature inertia for smooth, natural-feeling interaction.

### Color Grading

Real-time adjustments applied in the fragment shader:

- Brightness, contrast, gamma
- Black/white level (shadow/highlight lift)
- Saturation and vibrance
- Color temperature and tint
- Global alpha

### Adaptive Resolution

The renderer automatically reduces resolution during camera motion to maintain smooth frame rates, then restores full quality when the camera stops.

## Performance Optimizations

1. **Instanced Rendering**: Single draw call renders all Gaussians
2. **Raw `.splat` Upload Path**: Avoids CPU-side covariance packing during load
3. **Worker Thread Sorting**: Keeps main thread responsive
4. **Counting Sort**: O(n) complexity for millions of primitives
5. **Invalidation-Driven Rendering**: Stops the RAF loop while the view is static
6. **Adaptive Resolution**: Reduces internal resolution during motion
7. **Frustum Culling**: Discard Gaussians outside view
8. **Fragment Discard**: Skip pixels with negligible contribution

## Browser Requirements

- **WebGPU**: Required for rendering (Chrome 113+, Edge 113+, Firefox Nightly)
- **Web Workers**: Required for off-thread sorting
- **ES Modules**: Modern JavaScript module support

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── style.css               # UI styles
└── viewer/
    ├── camera.ts           # Matrix math and camera poses
    ├── camera-utils.ts     # Camera centering utilities
    ├── controls.ts         # Interactive camera controls
    ├── dom.ts              # DOM element management
    ├── gui.ts              # lil-gui parameter panel
    ├── input.ts            # Keyboard and drag-drop handlers
    ├── loader.ts           # .splat file streaming
    ├── renderer-webgpu.ts  # WebGPU rendering pipeline
    ├── sort-worker.ts      # Worker bridge (main thread)
    ├── sort-worker.worker.ts # Sorting and PLY parsing
    ├── types.ts            # Shared types and defaults
    ├── utils.ts            # Helper functions
    └── shaders/
        ├── splat.vert.wgsl       # Vertex shader
        ├── splat.frag.wgsl       # Fragment shader
        ├── anaglyph-composite.wgsl  # Stereo compositing
        └── crossfade-composite.wgsl # Mode transition
```

## Technical Details

### Covariance Computation

From rotation quaternion q = (w, x, y, z) and scale s = (sx, sy, sz):

1. Convert quaternion to rotation matrix R
2. Create scale matrix S = diag(sx, sy, sz)
3. Compute M = R × S (scale-rotation matrix)
4. Compute Σ = M × Mᵀ (covariance)

The covariance is symmetric, so only 6 unique values are needed. In the current implementation this reconstruction happens in the vertex shader instead of being prepacked on the CPU.

### Gaussian Evaluation

In the fragment shader, each pixel evaluates:

```
G(p) = exp(-r²)
```

where `r = length(p)` and p is the local quad coordinate. The quad ranges from -2 to 2, capturing ~95% of the Gaussian's visible contribution.

### Quaternion Packing

Rotation quaternions are stored as 4 bytes with values mapped from [-1, 1] to [0, 255]. Compressed PLY uses 2+10+10+10 bit packing with the largest component omitted and reconstructed from unit-length constraint.

## License

MIT License - see [LICENSE](LICENSE) for details.
