import { GUI } from 'lil-gui';
import { Camera } from 'three';




export function setup_debug(camera: Camera, gui: GUI) {

  gui.close()
  const camera_position = gui.addFolder('Camera Position');
  camera_position.add(camera.position, 'x', -30, 30, 0.1);
  camera_position.add(camera.position, 'y', -30, 30, 0.1);

  const camera_rotation = gui.addFolder('Camera Rotation');
  camera_rotation.add(camera.rotation, 'x', -3.14, 3.14, 0.001);
  camera_rotation.add(camera.rotation, 'y', -3.14, 3.14, 0.001);
  camera_rotation.add(camera.rotation, 'z', -3.14, 3.14, 0.001);
}
