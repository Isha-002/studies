import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import GUI from 'lil-gui';

import gsap from 'gsap';

import {
  cloud_mesh,
  earth,
  earth_group,
  earth_orbit,
  jupiter,
  jupiter_group,
  jupiter_orbit,
  mars,
  mars_group,
  mars_orbit,
  mercury,
  mercury_group,
  mercury_orbit,
  moon,
  moon_group,
  moon_orbit,
  neptune,
  neptune_group,
  neptune_orbit,
  saturn,
  saturn_group,
  saturn_orbit,
  saturn_ring,
  sun,
  uranus,
  uranus_group,
  uranus_orbit,
  venus,
  venus_atmosphere,
  venus_group,
  venus_orbit,
} from './meshes';
import { setup_debug } from './debug';
import { tick } from './tick';
import { ambient_light, point_light } from './lights';

export const scene = new THREE.Scene();
const canvas = document.createElement('canvas');
canvas.classList.add('webgl');
document.body.appendChild(canvas);

// debug
// note: with lil-gui you can only change properties of objects
const gui = new GUI();
const debugObj = {};

const font_loader = new FontLoader();
font_loader.load('/fonts/typeface.json', (font) => {
  console.log('font loaded');
  const text_geometry = new TextGeometry('hello three.js', {
    font,
    size: 0.5,
    depth: 0.1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.13,
    bevelSize: 0.02,
    bevelOffset: 0.02,
    bevelSegments: 4,
  });
  text_geometry.center();
  const text_material = new THREE.MeshNormalMaterial({
    wireframe: false,
  });
  const text = new THREE.Mesh(text_geometry, text_material);
  // scene.add(text)
});

// camera
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// export const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const camera_view = 100;
export const camera = new THREE.OrthographicCamera(
  -camera_view * size.width / size.height,
  camera_view * size.width / size.height,
  camera_view,
  -camera_view
);


camera.position.set(-100, 80, 200); 
camera.lookAt(saturn.position);
scene.add(camera);

// camera helper
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

// orbit
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const cursor = {
  x: 0,
  y: 0,
};
renderer.outputColorSpace = THREE.SRGBColorSpace;

// needed for HDR rendering
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const clock = new THREE.Clock();

// animation
const animate = () => {
  tick(clock, controls, renderer, scene, camera);
  requestAnimationFrame(animate);
};

animate();

// cursor
window.addEventListener('mousemove', (e) => {
  // we want the value to first be only in 0 to 1 range
  // then we add - 0.5 to go from 0.5 to -0.5
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);

  // console.log(cursor.x, cursor.y);
});

// resize handle
window.addEventListener('resize', () => {
  // update size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // in case of screen change pixel ratio will update
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // update camera (because aspect ratio changes)
  // camera.aspect = size.width / size.height;

  camera.left = (-camera_view * size.width) / size.height;
  camera.right = (camera_view * size.width) / size.height;
  camera.top = camera_view;
  camera.bottom = -camera_view;

  // let three.js know it has to update
  camera.updateProjectionMatrix();

  // update canvas
  renderer.setSize(size.width, size.height);
});

// const rgbe_l2oader = new RGBELoader().load('/twilight_sunset_1k.hdr', (envMap) => {
//   envMap.mapping = THREE.EquirectangularReflectionMapping
//   scene.background = envMap
//   scene.environment = envMap // This makes materials reflect the environment

//   renderer.render(scene, camera)
// })

// moire patterns
// basis compresion for images

setup_debug(camera, gui);

scene.add(
  // planets
  sun,
  mercury_group,
  venus_group,
  earth_group,
  moon_group,
  mars_group,
  jupiter_group,
  saturn_group,
  uranus_group,
  neptune_group,
  // orbits
  mercury_orbit,
  venus_orbit,
  earth_orbit,
  moon_orbit,
  mars_orbit,
  jupiter_orbit,
  saturn_orbit,
  uranus_orbit,
  neptune_orbit,
  // lights
  ambient_light,
  point_light
);
