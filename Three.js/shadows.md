Only `directionalLight`, `spotLight`, `point Light` support shadow
40
### core shadows: 
The dark shadow at the back of the object 

### drop shadow:
a real-time shadow that an object casts onto a surface

### Activate shadow:
1. `renderer.shadowMap.enabled = true`
2. `object.castShadow = true` - `object.recieveShadow = true`
3. `light.castShadow = true`

- enable `shadow map` on renderer
- give `cast shadow` to the ur object and `recieve shadow` to the surface
- also give lights `cast shadow`

### shadow map optimization:
- shadow map has width and height
- u can increase shadow quality by increasing those properties on the `light`:  
`light.shadow.mapSize.width = 1024` (this heavily impacts performance)   
`light.shadow.mapSize.height = 1024`
- use `light.shadow.camera` inside `cameraHelper` class for debug
- u can change `near` and `far` properties from `light.shadow.camera` to optimize shadow
- u can change `amplitude(top/right/bottom/left)` to have a better render because rendered scene is smaller 
- u can have a blur effect by tweaking `light.shadow.radius`

### shadow map algorithms:
- <b>THREE.BasicShadowMap:</b> very perfomant but lousy quality 
- <b>THREE.PCFShadowMap:</b> less performant but smoother edges (default)
- <b>THREE.PCFSoftShadowMap:</b> less performant but even softer edges (radius doesnt work)
- <b>THREE.VSMShadowMap:</b> less performant more constraits, unexpected results

<b>usage:</b> `renderer.shadowMap.type = THREE.BasicShadowMap`


