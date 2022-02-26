const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOpts) {
    super(arrowOpts)
    this.direction = arrowOpts['direction'];
    this.rotation = this.getRotation();
    this.pos = [50, 50];
    this.setHorizPos();
    this.vel = arrowOpts['vel'];
    this.scale = .25;
    this.size = 268 * this.scale;
    this.img;
    this.receptor = arrowOpts['receptor'] || false;
  }

  setHorizPos() {
    let start = 50;
    let gap = 75;
    switch(this.direction) {
      case 'left':
        this.pos[0] = start;
        break;
      case 'down':
        this.pos[0] = start + gap;
        break;
      case 'up':
        this.pos[0] = start + (gap * 2);
        break;
      case 'right':
        this.pos[0] = start + (gap * 3);
        break;
    }
  }

  // This is hard-coded for 4 panels. need to refactor to make scalable
  draw(ctx) {
    let img = new Image();
    let rotation = this.rotation;
    let [x, y] = this.pos
    let scale = this.scale;

    img.addEventListener('load', function() {
      ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
      ctx.rotate(rotation);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    })
    img.src = this.imgUrl;
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
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

  getDistance(otherArrow) {
    let [ourX, ourY] = this.pos;
    let [theirX, theirY] = otherArrow.pos;
    return theirY - ourY
  }
}

module.exports = Arrow;