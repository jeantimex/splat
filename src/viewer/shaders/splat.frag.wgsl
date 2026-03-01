struct Uniforms {
  projection: mat4x4<f32>,
  view: mat4x4<f32>,
  focal: vec2<f32>,
  viewport: vec2<f32>,
  render_params: vec4<f32>,
  color_basic: vec4<f32>,
  color_levels: vec4<f32>,
  color_mix: vec4<f32>,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) v_color: vec4<f32>,
  @location(1) v_position: vec2<f32>,
  @location(2) v_mode: f32,
  @location(3) v_opacity: f32,
}

fn apply_color_controls(rgb_in: vec3<f32>) -> vec3<f32> {
  let brightness = uniforms.color_basic.x;
  let contrast = max(uniforms.color_basic.y, 0.0);
  let gamma = max(uniforms.color_basic.z, 0.001);
  let black_level = uniforms.color_levels.x;
  let white_level = uniforms.color_levels.y;
  let intensity = max(uniforms.color_levels.z, 0.0);
  let saturate = max(uniforms.color_levels.w, 0.0);
  let vibrance = clamp(uniforms.color_mix.x, -1.0, 1.0);
  let temperature = uniforms.color_mix.y;
  let tint = uniforms.color_mix.z;

  var rgb = rgb_in + vec3<f32>(brightness);
  rgb = (rgb - vec3<f32>(0.5)) * contrast + vec3<f32>(0.5);

  // Shadow/highlight controls:
  // - black_level < 0 darkens dark tones, > 0 lifts dark tones.
  // - white_level < 0 darkens highlights, > 0 brightens highlights.
  let luma_pre = clamp(dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
  let shadow_mask = pow(1.0 - luma_pre, 1.5);
  let highlight_mask = pow(luma_pre, 1.5);
  rgb += vec3<f32>(black_level * shadow_mask * 0.7);
  rgb += vec3<f32>(white_level * highlight_mask * 0.7);
  rgb = clamp(rgb, vec3<f32>(0.0), vec3<f32>(1.0));

  rgb = pow(max(rgb, vec3<f32>(0.0)), vec3<f32>(1.0 / gamma));
  rgb *= intensity;

  let luma = dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722));
  rgb = mix(vec3<f32>(luma), rgb, saturate);

  let max_channel = max(max(rgb.r, rgb.g), rgb.b);
  let avg = (rgb.r + rgb.g + rgb.b) / 3.0;
  let vib_amount = (max_channel - avg) * (-vibrance * 3.0);
  rgb = mix(rgb, vec3<f32>(max_channel), vib_amount);

  rgb += vec3<f32>(temperature * 0.2, 0.0, -temperature * 0.2);
  rgb += vec3<f32>(tint * 0.1, -tint * 0.2, tint * 0.1);
  return clamp(rgb, vec3<f32>(0.0), vec3<f32>(1.0));
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let rgb = apply_color_controls(input.v_color.rgb);
  let alpha_multiplier = clamp(uniforms.color_basic.w, 0.0, 1.0);

  if (input.v_mode > 0.5) {
    // Point mode: hard-ish circular footprint for dense cloud readability.
    if (dot(input.v_position, input.v_position) > 4.0) {
      discard;
    }
    // Correctly premultiply alpha for the point mode color.
    let alpha = input.v_color.a * input.v_opacity * alpha_multiplier;
    return vec4<f32>(rgb * alpha, alpha);
  }

  // Splat mode: gaussian footprint in local quad space.
  let a = -dot(input.v_position, input.v_position);
  if (a < -4.0) {
    discard;
  }
  let b = exp(a) * input.v_color.a * input.v_opacity * alpha_multiplier;
  return vec4<f32>(b * rgb, b);
}
