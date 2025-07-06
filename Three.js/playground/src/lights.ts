import * as THREE from 'three';


export const ambient_light = new THREE.AmbientLight(0xffffff, 1)

export const point_light = new THREE.PointLight(0xffffff, 1000)
point_light.position.set(0,10,5)