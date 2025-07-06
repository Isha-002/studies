# `THREE.MeshBasicMaterial`

`MeshBasicMaterial` is the simplest material in Three.js.

- **Unlit**: It does **not react to lights**. Colors and textures appear exactly as set.
- **Fast**: Great for performance — no lighting calculations.
- **Use Cases**: UI elements, overlays, skyboxes, 2D-like graphics.

## Key Options

```js
new THREE.MeshBasicMaterial({
  color: 0xffffff,       // Flat color
  map: texture,          // Color texture
  wireframe: false,      // Render as wireframe
  transparent: true,     // Enable alpha blending
  opacity: 0.5,          // Set opacity (requires transparent: true)
  alphaTest: 0.5,        // Discard pixels below alpha value
})
```
<br><br><br>

# `THREE.MeshNormalMaterial`

`MeshNormalMaterial` colors the surface based on the direction of its normals.

- **Unlit**: Ignores lights, uses normal vectors for color.
- **Purpose**: Debugging geometry, visualizing surface orientation.
- **Color**: Each face is shaded based on its normal direction (RGB = XYZ of the normal).
- You cannot use color `textures(map)` with `THREE.MeshNormalMaterial`

## Key Options

```js
new THREE.MeshNormalMaterial({
  flatShading: false,  // true = flat faces, false = smooth shading
  wireframe: false,    // show as wireframe
  transparent: false,  // enable transparency
  opacity: 1.0         // set opacity if transparent
})
```
<br><br><br>

# `THREE.MeshMatcapMaterial`

`MeshMatcapMaterial` uses a **matcap texture** (material capture) to simulate complex lighting and shading.

- **Unlit**: Ignores lights in the scene.
- **Fast**: Shading comes from the texture, not real lighting.
- **Use Case**: Stylized materials, sculpting previews, toon shading.

## How It Works

- Uses the **camera-facing normals** to map a texture.
- Gives illusion of depth and lighting using a **prebaked matcap image**.

## Key Options

```js
new THREE.MeshMatcapMaterial({
  matcap: texture,       // Required: a matcap texture
  flatShading: false,    // true = flat faces
  transparent: false,    // enable alpha blending
  opacity: 1.0           // set opacity if transparent
})
```
<br><br><br>

# `THREE.MeshDepthMaterial`

`MeshDepthMaterial` renders the **depth** of each pixel — how far it is from the camera.

- **Unlit**: Ignores lights and colors.
- **Output**: Grayscale — closer = dark, farther = white.
- **Use Case**: Shadow maps, depth-based effects (e.g. fog, blur).
- Doesn't support map, color, or normalMap.
- Often used behind the scenes for shadows and G-buffer generation.

## How It Works

- Encodes the camera distance into color.
- Useful for post-processing or custom shaders.

## Key Options

```js
new THREE.MeshDepthMaterial({
  depthPacking: THREE.BasicDepthPacking, // or RGBADepthPacking
  skinning: false,   // true if using SkinnedMesh
  morphTargets: false // true if using morph targets
})
```
<br><br><br>

# `THREE.MeshLambertMaterial`

`MeshLambertMaterial` is a **light-reactive** material using **Lambertian reflectance** (diffuse lighting - very performant).

- **Lit**: Responds to lights (but no shiny highlights).
- **Cheap**: Fast and good for matte surfaces.
- **Use Case**: Non-shiny, dull objects like cloth, dirt, wood, etc.
- Doesn’t support specular highlights (use MeshPhongMaterial if needed).
- Good balance between realism and performance.

## Key Options

```js
new THREE.MeshLambertMaterial({
  color: 0xffffff,     // base color
  map: texture,        // diffuse texture
  emissive: 0x000000,  // self-illumination color
  wireframe: false,    // wireframe mode
  transparent: false,  // enable transparency
  opacity: 1.0         // opacity level
})
```
<br><br><br>

# `THREE.MeshPhongMaterial`

`MeshPhongMaterial` is a light-reactive material with **shiny highlights** using **Phong shading**.

- **Lit**: Responds to all light types.
- **Shiny**: Supports specular highlights (glossy surfaces).
- **Use Case**: Metals, plastics, polished surfaces.
- Slower than MeshLambertMaterial (due to highlights)

## Key Options

```js
new THREE.MeshPhongMaterial({
  color: 0xffffff,        // base color
  specular: 0x111111,     // highlight color
  shininess: 30,          // highlight sharpness
  map: texture,           // diffuse texture
  normalMap: normalTex,   // for surface detail
  emissive: 0x000000,     // self-lighting
  transparent: false,     
  opacity: 1.0
})
```
<br><br><br>

# `THREE.MeshToonMaterial`

