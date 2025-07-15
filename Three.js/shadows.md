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
- 