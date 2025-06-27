All different kinds of camera inherit from `camera` class  

1. `Array camera:` render scene from multiple cameras on specific areas of render
2. `Stereo camera:` render the scene through two cameras that mimic the eyes to create parallax effect (VR headset / red-blue glasses)
3. `Cube camera:` do 6 renders each facing a different direction (reflection / environment map / shadow map)
4. `Orthographic camera:` render the scene without perspective
5. `Perspective camera:` renders the scene with perspective

### Arguments (perspective camera):
1. field of view (fov) - in degrees 
2. Aspect ratio
3. near (dont put extreme values like 0.0001 and 99999 for near and far to prevent z-fighting)
4. far (0.1, 100 are decent values)

### Arguments (orthographic camera):
1. left (this camera may change the obj shape depending on the canvas)
2. right (to prevent that multiply `left` and `right` in `aspect ratio`)
3. top
4. bottom (-1,1,1,-1)
5. near 
6. far