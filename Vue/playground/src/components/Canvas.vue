<script setup>
import { ref, onMounted, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  sphere: {
    type: Boolean,
    default: false
  }
})

const canvasRef = ref(null);
const scene = new THREE.Scene();

const size = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, size.width / size.height,0.2, 5);
camera.position.z = 0;

///////////////////////////////////////////////////////
// custom geometry
const count = 100
const login_geometry = new THREE.BufferGeometry()
const login_material = new THREE.MeshBasicMaterial({
  color: 'crimson',
  wireframe: true
})
const positions = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++) {
  positions[i] = Math.random() - 0.5
}

const buffer_attribute = new THREE.BufferAttribute(positions, 3)
login_geometry.setAttribute('position', buffer_attribute)

const login_mesh = new THREE.Mesh(login_geometry, login_material)
///////////////////////////////////////////////////////
// sphere
const sphere_geometry = new THREE.SphereGeometry(10,512,128)
const sphere_material = new THREE.MeshBasicMaterial({ color: "red" ,wireframe: true})
const sphere_mesh = new THREE.Mesh(sphere_geometry, sphere_material)
sphere_mesh.position.z = 1.5
///////////////////////////////////////////////////////



const clock = new THREE.Clock()

const updateScene = () => {
  scene.clear()
  if (props.sphere === true) {
    scene.add(camera, login_mesh, sphere_mesh);
  } else {
    scene.add(camera, login_mesh);
  }
}

onMounted(() => {
  updateScene()


  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true });
  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);

  window.addEventListener('resize', () => {

  size.width = window.innerWidth;
  size.height = window.innerHeight;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = size.width / size.height;

  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  });


  const animate = () => {
    const elapsed = clock.getElapsedTime()

    login_mesh.rotation.y =  elapsed / 12
    sphere_mesh.rotation.y = elapsed / 48

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
});

watch(() => props.sphere, (_) => {
  updateScene()
})






</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>




<style>
html, body {
  overflow: hidden;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