`MeshToonMaterial` creates a **cartoon-like** (flat-shaded) look using simple lighting.

- **Lit**: Reacts to lights.
- **Stylized**: Gives a “cel-shaded” effect.
- **Use Case**: Comics, anime, cartoons, stylized games.
- Uses lights + a gradient map to simulate stepped shading.
- Without `gradientMap`, defaults to smooth toon shading.

## Key Options

```js
// if you are using a gradient map - you must change texture 
// minFilter - magFilter - generateMipmaps
// in order to get the stepping effect on texture:

// gradient_texure.minFilter = THREE.NearestFilter
// gradient_texure.magFilter = THREE.NearestFilter
// gradient_texure.generateMipmaps = false
new THREE.MeshToonMaterial({
  color: 0xffffff,         // base color
  gradientMap: texture,    // optional: controls shading steps
  map: texture,            // diffuse texture
  normalMap: normalTex,    // surface detail
  transparent: false,
  opacity: 1.0
})
```
<br><br><br>

# `THREE.MeshStandardMaterial`

`MeshStandardMaterial` is a **physically based rendering (PBR)** material that simulates real-world surfaces using **metalness-roughness** workflow.

- Supports **lights**, **shadows**, **textures**, and **reflections**.
- Reacts to **environment maps** and **light probes**.
- Great balance between performance and realism.

---

```js
const material = new THREE.MeshStandardMaterial({

  // BASIC COLOR AND PBR
  color: 0xffffff,                  // Base color
  metalness: 0.5,                   // (0 = non-metal, 1 = metal)
  roughness: 0.5,                   // (0 = shiny, 1 = rough)

  // TEXTURE MAPS
  map: null,                        // Base color (albedo) texture
  metalnessMap: null,              // Grayscale texture controlling metalness per pixel
  roughnessMap: null,              // Grayscale texture controlling roughness per pixel
  normalMap: null,                 // RGB normal map (adds bump detail without geometry)
  normalScale: new THREE.Vector2(1, 1), // Scale of normal map
  bumpMap: null,                   // Grayscale bump map (alternative to normalMap)
  bumpScale: 1,                    // Scale for bumpMap displacement
  displacementMap: null,          // Heightmap for real geometry displacement
  displacementScale: 1,           // Strength of displacement
  displacementBias: 0,            // Push/pull displaced geometry

  // AO / SHADOW DETAIL
  aoMap: null,                     // Ambient occlusion map (grayscale)
  aoMapIntensity: 1,              // Intensity of AO effect

  // ENVIRONMENT / REFLECTIONS
  envMap: null,                   // Environment cube map or equirectangular map
  envMapIntensity: 1,            // Strength of reflections from envMap

  // EMISSIVE (self-glow)
  emissive: new THREE.Color(0x000000), // Emissive color (acts like it's glowing)
  emissiveIntensity: 1,          // Strength of emissive glow
  emissiveMap: null,             // Texture for emissive area

  // ALPHA / TRANSPARENCY
  alphaMap: null,                // Grayscale texture controlling opacity per pixel
  transparent: false,            // Set true if u have alpha map
  opacity: 1.0,                  // Global material opacity (0 = fully transparent)

  wireframe: false,             
  wireframeLinewidth: 1,        // Line width (ignored on most platforms)

  // SHADING
  flatShading: false,           // If true, no smooth shading (face normals only)

  // SIDE
  side: THREE.FrontSide,        // Which sides to render: FrontSide, BackSide, DoubleSide

  // DEPTH
  depthTest: true,              // Whether to check against z-buffer
  depthWrite: true,             // Whether to write to z-buffer

  // BLENDING / TRANSPARENCY
  blending: THREE.NormalBlending, // How the material blends with background
  alphaTest: 0,                 // Discard pixels with alpha < this value
  premultipliedAlpha: false,   // If alpha is premultiplied in textures

  // POLYGON OFFSET (useful when layering)
  polygonOffset: false,
  polygonOffsetFactor: 0,
  polygonOffsetUnits: 0,

  // TONE MAPPING / COLOR SPACE
  toneMapped: true,             // Should participate in renderer's tone mapping
  colorWrite: true,             // If false, material doesn’t draw to color buffer

  // FOG SUPPORT
  fog: true,                    // Material affected by scene fog

  // ADVANCED
  defines: undefined,           // Custom shader defines
  userData: {},                 // Custom user data
  visible: true,                // Whether the material is drawn

  // CUSTOM HOOKS
  onBeforeCompile: function (shader) {
    // Optional hook to modify shader code
  }

});
```
<br><br><br>

# MeshPhysicalMaterial

`MeshPhysicalMaterial` extends `MeshStandardMaterial` and is used to simulate real-world materials

