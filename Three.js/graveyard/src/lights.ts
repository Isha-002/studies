import * as THREE from 'three'

export const ambient_light = new THREE.AmbientLight(0xffffff, 0.5)

export const directional_light = new THREE.DirectionalLight(0xffffff, 2)
directional_light.position.set(0,2,2)

export const light_helper = new THREE.DirectionalLightHelper(directional_light)
