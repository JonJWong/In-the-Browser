const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOpts) {
    super(arrowOpts);
    this.game = arrowOpts['game'];
    this.direction = arrowOpts['direction'];
    this.rotation = this.getRotation();
    this.pos = [50, 50];
    this.setHorizPos();
    // even though velocity has 2 nums, we'll only be using the Y since arrows
    // will only be moving upwards
    this.velocity = arrowOpts['velocity'] || [0, 0];
    this.scale = .25;
    this.size = 268 * this.scale;
    this.img;
    this.isATarget = arrowOpts['target'] || false;
  }

  setHorizPos() {
    let start = this.pos[0];
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
    let [x, y] = this.pos;
    let scale = this.scale;

    // make sure that the image is loaded before trying to draw it
    img.addEventListener('load', function() {
      ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
      ctx.rotate(rotation);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    })
    img.src = this.imgUrl;
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  getRotation() {
    switch (this.direction) {
      case 'left':
        return Math.PI / 2
      case 'down':
        return 0
      case 'up':
        return Math.PI
      case 'right':
        return Math.PI * 1.5
    }
  }

  getDistance(otherArrow) {
    let ourY = this.pos[1];
    let theirY = otherArrow.pos[1];
    return theirY - ourY
  }
}

module.exports = Arrow;