const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOpts) {
    super(arrowOpts); // IMAGE URL IS HERE
    this.game = arrowOpts['game'];
    
    this.direction = arrowOpts['direction'];
    this.rotation = this.getRotation();
    this.pos = arrowOpts['position'];
    this.scale = .35;
    this.size = 268 * this.scale;
    this.setHorizPos();
    // even though velocity has 2 nums, we'll only be using the Y since arrows
    // will only be moving upwards
    this.velocity = arrowOpts['velocity'] || [0, 0];

    this.img = new Image();
    this.img.src = this.imgUrl;

    this.isATarget = arrowOpts['target'] || false;
    this.quantization;
  }

  setHorizPos() {
    const startPos = this.pos[0];
    const gap = 103;
    switch(this.direction) {
      case 'left':
        this.pos[0] = startPos + (gap * 0);
        break;
      case 'down':
        this.pos[0] = startPos + (gap * 1);
        break;
      case 'up':
        this.pos[0] = startPos + (gap * 2);
        break;
      case 'right':
        this.pos[0] = startPos + (gap * 3);
        break;
    }
  }
  
  // This is hard-coded for 4 panels. need to refactor to make scalable
  render(ctx) {
    // let scale = this.scale;
    // let [x, y] = this.pos;
    // let rotation = this.rotation;
    // let img = this.img;

    ctx.setTransform(this.scale, 0, 0, this.scale, this.pos[0], this.pos[1]);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2)
    ctx.setTransform(1,0,0,1,0,0)
  }

  move() {
    const [x, y] = this.pos;
    const [a, b] = this.velocity;
    this.pos = [x + a, y + b];
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  getRotation() {
    switch (this.direction) {
      case 'left':
        return Math.PI * 0.5
      case 'down':
        return Math.PI * 0
      case 'up':
        return Math.PI * 1
      case 'right':
        return Math.PI * 1.5
    }
  }

  getDistance(otherArrow) {
    let ourY = this.pos[1];
    let theirY = otherArrow.pos[1];
    return theirY - ourY
  }

  setQuantization(quantization) {
    this.quantization = quantization;
  }

  colorPicker() {
    let color = "";
    switch (this.quantization) {
      case 4:

      case 8:

      case 16:

      case 32:

    }
  }
}

module.exports = Arrow;