import type { WebGLRenderer } from 'three';
import { camera } from './camera';
import { scene } from './renderer';
import type { OrbitControls, Timer } from 'three/examples/jsm/Addons.js';

export const tick = (
  renderer: WebGLRenderer,
  controls: OrbitControls,
  timer: Timer
) => {
  timer.update();
  const elapsed_time = timer.getElapsed();

  controls.update();
  renderer.render(scene, camera);
};
