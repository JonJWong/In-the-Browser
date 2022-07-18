const ARROW_GAP = 103;

class Arrow {
  constructor(arrowOpts) {
    this.imgUrl = arrowOpts.imgUrl;
    this.img = new Image();
    this.img.src = this.imgUrl;
    
    this.direction = arrowOpts.direction;
    this.rotation = this.getRotation();
    this.pos = arrowOpts.position;
    this.scale = .35;
    this.size = 268 * this.scale;
    this.setHorizPos();
    // even though velocity has 2 nums, we'll only be using the Y since arrows
    // will only be moving upwards
    this.velocity = arrowOpts.velocity || [0, 0];

    this.isAMine = arrowOpts.isAMine || false;
    this.isATarget = arrowOpts.target || false;
  }

  setHorizPos() {
    if (this.direction === 'left') this.pos[0] += (ARROW_GAP * 0);
    if (this.direction === 'down') this.pos[0] += ARROW_GAP;
    if (this.direction === 'up') this.pos[0] += (ARROW_GAP * 2);
    if (this.direction === 'right') this.pos[0] += (ARROW_GAP * 3);
  }
  
  // This is hard-coded for 4 panels. need to refactor to make scalable
  render(ctx) {
    if (this.isAMine) {
      this.rotation += .1
    }
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
    if (this.direction === 'left') return Math.PI * 0.5;
    if (this.direction === 'down') return Math.PI * 0;
    if (this.direction === 'up') return Math.PI;
    if (this.direction === 'right') return Math.PI * 1.5;
  }

  getDistance(otherArrow) {
    return otherArrow.pos[1] - this.pos[1];
  }
}

module.exports = Arrow;