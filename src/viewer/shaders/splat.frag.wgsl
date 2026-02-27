struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) v_color: vec4<f32>,
  @location(1) v_position: vec2<f32>,
  @location(2) v_mode: f32,
  @location(3) v_opacity: f32,
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  if (input.v_mode > 0.5) {
    // Point mode: hard-ish circular footprint for dense cloud readability.
    if (dot(input.v_position, input.v_position) > 4.0) {
      discard;
    }
    // Correctly premultiply alpha for the point mode color.
    let alpha = input.v_color.a * input.v_opacity;
    return vec4<f32>(input.v_color.rgb * alpha, alpha);
  }

  // Splat mode: gaussian footprint in local quad space.
  let a = -dot(input.v_position, input.v_position);
  if (a < -4.0) {
    discard;
  }
  let b = exp(a) * input.v_color.a * input.v_opacity;
  return vec4<f32>(b * input.v_color.rgb, b);
}
