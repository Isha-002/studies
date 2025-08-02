
import * as THREE from 'three'


export const textureLoader = new THREE.TextureLoader()

const loader = (path: string, repeat: number, srgb?: boolean) => {
  const texture = textureLoader.load(path)
  srgb ? texture.colorSpace = THREE.SRGBColorSpace : null
  texture.repeat.set(repeat,repeat)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

// floor textures
// DX normal map wont work, careful
export const floorAlphaTexture = textureLoader.load('/textures/floor/alpha.jpg')
export const floorColorTexture = loader('/textures/floor/grass_diff.jpg', 4, true)
export const floorARMTexture = loader('/textures/floor/grass_arm.jpg',4)
export const floorDisplacementTexture = loader('/textures/floor/grass_disp.jpg',4)
export const floorNormalTexture = loader('/textures/floor/grass_nor_gl.jpg',4)

// wall textures
export const wallColorTexture = loader('/textures/wall/wall_diff.jpg', 1, true)
export const wallARMTexture = loader('/textures/wall/wall_arm.jpg',1)
export const wallDisplacementTexture = loader('/textures/wall/wall_dis.jpg',1)
export const wallNormalTexture = loader('/textures/wall/wall_nor_gl.jpg',1)
export const wallRoughnessTexture = loader('/textures/wall/wall_rough.jpg',1)
