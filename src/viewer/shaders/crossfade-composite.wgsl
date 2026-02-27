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
@group(0) @binding(1) var splat_tex: texture_2d<f32>;
@group(0) @binding(2) var point_tex: texture_2d<f32>;
@group(0) @binding(3) var<uniform> t_value: f32;

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let splat = textureSample(splat_tex, tex_sampler, input.uv);
  let point = textureSample(point_tex, tex_sampler, input.uv);
  return mix(splat, point, t_value);
}
