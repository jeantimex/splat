struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
}

@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> VSOut {
  var positions = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>(1.0, -1.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>(1.0, 1.0),
  );
  let pos = positions[vertex_index];
  var out: VSOut;
  out.position = vec4<f32>(pos, 0.0, 1.0);
  out.uv = vec2<f32>(pos.x * 0.5 + 0.5, 0.5 - pos.y * 0.5);
  return out;
}

@group(0) @binding(0) var tex_sampler: sampler;
@group(0) @binding(1) var left_eye_tex: texture_2d<f32>;
@group(0) @binding(2) var right_eye_tex: texture_2d<f32>;

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let left = textureSample(left_eye_tex, tex_sampler, input.uv);
  let right = textureSample(right_eye_tex, tex_sampler, input.uv);
  // Classic red/cyan anaglyph: left contributes red, right contributes cyan.
  // This yields the expected strong red/cyan offset style.
  return vec4<f32>(left.r, right.g, right.b, 1.0);
}
