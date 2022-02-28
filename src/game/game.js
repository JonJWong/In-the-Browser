const Arrow = require('./arrow.js');
const Options = require('./options.js');

class Game {
  constructor(gameOpts) {
    this.score = 0;
    // need to change this to come from the chart instead;
    this.maxScore = gameOpts['numNotes'] * 5;
    this.targets = this.addTargets(gameOpts['numTargets']);
    this.arrows = [];
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
    this.targets.concat(this.arrows).forEach(arrow =>{
      arrow.render(ctx);
    })
  }

  step() {
    this.moveArrows();
    // add code here to check for hits later?
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos)) this.removeArrow(arrow);
    })
  }

  removeArrow(arrow) {
    let removeIndex = this.arrows.indexOf(arrow);
    this.arrows.splice(removeIndex, 1);
  }

  checkKeyPress(direction) {
    // target indices 0 => left, 1 => down, 2 => up, 3 => right
    let j;
    switch (direction) {
      case 'left':
        j = 0;
        break;
      case 'down':
        j = 1;
        break;
      case 'up':
        j = 2;
        break;
      case 'right':
        j = 3;
        break;
    }
    for (let i = 0; i < this.arrows.length; i++) {
      const target = this.targets[j];
      
    }
  }

  hitArrow(direction) {

  }

  preloadBg() {
    let img = new Image();
  }

  addTargets(num) {
    const targets = [];
    for (let i = 0; i < num; i++) {
      let target = this.createTarget(i);
      targets.push(target)
    }
    return targets;
  }

  createTarget(i) {
    let targetOpts = Options.targetOpts()
    targetOpts['game'] = this;
    switch (i) {
      case 0:
        targetOpts['direction'] = 'left';
        return new Arrow(targetOpts);
      case 1:
        targetOpts['direction'] = 'down';
        return new Arrow(targetOpts);
      case 2:
        targetOpts['direction'] = 'up';
        return new Arrow(targetOpts);
      case 3:
        targetOpts['direction'] = 'right';
        return new Arrow(targetOpts);
    }
  }

  checkHit(arrow) {
    this.targets.forEach(tar => {
      // if the arrows are in the same lane
      if (this.pos[1] === arrow.pos[1]){
        let dist = tar.getDistance(arrow);
        return dist < 65
      }
    })
  }

  // this is only temporary until game_view is working
  startMoving() {
    setInterval(() => {
      this.step();
      this.drawArrows(ctx);
    }, 20)
  }
}

module.exports = Game;