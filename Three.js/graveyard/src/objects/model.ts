
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { scene } from '../renderer';

const loader = new GLTFLoader();
loader.load(
  '/public/models/samand.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(2,2,2)
    scene.add(model)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); 
  },
  (error) => {
    console.error('An error occurred loading the GLB:', error);
  }
);
