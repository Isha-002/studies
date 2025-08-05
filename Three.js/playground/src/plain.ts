import * as THREE from 'three';
import RAPIER, { RigidBody } from '@dimforge/rapier3d';


export const physicsProperties = {
  gravity: { x: 0.0, y: -2.00, z: 0.0 },
} 
export const world = new RAPIER.World(physicsProperties.gravity) 

export const physic_meshes: THREE.Mesh[] = []
export const physic_bodies: RigidBody[] = []
export const physic_mesh_count = 100

export const generatePlain = (scene: THREE.Scene) => {
  const plain = new THREE.Mesh(
    new THREE.PlaneGeometry(140,140),
    new THREE.MeshStandardMaterial({ color: 'gray'})
  )
  plain.rotation.x = - Math.PI / 2
  plain.position.y = 0.01
  scene.add(plain)

  const light = new THREE.DirectionalLight('white', 1)
  scene.add(light)



  const ground = RAPIER.ColliderDesc.cuboid(100.0, 0.01, 100.0).setRestitution(0.4);
  world.createCollider(ground)


  for(let i = 0; i < physic_mesh_count; i++) {
    generateMesh(scene)
  }
}

const sphere_geometry = new THREE.SphereGeometry(0.25)
const sphere_material = new THREE.MeshStandardMaterial({ color: 'white'})
const colliderDesc = RAPIER.ColliderDesc.ball(0.25).setRestitution(1);
export const generateMesh = (scene: THREE.Scene) => {
  const sphere = new THREE.Mesh(
    sphere_geometry,
    sphere_material
  )
  const posX = (Math.random() - 0.5) * 50
  const posY = (Math.random() - 0.5) * 50
  const posZ = (Math.random() - 0.5) * 50
  sphere.position.set(posX, posY, posZ)
  scene.add(sphere)
  physic_meshes.push(sphere)

  const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(posX, posY, posZ);
  const rigidBody = world.createRigidBody(bodyDesc);
  physic_bodies.push(rigidBody)


  world.createCollider(colliderDesc, rigidBody);
}