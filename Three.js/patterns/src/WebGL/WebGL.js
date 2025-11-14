import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from '../World/World'

export default class WebGL 
{
  constructor(canvas) 
  {

    // Global access
    window.webgl = this

    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Events
    this.sizes.on('resize', () => 
    {
      this.resize()
    }) 
  
    this.time.on('tick', () => 
    {
      this.update()
    })
  
  }

  resize()
  {
    this.camera.resize()
    this.renderer.resize()
  } 

  update() 
  {
    this.camera.update()
    this.renderer.update()
  }
}