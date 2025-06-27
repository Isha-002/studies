import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// textures
const loading_Manager = new THREE.LoadingManager()

loading_Manager.onStart = () => {
  console.log("start")
}

loading_Manager.onLoad = () => {
  console.log("loaded")
}

loading_Manager.onError = () => {
  console.log("error")
}


const texture_Loader = new THREE.TextureLoader(loading_Manager)

// only use for colored textures
function srgb_loader(path) {
  const texture = texture_Loader.load(path)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  return texture
}

const earth_texture = srgb_loader('/planet/2k_earth_daymap.jpg')
const earth_clouds_texture = srgb_loader('/planet/2k_earth_clouds.jpg')
const earth_normal_texture = texture_Loader.load('/planet/2k_earth_normal_map.tif')

const moon_texture = srgb_loader('/planet/2k_moon.jpg')
const sun_texture = srgb_loader('/planet/2k_sun.jpg')
const mars_texture = srgb_loader('/planet/2k_mars.jpg')
const jupiter_texture = srgb_loader('/planet/2k_jupiter.jpg')
const mercury_texture = srgb_loader('/planet/2k_mercury.jpg')
const neptune_texture = srgb_loader('/planet/2k_neptune.jpg')








// debug
// note: with lil-gui you can only change properties of objects 
const gui = new GUI()
const debugObj = {}





const scene = new THREE.Scene();
const canvas = document.createElement('canvas');
canvas.classList.add('webgl');
document.body.appendChild(canvas);






// obj
const geometry = new THREE.SphereGeometry(2,256,128,0,Math.PI * 2,0,Math.PI);
const material = new THREE.MeshBasicMaterial({
  map: earth_texture,
  // color: 'blue'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cloud_geometry = new THREE.SphereGeometry(2.05 ,256,128,0,Math.PI * 2,0,Math.PI);
const cloud_material = new THREE.MeshBasicMaterial({
  map: earth_clouds_texture,
  transparent: true,
  opacity: .5,
  depthWrite: false,
});
const cloud_mesh = new THREE.Mesh(cloud_geometry, cloud_material);
scene.add(cloud_mesh);
cloud_mesh.renderOrder = 1;





// obj 2
const moon_geometry = new THREE.SphereGeometry(2,256,128,0,Math.PI * 2,0,Math.PI);
const moon_material = new THREE.MeshBasicMaterial({
  map: moon_texture,
  // color: 'blue'
});
const moon_mesh = new THREE.Mesh(moon_geometry, moon_material);
scene.add(moon_mesh);
moon_mesh.position.x = 6


// obj 3
const sun_geometry = new THREE.SphereGeometry(2,256,128,0,Math.PI * 2,0,Math.PI);
const sun_material = new THREE.MeshBasicMaterial({
  map: sun_texture,
  // color: 'blue'
});
const sun_mesh = new THREE.Mesh(sun_geometry, sun_material);
scene.add(sun_mesh);
sun_mesh.position.x = -6

// obj 4
const mars_geometry = new THREE.SphereGeometry(2,256,128,0,Math.PI * 2,0,Math.PI);
const mars_material = new THREE.MeshBasicMaterial({
  map: mars_texture,
  // color: 'blue'
});
const mars_mesh = new THREE.Mesh(mars_geometry, mars_material);
scene.add(mars_mesh);
mars_mesh.position.x = -12

// obj 4
const jupiter_geometry = new THREE.SphereGeometry(2,256,128,0,Math.PI * 2,0,Math.PI);
const jupiter_material = new THREE.MeshBasicMaterial({
  map: jupiter_texture,
  // color: 'blue'
});
const jupiter_mesh = new THREE.Mesh(jupiter_geometry, jupiter_material);
scene.add(jupiter_mesh);
jupiter_mesh.position.x = 12




// const count = 500;
// // count of triangles * count of each vertex(3) * each vertex XYZ(3)
// const float_array = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   float_array[i] = Math.random() - 0.5;
// }

// const buffer_attribute = new THREE.BufferAttribute(float_array, 3);
// const custom_geometry = new THREE.BufferGeometry();
// custom_geometry.setAttribute('position', buffer_attribute);
// const custom_mesh = new THREE.Mesh(
//   custom_geometry,
//   new THREE.MeshBasicMaterial({
//     color: 0x3ff114f,
//     wireframe: true,
//   })
// );
// custom_mesh.position.z = 2;
// scene.add(custom_mesh);

// gui.add(custom_mesh.position, 'y').min(-3).max(3).step(0.01).name("y")
// gui.add(custom_mesh.material, 'wireframe')
// gui.addColor(custom_mesh.material, 'color')
// debugObj.spin = () => {
//   gsap.to(custom_mesh.rotation, { y: custom_mesh.rotation.y + Math.PI * 2 })
// }
// gui.add(debugObj, 'spin')








// camera
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const camera = new THREE.OrthographicCamera(-15 * size.width / size.height ,15 * size.width / size.height ,15 ,-15, 0.1, 100);
camera.position.z = 15;
console.log(camera.position.distanceTo(mesh.position));
scene.add(camera);


// camera helper
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

// orbit
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;







// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const cursor = {
  x: 0,
  y: 0,
};
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.useLegacyLights = false;







const clock = new THREE.Clock();

// animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  // custom_mesh.rotation.y = elapsedTime / 6;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();







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
  camera.aspect = size.width / size.height;

  // let three.js know it has to update
  camera.updateProjectionMatrix();

  // update canvas
  renderer.setSize(size.width, size.height);
});

// POSTPROCESSING SETUP
// const composer = new EffectComposer(renderer)
// composer.addPass(new RenderPass(scene, camera))

// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   1.5,   // strength of bloom glow
//   0.4,   // radius of bloom glow
//   0.85   // threshold to bloom
// )
// composer.addPass(bloomPass)





// moire patterns
// basis compresion for images