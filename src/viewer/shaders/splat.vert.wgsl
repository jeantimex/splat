struct Uniforms {
  projection: mat4x4<f32>,
  view: mat4x4<f32>,
  focal: vec2<f32>,
  viewport: vec2<f32>,
  render_params: vec2<f32>,
  _padding: vec2<f32>,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> splats: array<u32>;
@group(0) @binding(2) var<storage, read> sorted_indices: array<u32>;

struct VSIn {
  @location(0) quad_pos: vec2<f32>,
  @builtin(instance_index) instance_id: u32,
}

struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) v_color: vec4<f32>,
  @location(1) v_position: vec2<f32>,
  @location(2) v_mode: f32,
}

@vertex
fn vs_main(input: VSIn) -> VSOut {
  let index = sorted_indices[input.instance_id];
  let base = index * 8u;

  let center = vec3<f32>(
    bitcast<f32>(splats[base + 0u]),
    bitcast<f32>(splats[base + 1u]),
    bitcast<f32>(splats[base + 2u]),
  );

  let cam = uniforms.view * vec4<f32>(center, 1.0);
  let pos2d = uniforms.projection * cam;

  let clip = 1.2 * pos2d.w;
  if (
    pos2d.z < -clip ||
    pos2d.x < -clip || pos2d.x > clip ||
    pos2d.y < -clip || pos2d.y > clip
  ) {
    var culled: VSOut;
    culled.position = vec4<f32>(0.0, 0.0, 2.0, 1.0);
    culled.v_color = vec4<f32>(0.0);
    culled.v_position = input.quad_pos;
    culled.v_mode = uniforms.render_params.x;
    return culled;
  }

  let packed_color = splats[base + 7u];
  let color = vec4<f32>(
    f32(packed_color & 0xffu),
    f32((packed_color >> 8u) & 0xffu),
    f32((packed_color >> 16u) & 0xffu),
    f32((packed_color >> 24u) & 0xffu)
  ) / 255.0;

  let depth_tint = clamp(pos2d.z / pos2d.w + 1.0, 0.0, 1.0);
  let center_ndc = pos2d.xy / pos2d.w;
  let point_mode = uniforms.render_params.x;

  var major_axis: vec2<f32>;
  var minor_axis: vec2<f32>;

  if (point_mode > 0.5) {
    let point_size = max(uniforms.render_params.y, 0.5);
    major_axis = vec2<f32>(point_size, 0.0);
    minor_axis = vec2<f32>(0.0, point_size);
  } else {
    let cov0 = unpack2x16float(splats[base + 4u]);
    let cov1 = unpack2x16float(splats[base + 5u]);
    let cov2 = unpack2x16float(splats[base + 6u]);

    let vrk = mat3x3<f32>(
      vec3<f32>(cov0.x, cov0.y, cov1.x),
      vec3<f32>(cov0.y, cov1.y, cov2.x),
      vec3<f32>(cov1.x, cov2.x, cov2.y)
    );

    let z = max(cam.z, 0.0001);
    let j = mat3x3<f32>(
      vec3<f32>(uniforms.focal.x / z, 0.0, -(uniforms.focal.x * cam.x) / (z * z)),
      vec3<f32>(0.0, -uniforms.focal.y / z, (uniforms.focal.y * cam.y) / (z * z)),
      vec3<f32>(0.0, 0.0, 0.0)
    );

    let view3 = mat3x3<f32>(uniforms.view[0].xyz, uniforms.view[1].xyz, uniforms.view[2].xyz);
    let t = transpose(view3) * j;
    let cov2d = transpose(t) * vrk * t;

    let mid = (cov2d[0][0] + cov2d[1][1]) * 0.5;
    let radius = length(vec2<f32>((cov2d[0][0] - cov2d[1][1]) * 0.5, cov2d[0][1]));
    let lambda1 = mid + radius;
    let lambda2 = mid - radius;

    if (lambda2 < 0.0) {
      var rejected: VSOut;
      rejected.position = vec4<f32>(0.0, 0.0, 2.0, 1.0);
      rejected.v_color = vec4<f32>(0.0);
      rejected.v_position = input.quad_pos;
      rejected.v_mode = point_mode;
      return rejected;
    }

    let diag = normalize(vec2<f32>(cov2d[0][1], lambda1 - cov2d[0][0]));
    major_axis = min(sqrt(2.0 * lambda1), 1024.0) * diag;
    minor_axis = min(sqrt(2.0 * lambda2), 1024.0) * vec2<f32>(diag.y, -diag.x);
  }

  var out: VSOut;
  out.v_color = color * depth_tint;
  out.v_position = input.quad_pos;
  out.v_mode = point_mode;
  out.position = vec4<f32>(
    center_ndc
      + input.quad_pos.x * major_axis / uniforms.viewport
      + input.quad_pos.y * minor_axis / uniforms.viewport,
    0.0,
    1.0
  );
  return out;
}
