import { Timer } from 'three/examples/jsm/Addons.js';
import { generatePlain } from './plain';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import GUI from 'lil-gui';
import { generateGalaxy } from './galaxy';

import gsap from 'gsap';

import {
  cloud_mesh,
  earth,
  earth_group,
  earth_orbit,
  jupiter,
  jupiter_group,
  jupiter_orbit,
  mars,
  mars_group,
  mars_orbit,
  mercury,
  mercury_group,
  mercury_orbit,
  moon,
  moon_group,
  moon_orbit,
  neptune,
  neptune_group,
  neptune_orbit,
  saturn,
  saturn_group,
  saturn_orbit,
  saturn_ring,
  sun,
  uranus,
  uranus_group,
  uranus_orbit,
  venus,
  venus_atmosphere,
  venus_group,
  venus_orbit,
} from './meshes';
import { setup_debug } from './debug';
import { tick } from './tick';
import { ambient_light, point_light } from './lights';
import {
  galaxy_particles,
  inner_particles,
  outer_particles,
} from './particles';
import { planetDesc, sideKeys, switchKeys } from './components';

// global variables

// Getter/Setter functions: get → runs when we read the property - set → runs when we write to the property
let isMobile = {
  _value: window.innerWidth <= 1000 ? true : false,
  set value(newValue: boolean) {
    if (this._value !== newValue) {
    switchKeys(currentPlanet, isPersian, newValue)
    planetDesc(currentPlanet, isPersian, newValue)
    sideKeys(isPersian, newValue)
    }
    this._value = newValue
  },
  get value() {
    return this._value;
  }
}
let isPersian = false 
let currentPlanet = 0
const solar_objects = [
  { obj: sun,       zoom: 0.3, mobileZoom: 0.4  },
  { obj: mercury,   zoom: 2,   mobileZoom: 0.8  },
  { obj: venus,     zoom: 2,   mobileZoom: 1  },
  { obj: earth,     zoom: 2,   mobileZoom: 0.7  },
  { obj: moon,      zoom: 5,   mobileZoom: 3  },
  { obj: mars,      zoom: 2,   mobileZoom: 1.5  },
  { obj: jupiter,   zoom: 1,   mobileZoom: 0.7  },
  { obj: saturn,    zoom: 4,   mobileZoom: 0.6  },
  { obj: uranus,    zoom: 3,   mobileZoom: 1  },
  { obj: neptune,   zoom: 3,   mobileZoom: 1  }
];




// global variables
// ui initialization
switchKeys(currentPlanet, isPersian, isMobile.value)
planetDesc(currentPlanet, isPersian, isMobile.value)
sideKeys(isPersian, isMobile.value)
// initialization functions





export const scene = new THREE.Scene();
const canvas = document.createElement('canvas');
canvas.classList.add('webgl');

document.querySelector(".container")?.appendChild(canvas);

// debug
// note: with lil-gui you can only change properties of objects
const gui = new GUI();
gui.show(false)

const debugObj = {};

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
});

const font_loader = new FontLoader();
font_loader.load('/fonts/typeface.json', (font) => {
  console.log('font loaded');
  const text_geometry = new TextGeometry('hello three.js', {
    font,
    size: 0.5,
    depth: 0.1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.13,
    bevelSize: 0.02,
    bevelOffset: 0.02,
    bevelSegments: 4,
  });
  text_geometry.center();
  const text_material = new THREE.MeshNormalMaterial({
    wireframe: false,
  });
  const text = new THREE.Mesh(text_geometry, text_material);
  // scene.add(text)
});

// camera
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// export const camera = new THREE.PerspectiveCamera(50, size.width / size.height);
const camera_view = 5;

export const camera = new THREE.OrthographicCamera(
  (-camera_view * size.width) / size.height,
  (camera_view * size.width) / size.height,
  camera_view,
  -camera_view,
);


// camera.position.set(-100, 80, 200);
// camera.position.set(0, 40, 40);


scene.add(camera);

// camera helper
const cameraHelper = new THREE.CameraHelper(camera);

scene.add(cameraHelper);


///////////////////////////////////////////////////////////////////
// orbit
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.minZoom = 0.05;
// max zoom is set to be optimal for sun view it will change for other planets
controls.maxZoom = 0.75;
// limit camera from top
// controls.minPolarAngle = Math.PI / 4;
// limit camera from down
// controls.maxPolarAngle = Math.PI / 2.3;
controls.enableRotate = false;
controls.enablePan = false;
controls.enabled = true
///////////////////////////////////////////////////////////////////



// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
export const cursor = {
  x: 0,
  y: 0,
};
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
// needed for HDR rendering
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const clock = new Timer();

// animation
const animate = () => {
  tick(clock, controls, renderer, scene, camera, cursor, solar_objects[currentPlanet]);
  requestAnimationFrame(animate);
};

animate();

// cursor
window.addEventListener('mousemove', (e) => {
  // we want the value to first be only in 0 to 1 range
  // then we add - 0.5 to go from 0.5 to -0.5
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);

  // console.log(cursor.x, cursor.y);
});

// resize handle
window.addEventListener('resize', () => {
  // update size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // in case of screen change pixel ratio will update
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // update camera (because aspect ratio changes)
  // camera.aspect = size.width / size.height;

  camera.left = (-camera_view * size.width) / size.height;
  camera.right = (camera_view * size.width) / size.height;
  camera.top = camera_view;
  camera.bottom = -camera_view;

  // let three.js know it has to update
  camera.updateProjectionMatrix();

  // update canvas
  renderer.setSize(size.width, size.height);


  isMobile.value = window.innerWidth <= 1000 ? true : false
});

