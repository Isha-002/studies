import GUI from 'lil-gui'; 
import { camera } from './camera';


const gui = new GUI();

const cam_folder = gui.addFolder('camera')
cam_folder.add(camera.position, 'x').min(0).max(10).step(0.1).name('position x')
cam_folder.add(camera.position, 'y').min(0).max(10).step(0.1).name('position y')
cam_folder.add(camera.position, 'z').min(0).max(20).step(0.1).name('position z')

// when using orbit controls these guys wont work
cam_folder.add(camera.rotation, 'x', 0, Math.PI * 2, 0.01).name('rotation x');
cam_folder.add(camera.rotation, 'y', 0, Math.PI * 2, 0.01).name('rotation y');
cam_folder.add(camera.rotation, 'z', 0, Math.PI * 2, 0.01).name('rotation z');
