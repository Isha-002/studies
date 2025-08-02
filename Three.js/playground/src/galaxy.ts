import * as THREE from 'three';



export const parameters = {
  count: 5000,
  size: 0.02,
  radius: 100,
  branches: 4,
  spin: 0.02,
  randomness: 1,
  randomnessPower: 2,
  insideColor: '#ff6030',
  outsideColor: '#1b3984'
}
// i love ts
type Point = THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.PointsMaterial, THREE.Object3DEventMap>
let geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> | null = null
let material: THREE.PointsMaterial | null = null
let points: Point | null = null


export const generateGalaxy = (scene: THREE.Scene) => {

  if (points !== null) {
    geometry?.dispose()
    material?.dispose()
    scene.remove(points)
  }


  console.log('Generating galaxy:', parameters);
  ///////////////////////////////////////////////////////////////////
  // geometry
  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for(let i = 0; i < parameters.count; i++) {
    ///////////////////////////////////////////////////////////////////
    // positions
    const i3 = i * 3

    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = 0 + randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    ///////////////////////////////////////////////////////////////////
    // colors
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b

  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )

  geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
  )


  ///////////////////////////////////////////////////////////////////
  // material
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  })

  ///////////////////////////////////////////////////////////////////
  // mesh
  points = new THREE.Points(geometry, material)
  return points
}