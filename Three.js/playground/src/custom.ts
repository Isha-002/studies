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