// const rgbe_l2oader = new RGBELoader().load('/twilight_sunset_1k.hdr', (envMap) => {
//   envMap.mapping = THREE.EquirectangularReflectionMapping
//   scene.background = envMap
//   scene.environment = envMap // This makes materials reflect the environment

//   renderer.render(scene, camera)
// })

// moire patterns
// basis compresion for images

setup_debug(camera, gui, scene);

const solar_system_group = new THREE.Group();
solar_system_group.add(
  // planets
  sun,
  mercury_group,
  venus_group,
  earth_group,
  moon_group,
  mars_group,
  jupiter_group,
  saturn_group,
  uranus_group,
  neptune_group,
  // orbits
  mercury_orbit,
  venus_orbit,
  earth_orbit,
  moon_orbit,
  mars_orbit,
  jupiter_orbit,
  saturn_orbit,
  uranus_orbit,
  neptune_orbit,
  // particles
  inner_particles,
  outer_particles,
  galaxy_particles
);


const galaxy = generateGalaxy(scene)
// const plain = generatePlain(scene)

scene.add(
  // galaxy,
  solar_system_group,
  // lights 
  ambient_light,
  point_light
);








// handling ui visibility
let visible = true
const visible_button = document.getElementById("/icons/visibility.png")
const invisIcon = "/icons/invis.png"
const visibleIcon = "/icons/visibility.png"

// placing ui variable outside the event listener doesnt work cuz its always null
visible_button?.addEventListener("click", () => {
  const ui = document.querySelector(".planet-desc") as HTMLElement | null
  const sideKeys = document.querySelector(".sidekeys-container") as HTMLElement | null
  sideKeys?.classList.toggle("hide")
  ui?.classList.toggle("hide")
  visible = !visible

  gsap.fromTo(
    visible_button, 
    { scale: 0.8 }, 
    { scale: 1, duration: 0.6, ease: "elastic" }
  );
})

visible_button?.addEventListener("click", () => {
  if (visible) {
    visible_button?.setAttribute('src', visibleIcon)
    visible_button.style.scale = "0.66"
  }  
  if (!visible) {
    visible_button?.setAttribute('src', invisIcon)
    visible_button.style.scale = "0.6"
  }
})

// handling next/prev planet buttons 
const next_button = document.getElementById("/icons/right.svg");
const prev_button = document.getElementById("/icons/left.svg");

function updateButtons() {
  if (currentPlanet <= 0) {
    prev_button?.classList.add("disabled");
  } else {
    prev_button?.classList.remove("disabled");
  }

  if (currentPlanet >= solar_objects.length - 1) {
    next_button?.classList.add("disabled");
  } else {
    next_button?.classList.remove("disabled");
  }
}

function updateCameraZoom(zoom: number) {
  camera.zoom = zoom;
  camera.updateProjectionMatrix();
  if (solar_objects[currentPlanet].obj === sun) {
  controls.maxZoom = 0.75
  } else {
    controls.maxZoom = 1.75
  }
}

next_button?.addEventListener("click", () => {
  if (currentPlanet < solar_objects.length - 1) {
    // be very careful with this planetDesc() function 
    // if u use it before changin current planet it results in strange behaviour
    currentPlanet += 1
    planetDesc(currentPlanet, isPersian, isMobile.value)
    updateButtons();
    const initialZoomUpdate = isMobile ? solar_objects[currentPlanet].mobileZoom : solar_objects[currentPlanet].zoom
    updateCameraZoom(initialZoomUpdate)
  }
});

prev_button?.addEventListener("click", () => {
  if (currentPlanet > 0) {
    // be very careful with this planetDesc() function 
    // if u use it before changin current planet it results in strange behaviour
    currentPlanet -= 1;
    planetDesc(currentPlanet, isPersian, isMobile.value)
    updateButtons();
    const initialZoomUpdate = isMobile ? solar_objects[currentPlanet].mobileZoom : solar_objects[currentPlanet].zoom
    updateCameraZoom(initialZoomUpdate)
  }
});

// run once only - this function must be called after u set listeners for ui buttons (next/prev)
updateButtons();
// we use this function here to set the initial zoom when user loads in first
const initialZoomUpdate = isMobile ? solar_objects[currentPlanet].mobileZoom : solar_objects[currentPlanet].zoom
updateCameraZoom(initialZoomUpdate)



// handling language change
const languageBtn = document.getElementById("changeLanguage")
languageBtn?.addEventListener('click', () => {
  isPersian = !isPersian
  sideKeys(isPersian, isMobile.value)
  planetDesc(currentPlanet, isPersian, isMobile.value);
})

// handle solar system sidekey
const solarSidekey = document.getElementById("/icons/orbit.png");
let zoomToggled = false
solarSidekey?.addEventListener('click', () => {
  if (!zoomToggled) {
    updateCameraZoom(0.05); 
  } else {
    const initialZoomUpdate = isMobile ? solar_objects[currentPlanet].mobileZoom : solar_objects[currentPlanet].zoom
    updateCameraZoom(initialZoomUpdate)
  }
  zoomToggled = !zoomToggled; 
})


// KNOWN bugs:
// 1. when reach breakpoints we recreate components and this causes the listeners to be removed but not created again - im too lazy to fix this because i have to rewrite all of this code using classes so i may wait for 
