
### Get cursor coordination:


```javascript
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (e) => {
  // we want the value to first be only in 0 to 1 range
  // then we add - 0.5 to go from 0.5 to -0.5 
  cursor.x = e.clientX / size.width - 0.5
  cursor.y = e.clientY / size.height - 0.5

})
```