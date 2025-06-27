1. first you need to import three.js:  
`import * as THREE from 'three'`

2. create a scene:  
`const scene = new THREE.Scene()`

3. create an object:  
`const geometry = new THREE.BoxGeometry(1,1,1)`  
`const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })`  
`const mesh = new THREE.Mesh(geometry, material)`  

4. add object to the scene:  
`scene.add(mesh)`

5. add camera:  
`const size = { width: 600, height: 800 }`  
`const camera = new THREE.PerspectiveCamera(75, size.width / size.height)`  
`camera.position.z = 3`  
`scene.add(camera)`  

6. create a renderer:  
`const canvas = document.createElement('canvas')`  
`document.body.appendChild(canvas)`  
`const renderer = new THREE.WebGLRenderer({ canvas })`  
`renderer.setSize(size.width, size.height)`  
`renderer.render(scene, camera)`
