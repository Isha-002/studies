Lights cost a lot when it comes to performance  
### Minimal cost:  
1. AmbientLight
2. HemisphereLight

### Moderate cost:
1. DirectionalLight
2. PointLight

### High cost:
1. SpotLight
2. RectAreaLight


## Light Helpers
Each light has its own helper class  
- rect area light is in example folder  
Example:

<code>
const hemisphere_light_helper =   
new THREE.HemisphereLightHelper(HemisphereLight,0.2)
scene.add(hemisphere_light_helper)
</code>


## Ambient light
Applies omnidirectional lighting:  
<code>
new THREE.AmbientLight(color, intensity)
</code>

## Directional light
Has a sun-like effect as if the sun rays were traveling in parallel   
<code>
new THREE.DirectionalLight(color, intensity)
</code>

## Hemisphere light
Similar to ambient light but you can choose different colors for the light coming from ground and the light coming from sky  
<code>
new THREE.HemisphereLight(color,color, intensity)
</code>

## Point light
A point of light that cast light in every direction  
By default we dont have distance and decay of light  
<code>
new THREE.PointLight(color, intensity)
</code>

## Rect Area light
Works like a big rectangle light   
only works with `MeshStandardMaterial` and `MeshPhysicalMaterial`  
<code>
new THREE.RectAreaLight(color, intensity, width, height)
</code>

## Spot light
Literally flash light   
for this light you have to use `target` property before position and etc in order 
to change those property and the u <b>must</b> add the `SpotLight.target` to the scene  
<code>
new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)
</code>
