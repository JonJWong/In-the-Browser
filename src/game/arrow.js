const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOptions) {
    super(arrowOptions)
    this.direction = arrowOptions['direction'];
    this.receptor = false;
    this.pos = arrowOptions['pos'];
    this.img;
  }

  draw(ctx, rotation) {
    let img = new Image();
    let scale = .3;
    let [x, y] = this.pos
    img.addEventListener('load', function() {
      ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
      ctx.rotate(rotation);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    })
    img.src = this.imgUrl;
  }

  rotate() {
    switch (this.dir) {
      case 'left':

      case 'down':

      case 'up':

      case 'right':
    }
  }
}

module.exports = Arrow;