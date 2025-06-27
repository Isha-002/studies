# Three.js Objects Guide

## Coordinate System
Three.js uses a right-handed coordinate system:
- **Y-axis**: Points upward (positive Y is up)
- **Z-axis**: Points toward the viewer (positive Z comes out of the screen)  
- **X-axis**: Points to the right (positive X is right)

## Object Positioning

### Basic Position Manipulation
```javascript
// Individual axis positioning
mesh.position.x = 1;
mesh.position.z = 1;
mesh.position.y = 1;

// Set all axes at once
mesh.position.set(1, 1, 1);

// Copy position from another object
mesh.position.copy(otherMesh.position);

// Add to current position
mesh.position.add(new THREE.Vector3(1, 0, 0));

// Normalize position vector (make length = 1)
mesh.position.normalize(); // √(x² + y² + z²) = 1
```

### Advanced Position Methods
```javascript
// Get distance to another object
const distance = mesh.position.distanceTo(otherMesh.position);

// Linear interpolation between positions
mesh.position.lerp(targetPosition, 0.1); // 10% toward target

// Clamp position within bounds
mesh.position.clamp(
  new THREE.Vector3(-10, -10, -10), // min bounds
  new THREE.Vector3(10, 10, 10)     // max bounds
);
```

## Object Rotation

### Euler Angles (Default)
```javascript
// Rotation in radians
mesh.rotation.x = Math.PI / 4; // 45 degrees
mesh.rotation.y = Math.PI / 2; // 90 degrees
mesh.rotation.z = Math.PI;     // 180 degrees

// Set all rotations at once
mesh.rotation.set(Math.PI / 4, Math.PI / 2, 0);

// Rotation order (default: 'XYZ')
mesh.rotation.order = 'YXZ';
```

### Quaternions (More Stable)
```javascript
// Create quaternion from axis and angle
const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
mesh.quaternion.copy(quaternion);

// Smooth rotation interpolation
mesh.quaternion.slerp(targetQuaternion, 0.1);
```

## Object Scaling

### Uniform and Non-uniform Scaling
```javascript
// Uniform scaling
mesh.scale.setScalar(2); // 2x larger in all dimensions

// Individual axis scaling
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 1.5;

// Set all scales at once
mesh.scale.set(2, 0.5, 1.5);
```

## Transformation Matrix

### Working with Matrices
```javascript
// Update the object's matrix manually
mesh.updateMatrix();

// Compose transformation from position, quaternion, and scale
mesh.matrix.compose(position, quaternion, scale);

// Apply transformation matrix
mesh.applyMatrix4(transformationMatrix);

// Get world position/rotation/scale
const worldPosition = new THREE.Vector3();
const worldQuaternion = new THREE.Quaternion();
const worldScale = new THREE.Vector3();
mesh.getWorldPosition(worldPosition);
mesh.getWorldQuaternion(worldQuaternion);
mesh.getWorldScale(worldScale);
```

## Object Hierarchy and Groups

### Creating Groups
```javascript
const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
group.add(mesh3);
scene.add(group);

// Transform entire group
group.position.set(0, 5, 0);
group.rotation.y = Math.PI / 4;
```

### Parent-Child Relationships
```javascript
// Add child to parent
parentMesh.add(childMesh);

// Remove child from parent
parentMesh.remove(childMesh);

// Traverse hierarchy
parentMesh.traverse((child) => {
  if (child.isMesh) {
    console.log('Found mesh:', child.name);
  }
});
```

## Helper Objects

### Axes Helper
```javascript
const axesHelper = new THREE.AxesHelper(5); // size = 5
scene.add(axesHelper);
```

### Other Useful Helpers
```javascript
// Grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Box helper (shows bounding box)
const boxHelper = new THREE.BoxHelper(mesh, 0xff0000);
scene.add(boxHelper);

// Wireframe helper
const wireframe = new THREE.WireframeGeometry(geometry);
const wireframeMesh = new THREE.LineSegments(wireframe);
scene.add(wireframeMesh);
```

## Camera Controls

### Looking at Objects
```javascript
// Make camera look at object
camera.lookAt(mesh.position);

// Look at world position
camera.lookAt(0, 0, 0);

// Look at vector
const targetVector = new THREE.Vector3(1, 2, 3);
camera.lookAt(targetVector);
```

### Camera Positioning
```javascript
// Position camera relative to object
const offset = new THREE.Vector3(0, 5, 10);
camera.position.copy(mesh.position).add(offset);
camera.lookAt(mesh.position);
```

## Object Properties and State

### Visibility and Rendering
```javascript
// Toggle visibility
mesh.visible = false;

// Layer management
mesh.layers.set(1); // Set to layer 1
camera.layers.enable(1); // Camera can see layer 1

// Render order
mesh.renderOrder = 1; // Higher numbers render last

// Frustum culling
mesh.frustumCulled = true; // Default: true

// Auto-update matrix
mesh.matrixAutoUpdate = true; // Default: true
```

### Material and Geometry Updates
```javascript
// Update geometry after modifications
geometry.attributes.position.needsUpdate = true;

// Update material properties
material.color.setHex(0xff0000);
material.needsUpdate = true;

// Clone objects
const clonedMesh = mesh.clone();
const clonedMeshWithMaterial = mesh.clone();
clonedMeshWithMaterial.material = mesh.material.clone();
```

## Raycasting and Interaction

### Basic Raycasting Setup
```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  // Convert mouse coordinates to normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Cast ray from camera through mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Check for intersections
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log('Clicked:', clickedObject);
  }
}
```

## Performance Considerations

### Object Optimization
```javascript
// Use BufferGeometry instead of Geometry (deprecated)
const geometry = new THREE.BufferGeometry();

// Instance similar objects
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
for (let i = 0; i < count; i++) {
  const matrix = new THREE.Matrix4();
  matrix.setPosition(x, y, z);
  instancedMesh.setMatrixAt(i, matrix);
}
instancedMesh.instanceMatrix.needsUpdate = true;

// Dispose of unused resources
geometry.dispose();
material.dispose();
texture.dispose();
```

### LOD (Level of Detail)
```javascript
const lod = new THREE.LOD();
lod.addLevel(highDetailMesh, 0);   // 0-50 units
lod.addLevel(mediumDetailMesh, 50); // 50-100 units
lod.addLevel(lowDetailMesh, 100);   // 100+ units
scene.add(lod);
```

## Animation and Updates

### Animation Loop Integration
```javascript
function animate() {
  requestAnimationFrame(animate);
  
  // Update object transformations
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  
  // Update helpers if needed
  boxHelper.update();
  
  renderer.render(scene, camera);
}
```


## Common Patterns

### Object Factory Function
```javascript
function createMesh(geometry, material, position = [0, 0, 0]) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  return mesh;
}
```

### Object Pool for Performance
```javascript
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }
  
  get() {
    const obj = this.pool.pop() || this.createFn();
    this.active.push(obj);
    return obj;
  }
  
  release(obj) {
    const index = this.active.indexOf(obj);
    if (index > -1) {
      this.active.splice(index, 1);
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }
}
```

## Best Practices

1. **Use Groups** for complex object hierarchies
2. **Update matrices manually** when `matrixAutoUpdate = false` for performance
3. **Dispose resources** when objects are no longer needed
4. **Use InstancedMesh** for many similar objects
5. **Implement object pooling** for frequently created/destroyed objects
6. **Use world coordinates** when working with object interactions
7. **Prefer quaternions** over Euler angles for complex rotations
8. **Cache frequently used vectors** to avoid creating new objects