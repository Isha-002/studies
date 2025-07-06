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



const earthWorldPos = new THREE.Vector3();
export const tick = (
  clock: Clock,
  controls: OrbitControls,
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera
) => {
  const elapsedTime = clock.getElapsedTime();

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
  console.log(earthWorldPos)

  controls.update();
  renderer.render(scene, camera);
};
