precision highp float;

varying vec2 vUv;

float random(vec2 st)
{
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // float strength = 1.0 - vUv.y;
  // float strength = 10.0 * vUv.y;
  // float strength = mod(10.0 * vUv.y, 1.0);
  // float strength =  step(0.5, mod(10.0 * vUv.y, 1.0));
  // float strength =  step(0.5, mod(10.0 * vUv.x, 1.0));

  // float strength =  step(0.8, mod(10.0 * vUv.y, 1.0));
  // strength +=  step(0.8, mod(10.0 * vUv.x, 1.0));

  // float strength =  step(0.8, mod(10.0 * vUv.y, 1.0));
  // strength *=  step(0.8, mod(10.0 * vUv.x, 1.0));

  // float strength =  step(0.8, mod(10.0 * vUv.y, 1.0));
  // strength *=  step(0.4, mod(10.0 * vUv.x, 1.0));

  // float barX =  step(0.8, mod(10.0 * vUv.y, 1.0));
  // barX *=  step(0.4, mod(10.0 * vUv.x, 1.0));
  // float barY =  step(0.4, mod(10.0 * vUv.y, 1.0));
  // barY *=  step(0.8, mod(10.0 * vUv.x, 1.0));
  // float strength = barY + barX;

  // plus pattern
  // float barX =  step(0.8, mod(10.0 * vUv.y + 0.2, 1.0));
  // barX *=  step(0.4, mod(10.0 * vUv.x , 1.0));
  // float barY =  step(0.4, mod(10.0 * vUv.y, 1.0));
  // barY *=  step(0.8, mod(10.0 * vUv.x + 0.2 , 1.0));
  // float strength = barY + barX;

  // float strength = abs(vUv.x - 0.5);

  // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // float strength = floor(vUv.y * 10.0) / 10.0;
  // strength *= floor(vUv.x * 10.0) / 10.0;

  // float strength = random(vUv);

  // vec2 gridUV = vec2(
  //   floor(vUv.y * 10.0) / 10.0, 
  //   floor(vUv.x * 10.0) / 10.0);
  // float strength = random(gridUV);

  // vec2 gridUV = vec2(
  //   floor(vUv.y * 10.0) / 10.0, 
  //   floor((vUv.x + vUv.y * 0.5) * 10.0) / 10.0);
  // float strength = random(gridUV);

  // float strength = length(vUv - 0.5); 

  // float strength = 1.0 - length(vUv - 0.5);

  // point light effect (edges of mesh will never be zero - complete black)
  // float strength = 0.01 / length(vUv - 0.5);

  // star light effect
  // vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
  // vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
  // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
  // float strength = lightX * lightY;

  

  gl_FragColor = vec4(vec3(strength), 1.0);
}

