import type { Timer } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

import { Camera, Clock, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  cloud_mesh,
  earth,
  earth_group,
  jupiter,
  jupiter_group,
  mars,
  mars_group,
  mercury,
  mercury_group,
  moon,
  moon_group,
  moon_orbit,
  neptune,
  neptune_group,
  saturn,
  saturn_group,
  sun_shader_material,
  uranus,
  uranus_group,
  venus,
  venus_atmosphere,
  venus_group,
} from './meshes';
import {
  earth_full_revolution,
  earth_rotation,
  jupiter_full_revolution,
  jupiter_rotation,
  mars_full_revolution,
  mars_rotation,
  mercury_full_revolution,
  mercury_rotation,
  moon_full_revolution,
  moon_rotation,
  neptune_full_revolution,
  neptune_rotation,
  saturn_full_revolution,
  saturn_rotation,
  uranus_full_revolution,
  uranus_rotation,
  venus_full_revolution,
  venus_rotation,
} from './constants';
import { generateMesh, physic_bodies, physic_mesh_count, physic_meshes, world } from './plain';

import gsap from 'gsap';


const earthWorldPos = new THREE.Vector3()

const currentPlanetWorldPos = new THREE.Vector3()
let cameraCurrentFocus = null

const cameraOffset = new THREE.Vector3(0,0,0)

let cameraEase = [0,0]
let scrollY = window.scrollY
let scrollX = window.scrollX

let angle = Math.sin(1);


export const tick = (
  clock: Timer,
  controls: OrbitControls,
  renderer: WebGLRenderer,
  scene: Scene,
  camera: THREE.OrthographicCamera,
  cursor: { x: number, y: number },
  currentPlanetFocus: { obj: THREE.Mesh, zoom: number }
) => {
  clock.update()
  const elapsedTime = clock.getElapsed();
  const deltaTime = clock.getDelta()

  // sun shader
  sun_shader_material.uniforms.uTime.value = elapsedTime

  // planets rotation around themselves
  mercury.rotation.y = elapsedTime / mercury_rotation;
  venus.rotation.y = elapsedTime / venus_rotation;
  venus_atmosphere.rotation.y = elapsedTime / venus_rotation;
  earth.rotation.y = elapsedTime / earth_rotation;
  cloud_mesh.rotation.y = elapsedTime / earth_rotation;
  moon.rotation.y = elapsedTime / moon_rotation;
  mars.rotation.y = elapsedTime / mars_rotation;
  jupiter.rotation.y = elapsedTime / jupiter_rotation;
  saturn.rotation.y = elapsedTime / saturn_rotation;
  uranus.rotation.y = elapsedTime / uranus_rotation;
  neptune.rotation.y = elapsedTime / neptune_rotation;



  // planets rotating around sun
  mercury_group.rotation.y = elapsedTime / mercury_full_revolution;
  venus_group.rotation.y = elapsedTime / venus_full_revolution;
  earth_group.rotation.y = elapsedTime / earth_full_revolution;
  moon_group.rotation.y = elapsedTime / moon_full_revolution;
  mars_group.rotation.y = elapsedTime / mars_full_revolution;
  jupiter_group.rotation.y = elapsedTime / jupiter_full_revolution;
  saturn_group.rotation.y = elapsedTime / saturn_full_revolution;
  uranus_group.rotation.y = elapsedTime / uranus_full_revolution;
  neptune_group.rotation.y = elapsedTime / neptune_full_revolution;

  // i have no idea why my moon orbit despite being in a group, doesnt
  // follow my earth position when earth is rotating around the sun
  // even when i add moon directly as a child of earth it follows both position
  // and rotation of earth but when i do the same for moon_orbit it just
  // doesnt work! the position of orbit will be based of scene 0,0,0
  // i hate ring geometry
  earth.getWorldPosition(earthWorldPos);
  moon_group.position.copy(earthWorldPos);
  moon_orbit.position.copy(earthWorldPos);



  // easing animation on mouse movement
  cameraEase[0] += (cursor.x - cameraEase[0]) * 3 * deltaTime
  cameraEase[1] += (cursor.y - cameraEase[1]) * 3 * deltaTime
  cameraOffset.x = cameraEase[0] + 5
  cameraOffset.y = cameraEase[1] - 0.5


  // locating camera on the planet
  currentPlanetFocus.obj.getWorldPosition(currentPlanetWorldPos)
  controls.target.copy(currentPlanetWorldPos)
  camera.position.x = currentPlanetWorldPos.x + Math.cos(angle + Math.PI) * 10;
  // the reason for this big value on Z is because some part of the scene doesnt get rendered
  // i think its because the camera gets too close to the scene - after increasing Z value
  // we must also increase Y value to give the view some angle
  camera.position.z = currentPlanetWorldPos.z + Math.sin(angle + Math.PI) * 280; 
  camera.position.y = currentPlanetWorldPos.y + 80;


  // PHYSICS!! - we put all physics logic here
  world.step()
  if (physic_meshes.length > 0)
  for(let i = 0; i < physic_mesh_count; i++) {
    const body = physic_bodies[i]
    const position = body.translation()
    const rotation = body.rotation()

    physic_meshes[i].position.set(position.x, position.y, position.z)
    physic_meshes[i].quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
  }



  // only use this if you are using orbit controls or it will mess with camera settings
  controls.update();
  renderer.render(scene, camera);
};
