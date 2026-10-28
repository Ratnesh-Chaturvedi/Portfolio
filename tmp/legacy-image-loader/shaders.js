// The surface and dust share a breakup field, so particles leave precisely
// where the bark and petals disappear instead of fading over an intact image.
export const breakup = `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float threshold(vec2 p) {
    return (p.x + 6.0) / 12.0 * 0.38 + hash(floor(p * 85.0)) * 0.62;
  }
`;

export const surfaceVertex = `
  uniform float uBloom;
  uniform float uFlower;
  uniform vec2 uOffset;
  uniform float uAngle;
  varying vec2 vUv;
  varying vec2 vSurface;
  void main() {
    vUv = uv;
    mat2 turn = mat2(cos(uAngle), sin(uAngle), -sin(uAngle), cos(uAngle));
    vSurface = turn * position.xy + uOffset;
    vec3 p = position;
    // Petals unfurl from a small cupped bud into their photographed shape.
    float fold = (1.0 - uBloom) * uFlower;
    p.xy *= mix(0.12, 1.0, uBloom);
    p.z += fold * length(position.xy) * 1.8;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const surfaceFragment = `
  uniform sampler2D uMap;
  uniform sampler2D uGrowthMap;
  uniform float uGrowthTime;
  uniform float uGrowthDuration;
  uniform float uBloom;
  uniform float uFlower;
  uniform float uDissolve;
  varying vec2 vUv;
  varying vec2 vSurface;
  ${breakup}
  void main() {
    vec4 texel = texture2D(uMap, vUv);
    vec2 encoded = texture2D(uGrowthMap, vUv).rg;
    float arrival = dot(encoded, vec2(65280.0, 255.0)) / 65535.0 * uGrowthDuration;
    // This frontier follows the branch's own path in every direction.
    float growth = smoothstep(arrival - 0.045, arrival + 0.075, uGrowthTime);
    float erosion = smoothstep(uDissolve - 0.025, uDissolve + 0.025, threshold(vSurface));
    float alpha = texel.a * mix(growth, smoothstep(0.0, 0.16, uBloom), uFlower) * erosion;
    if (alpha < 0.008) discard;
    gl_FragColor = vec4(texel.rgb, alpha);
  }
`;

export const dustVertex = `
  attribute vec3 aColor;
  attribute float aSeed;
  uniform float uDissolve;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  ${breakup}
  void main() {
    float age = max(0.0, uDissolve - threshold(position.xy));
    float released = step(0.001, age);
    vec3 p = position;
    p.x += age * (1.3 + aSeed * 2.6);
    p.y += age * (0.7 + aSeed * 2.0) + sin(age * 5.0 + aSeed * 25.0) * age * 0.35;
    p.z += age * sin(aSeed * 32.0) * 1.5;
    vColor = aColor;
    vAlpha = released * (1.0 - smoothstep(0.05, 0.72, age)) * 0.85;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.0 + aSeed * 1.5) * uPixelRatio;
  }
`;

export const dustFragment = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float radius = length(gl_PointCoord - 0.5);
    float alpha = vAlpha * (1.0 - smoothstep(0.15, 0.5, radius));
    if (alpha < 0.005) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;
