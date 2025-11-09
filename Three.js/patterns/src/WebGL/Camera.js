import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default class Camera
{
  constructor()
  {
    this.webgl = window.webgl
    this.sizes = this.webgl.sizes
    this.scene = this.webgl.scene
    this.canvas = this.webgl.canvas

    this.setInstance()
  }

  setInstance()
  {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
  }

  setControls()
  {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize()
  {
    this.instance.aspect = this.sizes.width /this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update()
  {
    this.controls.update()
  }
}