import { GUI } from 'lil-gui';
import { Camera, Scene } from 'three';
import { generateGalaxy, parameters } from './galaxy';

export function setup_debug(camera: Camera, gui: GUI, scene: Scene) {
  gui.close();
  const camera_position = gui.addFolder('Camera Position');
  camera_position.add(camera.position, 'x', -30, 30, 0.1);
  camera_position.add(camera.position, 'y', -30, 30, 0.1);
  // camera_position.hide();
  // rotation wont work when u have orbit controls
  const camera_rotation = gui.addFolder('Camera Rotation');
  camera_rotation.add(camera.rotation, 'x', -3.14, 3.14, 0.001);
  camera_rotation.add(camera.rotation, 'y', -3.14, 3.14, 0.001);
  camera_rotation.add(camera.rotation, 'z', -3.14, 3.14, 0.001);
  // camera_rotation.hide();

  const galaxy = gui.addFolder('Galaxy');
  // u can use onFinishChange instead but we use these tweaks only in development, so i dont see a point
  galaxy.add(parameters, 'count', 100, 1000000, 100).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
  galaxy.add(parameters, 'size', 0.01, 10, 0.001).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
  galaxy.add(parameters, 'radius', 20, 200, 1).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
  galaxy.add(parameters, 'branches', 3, 15, 1).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
  galaxy.add(parameters, 'spin', -1, 1, 0.0001).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
  galaxy.add(parameters, 'randomness', 0, 5, 0.01).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
  galaxy.add(parameters, 'randomnessPower', 1, 4, 1).onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });

  galaxy.addColor(parameters, 'insideColor').onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
    galaxy.addColor(parameters, 'outsideColor').onChange(() => {
    const galaxyPoints = generateGalaxy(scene);
    scene.add(galaxyPoints);
  });
}
