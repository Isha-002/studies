import * as THREE from 'three';

// textures
export const loading_Manager = new THREE.LoadingManager()

loading_Manager.onStart = () => {
  console.log("start")
}

loading_Manager.onLoad = () => {
  console.log("loaded")
}

loading_Manager.onError = () => {
  console.log("error")
}

export default { loading_Manager }






// obj_exp
// const geometry_exp = new THREE.SphereGeometry(2,256,128,0,Math.PI * 2,0,Math.PI);
// const material_exp = new THREE.MeshPhysicalMaterial({
//   metalness: 0,
//   roughness: 0,
//   transmission: 1,
//   ior: 1.5,
//   thickness: 0.5,

//   // makes light reflection on objects more natural
//   iridescence: 1,
//   iridescenceIOR: 1,
//   iridescenceThicknessRange: [100, 800]
// });
// const mesh_exp = new THREE.Mesh(geometry_exp, material_exp);
// // scene.add(mesh_exp);
// mesh_exp.position.x = 6

// gui.add(material_exp, 'metalness').min(0).max(1).step(0.001)
// gui.add(material_exp, 'roughness').min(0).max(1).step(0.001)
// gui.add(material_exp, 'transmission').min(0).max(2.33).step(0.001)
// gui.add(material_exp, 'ior').min(0).max(10).step(0.001)
// gui.add(material_exp, 'thickness').min(0).max(10).step(0.001)