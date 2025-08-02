import * as THREE from 'three';
import { canvas, renderer } from './renderer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


export const size = { width: window.innerWidth, height: window.innerHeight };

export const camera = new THREE.PerspectiveCamera(70, size.width / size.height);
camera.position.set(0,2,4)


export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true








window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = size.width / size.height;

  // let three.js know it has to update
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height)
});
