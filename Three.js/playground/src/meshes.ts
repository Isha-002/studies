

import * as THREE from 'three';
import {
  earth_clouds_texture,
  earth_texture,
  mercury_texture,
  moon_texture,
  sun_texture,
  venus_texture,
  venus_atmosphere_texture,
  mars_texture,
  jupiter_texture,
  saturn_texture,
  saturn_alpha_texture, // ring texture
  uranus_texture,
  neptune_texture,
} from './textures';


// @ts-ignore
import vertexShader from './shaders/sun.vert?raw'
// @ts-ignore // yes i can
import fragmentShader from './shaders/sun.frag?raw'
import { bufferAttribute } from 'three/src/nodes/TSL.js';

const mercury_distance = 1;   
const venus_distance   = 2.1;   
const earth_distance   = 3;   
const mars_distance    = 4.3;  
const jupiter_distance = 7;   
const saturn_distance  = 9;   
const uranus_distance  = 12;   
const neptune_distance = 16;  

const sun_scale = 2.5
const mercury_scale = 0.4;  
const venus_scale   = 0.8;  
const earth_scale   = 0.8;  
const moon_scale   = 0.25;  
const mars_scale    = 0.5;  
const jupiter_scale = 1.5; 
const saturn_scale  = 1.1;
const uranus_scale  = 0.9;
const neptune_scale = 0.9;

const geometry = new THREE.SphereGeometry(
  sun_scale,
  256,
  128,
  0,
  Math.PI * 2,
  0,
  Math.PI
);
const layer_geometry = new THREE.SphereGeometry(
  sun_scale + 0.01,
  256,
  128,
  0,
  Math.PI * 2,
  0,
  Math.PI
);

// sun
export const sun_material = new THREE.MeshStandardMaterial({
  map: sun_texture,
});
export const sun = new THREE.Mesh(geometry, sun_material);
sun.scale.setScalar(sun_scale)
sun.position.x = 0;

const verticesCount = geometry.attributes.position.count
const randoms = new Float32Array(verticesCount)

for (let i = 0; i < verticesCount; i++) {
  randoms[i] = Math.random()
}
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

export const sun_shader_material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  // wireframe: true,
  transparent: true,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('yellow')},
    uTexture: { value: sun_texture }
  }

})
export const sun_shader = new THREE.Mesh(geometry, sun_shader_material)
sun_shader.scale.setScalar(sun_scale + 0.1)
sun_shader.position.x = 0;
////////////////////////////////////////////////////////////////
// mercury
export const mercury_material = new THREE.MeshStandardMaterial({
  map: mercury_texture,
});
export const mercury = new THREE.Mesh(geometry, mercury_material);
mercury.scale.setScalar(mercury_scale)
mercury.position.x = -mercury_distance * 10;

////////////////////////////////////////////////////////////////
// venus
export const venus_material = new THREE.MeshStandardMaterial({
  map: venus_texture,
});
export const venus = new THREE.Mesh(geometry, venus_material);
venus.scale.setScalar(venus_scale)
venus.position.x = - venus_distance * 10;

// venus atmosphere
export const venus_atmosphere_material = new THREE.MeshStandardMaterial({
  map: venus_atmosphere_texture,
  transparent: true,
  opacity: 0.80
});
export const venus_atmosphere = new THREE.Mesh(
  layer_geometry,
  venus_atmosphere_material,
);
venus_atmosphere.scale.setScalar(venus_scale)
venus_atmosphere.position.x = - venus_distance * 10;
////////////////////////////////////////////////////////////////
// earth
export const earth_material = new THREE.MeshPhysicalMaterial({
  map: earth_texture,
});
export const earth = new THREE.Mesh(geometry, earth_material);
earth.scale.setScalar(earth_scale)
earth.position.x = -earth_distance * 10;

// earth clouds
export const cloud_material = new THREE.MeshStandardMaterial({
  map: earth_clouds_texture,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
});
export const cloud_mesh = new THREE.Mesh(layer_geometry, cloud_material);
cloud_mesh.scale.setScalar(earth_scale)
cloud_mesh.position.x = -earth_distance * 10;

