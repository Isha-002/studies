precision highp float;

varying vec2 vUv;

void main() {
  // float strength = 1.0 - vUv.y;
  // float strength = 10.0 * vUv.y;
  // float strength = mod(10.0 * vUv.y, 1.0);
  // float strength =  step(0.5, mod(10.0 * vUv.y, 1.0));
  // float strength =  step(0.5, mod(10.0 * vUv.x, 1.0));

  float strength =  step(0.8, mod(10.0 * vUv.y, 1.0));
  strength +=  step(0.8, mod(10.0 * vUv.x, 1.0));
  gl_FragColor = vec4(vec3(strength), 1.0);
}