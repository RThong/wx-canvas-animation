function DropAnimation(options) {
  this.ctx = options.ctx

  this.speed = options.speed
  this.color = options.color
  this.count = options.count
  this.timer = ''
  this.dropArr = []
  wx.createSelectorQuery().select(options.el).boundingClientRect((res) => {
    this.width = res.width
    this.height = res.height
  }).exec(() => {

    if (options.type == 'rain') {
      this.init(1)
      this.rainAnimation()
    }
    else if (options.type == 'snow') {
      this.init(2)
      this.snowAnimation()
    }

  })

}
//默认偏移角度
DropAnimation.prototype.angel = 15;
DropAnimation.prototype.radian = function () {
  return Math.sin(Math.PI * this.angel / 180);
}
//初始化元素
DropAnimation.prototype.init = function (typeFlag) {
  if (typeFlag == 1) {
    for (let i = 0; i < this.count; i++) {
      this.dropArr.push({
        x: Math.random() * (this.width + this.height * Math.tan(this.radian())),
        y: Math.random() * (-this.height),
        speed: Math.random() * 2 + this.speed,
        length: 20
      })
    }
  }
  else if (typeFlag == 2) {
    for (let i = 0; i < this.count; i++) {
      this.dropArr.push({
        x: Math.random() * (this.width + this.height * Math.tan(this.radian())),
        y: Math.random() * (-this.height),
        speed: Math.random() * 2 + this.speed,
        radius: Math.random() * 3 + 1
      })
    }
  }
}
//下雨动画
DropAnimation.prototype.rainAnimation = function () {
  clearTimeout(this.timer)
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.setLineWidth(1);
  this.ctx.setStrokeStyle(this.color)
  this.dropArr.map((item) => {
    if (item.y > this.height || item.x < 0) {
      item.y = 0
      item.x = Math.random() * (this.width + this.height * Math.tan(this.radian()));
    }
    this.ctx.beginPath()
    this.ctx.moveTo(item.x, item.y)
    this.ctx.lineTo(item.x - item.length * Math.sin(this.radian()), item.y + item.length * Math.cos(this.radian()))

    this.ctx.stroke();
    item.x = item.x - item.speed * Math.sin(this.radian());
    item.y = item.y + item.speed * Math.cos(this.radian());
  })
  this.ctx.draw()

  this.timer = setTimeout(() => {
    this.rainAnimation()
  }, 16)
}
//下雪动画
DropAnimation.prototype.snowAnimation = function () {
  clearTimeout(this.timer)
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.setFillStyle(this.color)
  this.dropArr.map((item) => {
    if (item.y > this.height || item.x < 0) {
      item.y = 0
      item.x = Math.random() * (this.width + this.height * Math.tan(this.radian()));
    }
    this.ctx.beginPath()
    this.ctx.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    item.x = item.x - item.speed * Math.sin(this.radian());
    item.y = item.y + item.speed * Math.cos(this.radian());
  })
  this.ctx.draw()

  this.timer = setTimeout(() => {
    this.snowAnimation()
  }, 16)
}

module.exports = DropAnimation;