
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()
const canvas = document.querySelector("canvas") as HTMLCanvasElement 







const geometry = new THREE.BoxGeometry(1,1,1)  
const material = new THREE.RawShaderMaterial({ 
  vertexShader: ``,
  fragmentShader: ``,
})  
















const mesh = new THREE.Mesh(geometry, material) 
scene.add(mesh)


const size = { width: window.innerWidth, height: window.innerHeight }
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
camera.position.y = 1
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)

const time = new THREE.Timer()
const tick = () => {
  time.update()

  const elaspedTime = time.getElapsed()

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
} 
tick()