
precision highp float;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 uFrequency;
uniform float uTime;

varying float vRandom;
varying vec2 vUv;

void main() {

  vec4 model = modelMatrix * vec4(position, 1.0);
  model.z += sin(model.x * uFrequency.x - uTime) * 0.02;
  model.z += sin(model.y * uFrequency.y - uTime) * 0.1;
  // model.z += aRandom * 0.4;



  vec4 view = viewMatrix * model;
  vec4 project = projectionMatrix * view;


  gl_Position =  project;

  vRandom = aRandom;
  vUv = uv;
}