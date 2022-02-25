const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOpts) {
    super(arrowOpts)
    this.direction = arrowOpts['direction'];
    this.rotation = this.getRotation();
    this.pos = arrowOpts['pos'];
    this.vel = arrowOpts['vel'];
    this.img;
    this.receptor = false;
  }

  draw(ctx) {
    let img = new Image();
    let rotation = this.rotation;
    let [x, y] = this.pos
    let scale = .25;

    img.addEventListener('load', function() {
      ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
      ctx.rotate(rotation);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    })
    img.src = this.imgUrl;
  }

  getRotation() {
    const pi = Math.PI;
    switch (this.direction) {
      case 'left':
        return pi / 2
      case 'down':
        return 0
      case 'up':
        return pi
      case 'right':
        return pi * 1.5
    }
  }
}

module.exports = Arrow;