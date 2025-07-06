import * as THREE from 'three';


///////////////////////////////////////////////////////////////////
const inner_count = 800

const inner_particles_geometry = new THREE.BufferGeometry()
const inner_positions = new Float32Array(inner_count * 3)

const radius = 55;
const thickness = 10;

for (let i = 0; i < inner_count; i++) {
  const angle = Math.random() * Math.PI * 2;
  const r = radius + (Math.random() - 0.5) * thickness;

  const x = Math.cos(angle) * r;
  const y = (Math.random() - 0.5) * 7;
  const z = Math.sin(angle) * r;

  inner_positions[i * 3 + 0] = x;
  inner_positions[i * 3 + 1] = y;
  inner_positions[i * 3 + 2] = z;
}


inner_particles_geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(inner_positions, 3)
)
///////////////////////////////////////////////////////////////////
const outer_particles_geometry = new THREE.BufferGeometry()
const outer_count = 1200
const outer_positions = new Float32Array(outer_count * 3)

const outer_radius = 200;
const outer_thickness = 40;

for (let i = 0; i < outer_count; i++) {
  const angle = Math.random() * Math.PI * 2;
  const r = outer_radius + (Math.random() - 0.5) * outer_thickness;

  const x = Math.cos(angle) * r;
  const y = (Math.random() - 0.5) * 7;
  const z = Math.sin(angle) * r;

  outer_positions[i * 3 + 0] = x;
  outer_positions[i * 3 + 1] = y;
  outer_positions[i * 3 + 2] = z;
}
outer_particles_geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(outer_positions, 3)
)
///////////////////////////////////////////////////////////////////
const galaxy_particles_geometry = new THREE.BufferGeometry()
const galaxy_count = 12000
const galaxy_positions = new Float32Array(galaxy_count * 3) 

const galaxy_radius = 500;

for (let i = 0; i < galaxy_count; i++) {
  // (0 to 360°)
  const theta = Math.random() * Math.PI * 2;
  // (0 to 180°)             
  const phi = Math.acos(2 * Math.random() - 1);         

  const x = galaxy_radius * Math.sin(phi) * Math.cos(theta);
  const y = galaxy_radius * Math.sin(phi) * Math.sin(theta);
  const z = galaxy_radius * Math.cos(phi);

  galaxy_positions[i * 3 + 0] = x;
  galaxy_positions[i * 3 + 1] = y;
  galaxy_positions[i * 3 + 2] = z;
}

galaxy_particles_geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(galaxy_positions, 3)
)


const particles_material = new THREE.PointsMaterial({ size: 0.2, sizeAttenuation: false}) 

export const inner_particles = new THREE.Points(inner_particles_geometry, particles_material)
export const outer_particles = new THREE.Points(outer_particles_geometry, particles_material)
export const galaxy_particles = new THREE.Points(galaxy_particles_geometry, particles_material)
