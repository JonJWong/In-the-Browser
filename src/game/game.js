const Arrow = require('./arrow.js');
const Target = require('./target.js');
const Options = require('./options.js');

class Game {
  constructor(gameOpts) {
    this.score = 0;
    this.maxScore = gameOpts['numNotes'] * 5;
    this.targets = new Target(gameOpts['numTargets']);
    this.arrows = [];
    this.targets = new Target(4);
    this.speed = gameOpts['speed']; // arrow velocity
  }

  addArrow(arrowDirection) {
    let opts = Options.arrowOpts();
    opts['direction'] = arrowDirection;
    opts['velocity'] = [0, -this.speed];
    let newArrow = new Arrow(opts);
    this.arrows.push(newArrow);
  }

  isOutOfBounds(pos) {
    let [x, y] = pos;
    return (x > 1000 || y > 1000 || x < 0 || y < 0)
  }

  drawArrows(ctx) {
    ctx.clearRect(0, 0, 1000, 1000);
    this.targets.targets.concat(this.arrows).forEach(arrow =>{
      arrow.render(ctx);
    })
  }

  step() {
    this.moveArrows();
  }

  moveArrows() {
    this.arrows.forEach(arrow => arrow.move())
  }

  startMoving() {
    setInterval(() => {
      this.step();
      this.drawArrows(ctx);
    }, 20)
  }
}

module.exports = Game;