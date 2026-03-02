/**
 * =============================================================================
 * ANAGLYPH COMPOSITE SHADER - 3D Stereo Rendering (Red/Cyan Glasses)
 * =============================================================================
 *
 * This shader combines left and right eye renders into a single anaglyph image
 * viewable with red/cyan 3D glasses.
 *
 * HOW ANAGLYPH 3D WORKS:
 * ----------------------
 * 1. Scene is rendered twice: once for left eye, once for right eye
 * 2. Left/right views have slightly different camera positions (eye separation)
 * 3. Left eye view is filtered to RED channel only
 * 4. Right eye view is filtered to CYAN (green + blue) channels
 * 5. Combined image viewed through glasses:
 *    - Red lens (left eye): blocks cyan, sees only red = left view
 *    - Cyan lens (right eye): blocks red, sees only cyan = right view
 * 6. Brain fuses the two views into perceived depth
 *
 * This is the classic "dubois" or "true" anaglyph method.
 * More sophisticated methods use color correction matrices, but this
 * simple version works well for most 3DGS content.
 */

/** Vertex shader output / Fragment shader input */
struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
}

/**
 * Full-screen quad vertex shader.
 * Generates 4 vertices covering the entire screen in triangle-strip order.
 */
@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> VSOut {
  // Define fullscreen quad corners (triangle strip order)
  var positions = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),  // Bottom-left
    vec2<f32>(1.0, -1.0),   // Bottom-right
    vec2<f32>(-1.0, 1.0),   // Top-left
    vec2<f32>(1.0, 1.0),    // Top-right
  );
  let pos = positions[vertex_index];

  var out: VSOut;
  out.position = vec4<f32>(pos, 0.0, 1.0);
  // Convert from NDC [-1,1] to UV [0,1], with Y flipped for texture sampling
  out.uv = vec2<f32>(pos.x * 0.5 + 0.5, 0.5 - pos.y * 0.5);
  return out;
}

/** Texture sampler for eye renders */
@group(0) @binding(0) var tex_sampler: sampler;
/** Left eye render (rendered with camera offset left) */
@group(0) @binding(1) var left_eye_tex: texture_2d<f32>;
/** Right eye render (rendered with camera offset right) */
@group(0) @binding(2) var right_eye_tex: texture_2d<f32>;

/**
 * Combine left/right eye views into anaglyph.
 *
 * Output:
 *   R = left.R  (viewed by left eye through red filter)
 *   G = right.G (viewed by right eye through cyan filter)
 *   B = right.B (viewed by right eye through cyan filter)
 */
@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let left = textureSample(left_eye_tex, tex_sampler, input.uv);
  let right = textureSample(right_eye_tex, tex_sampler, input.uv);

  // Classic red/cyan anaglyph combination:
  // - Left eye contributes RED channel only
  // - Right eye contributes GREEN and BLUE (cyan) channels
  // When viewed through red/cyan glasses, each eye sees only its view
  return vec4<f32>(left.r, right.g, right.b, 1.0);
}
