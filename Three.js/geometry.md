### Geometry:
- Composed of vertices (coordinates in 3D space)  
- And faces (triangels that join those vertices and create a surface)
- can be used for meshes but also particles
- can store more data than positions (UV coordinates, Normals, colors, etc)
- All the geometries inherit from `BufferGeometry`

### Creating custom geometries:
1. use `Float32Array` to create each vertex (an fixed size array)
2. convert `Float32Array` to `BufferAttribute` (this attribute gets float array and a number)  
  - the number represent how much values compose one vertex
3. add `BufferAttribute` to `BufferGeometry` with `setAttribute('position', BufferAttribute)`

```javascript

const count = 50;
// count of triangles * count of each vertex(3) * each vertex XYZ(3)
const float_array = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  float_array[i] = Math.random();
}

const buffer_attribute = new THREE.BufferAttribute(float_array, 3);

const custom_geometry = new THREE.BufferGeometry();
custom_geometry.setAttribute('position', buffer_attribute);

const custom_mesh = new THREE.Mesh(
  custom_geometry,
  new THREE.MeshBasicMaterial({
    color: 0x3ff114f,
    wireframe: true,
  })
);
scene.add(custom_mesh);
```