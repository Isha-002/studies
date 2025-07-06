import * as THREE from 'three';
import { loading_Manager } from './loading';


const texture_Loader = new THREE.TextureLoader(loading_Manager)

// only use for colored textures
export function srgb_loader(path) {
  const texture = texture_Loader.load(path)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.magFilter = THREE.NearestFilter
  return texture
}



// solar system:
// sun - mercury - venus - earth - mars - jupiter - saturn - uranus - neptune
// textures in order:

export const sun_texture = srgb_loader('/planet/2k_sun.jpg')
//
export const mercury_texture = srgb_loader('/planet/2k_mercury.jpg')
//
export const venus_texture = srgb_loader('/planet/2k_venus_surface.jpg')
export const venus_atmosphere_texture = srgb_loader('/planet/2k_venus_atmosphere.jpg')
//
export const earth_texture = srgb_loader('/planet/2k_earth_daymap.jpg')
export const earth_clouds_texture = srgb_loader('/planet/2k_earth_clouds.jpg')
export const earth_normal_texture = texture_Loader.load('/planet/2k_earth_normal_map.tif')
//
export const moon_texture = srgb_loader('/planet/2k_moon.jpg')
//
export const mars_texture = srgb_loader('/planet/2k_mars.jpg')
//
export const jupiter_texture = srgb_loader('/planet/2k_jupiter.jpg')
//
export const saturn_texture = srgb_loader('/planet/2k_saturn.jpg')
export const saturn_alpha_texture = srgb_loader('/planet/2k_saturn_ring_alpha.png')
//
export const uranus_texture = srgb_loader('/planet/2k_uranus.jpg')
//
export const neptune_texture = srgb_loader('/planet/2k_neptune.jpg')


const textures = {
  srgb_loader,
  //
  sun_texture,
  mercury_texture,
  venus_texture,
  venus_atmosphere_texture,
  earth_texture,
  earth_clouds_texture,
  earth_normal_texture,
  moon_texture,
  mars_texture,
  jupiter_texture,
  saturn_texture,
  saturn_alpha_texture,
  uranus_texture,
  neptune_texture,
};

export default textures;
