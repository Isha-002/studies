GLSL: OpenGL shading language

### Types of shaders:
- vertex shader: position vertices on the render
- fragment shader: color each visible fragment of geometry - executed after vertex shader

### Keywords:
- attributes: the data that will be different for each vertex (cant send to fragment)
- uniforms: the data that will be same for every vertices (can be used in uniforms & vertex shader)
- varying: the data we send from vertex to fragment shader - the values get interpolated between vertices

---
In `RawShaderMaterial`, `alphaMap`, `map`, `color` wont work!

- `projectionMatrix:` transform the coordinates into  clip space coordinates
- `viewMatrix:` apply transformation for `position`, `rotation`, `fov`, `near`, `far` of the camera
- `modelMatrix:` apply transformation for `position`, `rotation`, `scale` of the Mesh

- `texture2D()` returns a `vec4`