// for vertext shader it is recommended to use high precision
precision lowp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}