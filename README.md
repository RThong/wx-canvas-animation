# wx-canvas-animation
微信小程序canvas下雨下雪效果

# 调用方式

``` 
<!-- wxml  -->
<canvas canvas-id="rainCanvas" id="canvas1"></canvas>
<canvas canvas-id="snowCanvas" id="canvas2"></canvas>


<!-- js  -->
new DropAnimation({
  el: '#canvas1',
  ctx: wx.createCanvasContext('rainCanvas'),
  speed: 4,
  color: '#cccccc',
  type: 'rain',
  count: 10
})

new DropAnimation({
  el: '#canvas2',
  ctx: wx.createCanvasContext('snowCanvas'),
  speed: 1,
  color: '#cccccc',
  type: 'snow',
  count: 15
})
```
