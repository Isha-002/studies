// import * as THREE from 'three';
import { renderer, scene } from './renderer';
import { camera, controls, size } from './camera';
import { tick } from './tick';
import { ambient_light, directional_light, light_helper } from './lights';
import { Timer } from 'three/examples/jsm/Addons.js';
import { floor_mesh } from './objects/floor';
import './debug.ts';
import './objects/model.ts';









scene.add(camera, ambient_light, directional_light,light_helper, floor_mesh);

renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const timer = new Timer();
const animate = () => {
  tick(renderer, controls, timer);
  window.requestAnimationFrame(animate);
};
animate();
