const FULLSCREEN = /* wgsl */ `
@vertex
fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  return vec4f(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

/**
 * WGSL for the WebGPU glass path. Two programs share the fullscreen-triangle
 * vertex stage above: a separable gaussian that pre-blurs the scene once per
 * blur level, and the lens itself, drawn once per pane into that pane's canvas.
 *
 * This one is a single axis of the gaussian. Taps sit a quarter-sigma apart, so the weights are
 * the same for every blur radius and only `step` (a quarter-sigma, in uv)
 * changes — 25 taps cover ±3 sigma.
 */
export const BLUR_SHADER = /* wgsl */ `
struct Blur { step: vec2f, size: vec2f };

@group(0) @binding(0) var<uniform> u: Blur;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var src: texture_2d<f32>;

${FULLSCREEN}

@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = pos.xy / u.size;
  var color = vec4f(0.0);
  var total = 0.0;
  for (var k = -12; k <= 12; k++) {
    let x = f32(k);
    let w = exp(-x * x / 32.0);
    color += textureSampleLevel(src, samp, uv + u.step * x, 0.0) * w;
    total += w;
  }
  return color / total;
}
`;

/**
 * The lens. Everything is in the pane's own CSS px: the fragment position is
 * divided by the device pixel ratio, and `uvOrigin` / `uvPerPx` map a pane
 * pixel onto the scene texture, transforms and object-fit already folded in.
 *
 * The surface is a rounded-rect slab whose rim rises along a convex squircle
 * over `bezel` px. The slope of that profile drives both the refraction (the
 * backdrop is pulled along the outward normal, hardest at the edge, untouched
 * across the flat interior) and the 3D normal the lighting is shaded with, so
 * highlights land exactly where the glass bends.
 */
export const LENS_SHADER = /* wgsl */ `
struct Pane {
  size: vec2f,
  uvOrigin: vec2f,
  uvPerPx: vec2f,
  radius: f32,
  bezel: f32,
  refraction: f32,
  dispersion: f32,
  saturation: f32,
  dpr: f32,
  spin: f32,
  rim: f32,
  edge: f32,
  specular: f32,
};

@group(0) @binding(0) var<uniform> u: Pane;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var scene: texture_2d<f32>;

${FULLSCREEN}

fn box(q: vec2f, half: vec2f, r: f32) -> f32 {
  let d = abs(q) - half + r;
  return length(max(d, vec2f(0.0))) + min(max(d.x, d.y), 0.0) - r;
}

/** height of the rim, 0 at the edge to 1 where the glass goes flat */
fn profile(x: f32) -> f32 {
  return pow(1.0 - pow(1.0 - x, 4.0), 0.25);
}

/** d(profile)/dx, capped: it is vertical at the very edge */
fn slope(x: f32) -> f32 {
  let a = 1.0 - x;
  return min(8.0, a * a * a * pow(max(1e-4, 1.0 - a * a * a * a), -0.75));
}

fn sceneAt(p: vec2f) -> vec3f {
  return textureSampleLevel(scene, samp, u.uvOrigin + p * u.uvPerPx, 0.0).rgb;
}

@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let p = pos.xy / u.dpr;
  let half = u.size * 0.5;
  let q = p - half;
  let r = min(u.radius, min(half.x, half.y));
  let d = box(q, half, r);

  // antialiased in device px, the way the browser would clip the border box
  let alpha = clamp(0.5 - d * u.dpr, 0.0, 1.0);
  if (alpha <= 0.0) {
    discard;
  }

  // outward normal of the edge. Along the medial axis — the middle line of a
  // wide pane, where the nearest edge switches sides — the gradient is zero,
  // and normalizing it gives NaN, which draws as a white line. Nothing bends
  // that far from the rim anyway, so any unit vector does there.
  let e = vec2f(0.5, 0.0);
  let g = vec2f(
    box(q + e.xy, half, r) - box(q - e.xy, half, r),
    box(q + e.yx, half, r) - box(q - e.yx, half, r),
  );
  let n = select(vec2f(0.0, -1.0), normalize(g), dot(g, g) > 1e-8);

  // small controls get a narrower rim, and the pull shrinks with it: bending
  // further than the rim is wide folds the backdrop over itself
  let shortSide = min(half.x, half.y);
  let bezel = max(1.0, min(u.bezel, shortSide * 0.68));
  let fit = bezel / max(1.0, u.bezel);
  let t = max(-d, 0.0);
  let x = clamp(t / bezel, 0.0, 1.0);
  let pull = u.refraction * fit * (1.0 - profile(x)) * min(1.0, t / 1.25);

  // dispersion: red bends least, blue most, like a real prism
  let color = vec3f(
    sceneAt(p + n * pull * (1.0 - u.dispersion)).r,
    sceneAt(p + n * pull).g,
    sceneAt(p + n * pull * (1.0 + u.dispersion)).b,
  );
  let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
  var rgb = max(vec3f(0.0), mix(vec3f(luma), color, u.saturation));

  // 3D normal of the rim; flat (0, 0, 1) across the interior
  let lift = slope(x) * fit * step(x, 0.999);
  let normal = normalize(vec3f(n * lift, 1.0));

  // one light, coming from the direction of spin points (clockwise from
  // twelve o'clock, matching the CSS path), and its weaker bounce opposite
  let dir = vec2f(sin(u.spin), -cos(u.spin));
  let key = normalize(vec3f(dir, 0.55));
  let bounce = normalize(vec3f(-dir, 0.55));
  let view = vec3f(0.0, 0.0, 1.0);
  let hKey = normalize(key + view);
  let hBounce = normalize(bounce + view);
  let rimMask = 1.0 - smoothstep(0.0, bezel, t);
  var light = pow(max(dot(normal, hKey), 0.0), 18.0) * rimMask;
  light += 0.55 * pow(max(dot(normal, hBounce), 0.0), 18.0) * rimMask;

  // fresnel: the glass gets more reflective as it tilts away from the eye
  light += 0.18 * pow(1.0 - normal.z, 2.0);

  // a crisp line on the edge itself, brightest where it faces the light
  let facing = max(dot(n, dir), 0.0);
  let away = max(dot(n, -dir), 0.0);
  let line = 1.0 - smoothstep(u.rim * 0.5, u.rim + 0.5, t);
  light += line * (0.22 + 0.78 * (facing * facing + 0.6 * away * away));

  // a short inner glow that gives the edge thickness
  light += 0.1 * exp(-t / max(1.0, u.edge));

  rgb += vec3f(light * u.specular);
  return vec4f(min(rgb, vec3f(1.0)) * alpha, alpha);
}
`;
