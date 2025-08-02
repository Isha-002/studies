import * as THREE from 'three';
import { floorAlphaTexture, floorARMTexture, floorColorTexture, floorDisplacementTexture, floorNormalTexture } from '../textures';
// import vertexShader from '../shaders/vertex.glsl';
// import fragmentShader from '../shaders/fragment.glsl';

export const floor_geometry = new THREE.PlaneGeometry(10,10, 100, 100)

// export const floor_material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
// });

export const floor_material = new THREE.MeshStandardMaterial({
  map: floorColorTexture,
  // the arm map contains 3 maps ao: gets only red value, roughness: green, metalness: blue
  aoMap: floorARMTexture,
  roughnessMap: floorARMTexture,
  metalnessMap: floorARMTexture,
  // displacement map moves vertices, your mesh has to have enough vertices or it will move the entire thing!
  // if u wanna lower the effect use displacement scale
  // displacement might change the overall position of the mesh you can tweak displacement bias in order to revert this effect
  displacementMap: floorDisplacementTexture,
  displacementScale: 0.2,
  normalMap: floorNormalTexture,
  alphaMap: floorAlphaTexture,
  transparent: true
});






export const floor_mesh = new THREE.Mesh(floor_geometry, floor_material)
floor_mesh.rotation.x = - Math.PI / 2