// moon
export const moon_material = new THREE.MeshStandardMaterial({
  map: moon_texture,
});
export const moon = new THREE.Mesh(geometry, moon_material);
moon.scale.setScalar(moon_scale)
moon.position.x = 4;
////////////////////////////////////////////////////////////////
// mars
export const mars_material = new THREE.MeshStandardMaterial({
  map: mars_texture,
});
export const mars = new THREE.Mesh(geometry, mars_material);
mars.scale.setScalar(mars_scale)
mars.position.x = -mars_distance * 10;
////////////////////////////////////////////////////////////////
// jupiter
export const jupiter_material = new THREE.MeshStandardMaterial({
  map: jupiter_texture,
});
export const jupiter = new THREE.Mesh(geometry, jupiter_material);
jupiter.scale.setScalar(jupiter_scale)
jupiter.position.x = -jupiter_distance * 10;
////////////////////////////////////////////////////////////////
// saturn
export const saturn_material = new THREE.MeshStandardMaterial({
  map: saturn_texture,
});
export const saturn = new THREE.Mesh(geometry, saturn_material);
saturn.scale.setScalar(saturn_scale)
saturn.rotation.order = 'ZYX'; 
saturn.rotation.z = 26 * Math.PI / 180;
saturn.position.x = -saturn_distance * 10;

// saturn ring
// TODO: fix texture
const ring_geometry = new THREE.RingGeometry( 3.5, 4.5, 64 );
export const saturn_ring_material = new THREE.MeshStandardMaterial({
  // map: saturn_alpha_texture,
  color: "#D1A980",
  side: THREE.DoubleSide
});
export const saturn_ring = new THREE.Mesh(ring_geometry, saturn_ring_material);
saturn_ring.position.x = -saturn_distance * 10;
saturn_ring.scale.setScalar(saturn_scale)
saturn_ring.rotation.y = -Math.PI / 8
saturn_ring.rotation.x = -Math.PI /2
////////////////////////////////////////////////////////////////
// uranus
export const uranus_material = new THREE.MeshStandardMaterial({
  map: uranus_texture,
});
export const uranus = new THREE.Mesh(geometry, uranus_material);
uranus.scale.setScalar(uranus_scale)
uranus.position.x = -uranus_distance * 10;
////////////////////////////////////////////////////////////////
// neptune
export const neptune_material = new THREE.MeshStandardMaterial({
  map: neptune_texture,
});
export const neptune = new THREE.Mesh(geometry, neptune_material);
neptune.position.x = -neptune_distance * 10;
neptune.scale.setScalar(neptune_scale)




// orbits
const oribt_geometry = new THREE.RingGeometry( 9.98, 10, 64 ); 
oribt_geometry.rotateX(-Math.PI / 2)
const material = new THREE.MeshBasicMaterial( { color: 'white', side: THREE.DoubleSide } );

export const mercury_orbit = new THREE.Mesh( oribt_geometry, material )
mercury_orbit.scale.setScalar(mercury_distance)

export const venus_orbit = new THREE.Mesh( oribt_geometry, material )
venus_orbit.scale.setScalar(venus_distance)

export const earth_orbit = new THREE.Mesh( oribt_geometry, material )
earth_orbit.scale.setScalar(earth_distance)


export const moon_orbit = new THREE.Mesh( oribt_geometry, material )
moon_orbit.scale.setScalar(0.4)

export const mars_orbit = new THREE.Mesh( oribt_geometry, material )
mars_orbit.scale.setScalar(mars_distance)

export const jupiter_orbit = new THREE.Mesh( oribt_geometry, material )
jupiter_orbit.scale.setScalar(jupiter_distance)

export const saturn_orbit = new THREE.Mesh( oribt_geometry, material )
saturn_orbit.scale.setScalar(saturn_distance)

export const uranus_orbit = new THREE.Mesh( oribt_geometry, material )
uranus_orbit.scale.setScalar(uranus_distance)

export const neptune_orbit = new THREE.Mesh( oribt_geometry, material )
neptune_orbit.scale.setScalar(neptune_distance)




// groups 

////////////////////////////////////////////////////////////////
export const mercury_group = new THREE.Group()
mercury_group.add(mercury)
////////////////////////////////////////////////////////////////
export const venus_group = new THREE.Group()
venus_group.add(venus, venus_atmosphere)
////////////////////////////////////////////////////////////////
export const earth_group = new THREE.Group()
earth_group.add(earth, cloud_mesh)
////////////////////////////////////////////////////////////////
export const moon_group = new THREE.Group()
// well since we are updating orbit manually there is no reason to add it as a group
moon_group.add(moon)
////////////////////////////////////////////////////////////////
export const mars_group = new THREE.Group()
mars_group.add(mars)
////////////////////////////////////////////////////////////////
export const jupiter_group = new THREE.Group()
jupiter_group.add(jupiter)
////////////////////////////////////////////////////////////////
export const saturn_group = new THREE.Group()
saturn_group.add(saturn, saturn_ring)
////////////////////////////////////////////////////////////////
export const uranus_group = new THREE.Group()
uranus_group.add(uranus)
////////////////////////////////////////////////////////////////
export const neptune_group = new THREE.Group()
neptune_group.add(neptune)
////////////////////////////////////////////////////////////////


