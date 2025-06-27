## Practices for canvas resizing:

<pre>
const size = { 
  width: window.innerWidth, 
  height: window.innerHeight, 
}
</pre>

## CSS Configuration:

<pre>
* {
  margin: 0;
  padding: 0;
}

// for full screen canvases
html, body {
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</pre>

## Handle Resize

<pre>
window.addEventListener('resize', () => {

    // update size
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    // in case of screen change pixel ratio will update 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // update camera (because aspect ratio changes)
    camera.aspect = size.width / size.height;

    // let three.js know it has to update
    camera.updateProjectionMatrix()

    // update canvas
    renderer.setSize(size.width, size.height)
});
</pre>

### we can add full screen mode functionality by using an event:
<pre>
  const fullscreenElement = document.fullscreenElement || document.webkitfullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {

    }
    
  } else {
    document.exitFullscreen()
  }
</pre>