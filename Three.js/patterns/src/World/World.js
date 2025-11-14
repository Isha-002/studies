import * as THREE from 'three'
import planeVertex from '../Shader/plane.vert'
import planeFragment from '../Shader/plane.frag'
export default class World 
{
  constructor()
  {
    this.webgl = window.webgl
    this.scene = this.webgl.scene


    const testMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1,1),
      new THREE.RawShaderMaterial({ 
        vertexShader: planeVertex, 
        fragmentShader: planeFragment, 
        side: THREE.DoubleSide
      }))
    console.log(testMesh.geometry.attributes)
    this.scene.add(testMesh)
  }
}