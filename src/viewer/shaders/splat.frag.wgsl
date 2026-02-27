struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) v_color: vec4<f32>,
  @location(1) v_position: vec2<f32>,
}

@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let a = -dot(input.v_position, input.v_position);
  if (a < -4.0) {
    discard;
  }
  let b = exp(a) * input.v_color.a;
  return vec4<f32>(b * input.v_color.rgb, b);
}
