import * as THREE from 'three'


export const scene = new THREE.Scene()
export const canvas = document.querySelector('canvas') as HTMLCanvasElement;
export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })


