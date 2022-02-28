const Arrow = require('./arrow.js');
const Options = require('./options.js');
const Chart = require('./chart.js');

const directionToIndex = {left: 0, down: 1, up: 2, right: 3};

class Game {
  constructor(gameOpts) {
    this.score = 0;
    this.combo = 0;
    this.chart = new Chart(gameOpts['chartOpts']);
    // need to change this to come from the chart instead;
    this.targets = this.addTargets(gameOpts['numTargets']);
    this.arrows = [];
    this.speed = gameOpts['speed']; // arrow velocity

    this.bg = new Image();
    this.bg.src = this.chart.background;
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
    return (x > 1000 || y > 1000 || x < 0 || y < 90)
  }
  
  drawArrows(ctx) {
    ctx.clearRect(0, 0, 1280, 960);
    ctx.drawImage(this.bg, 0, 0, 1280, 960)
    this.targets.concat(this.arrows).forEach(arrow =>{
      arrow.render(ctx);
    })
  }

  step() {
    this.moveArrows();
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos)) {
        console.log("MISS")
        this.removeArrow(arrow);
        this.score -= 13;
        this.combo = 0;
      };
    })
  }

  removeArrow(arrow) {
    const removeIndex = this.arrows.indexOf(arrow);
    this.arrows.splice(removeIndex, 1);
  }

  
  checkKeyPress(direction) {
    const target = this.targets[directionToIndex[direction]]
    // target indices left: 0, down: 1, up: 2, right: 3
    for (let i = 0; i < this.arrows.length; i++) {
      let arrow = this.arrows[i];
      if (arrow.direction === direction) {
        let distance = target.getDistance(arrow);
        if (distance > 60) break;
        this.removeArrow(arrow);
        this.combo += 1;
        console.log(this.combo);
        break;
      }
    }
  }

  // currently hard-coded for distance, need to figure out how to do this
  // with ms timing later?
  getJudgement(distance) {
    if (distance < 0) distance = -distance;
    switch (true) {
      case (distance < 5):
        this.score += 5;
        return 'FANTASTIC!'
      case (distance < 10):
        this.score += 4;
        return 'EXCELLENT!'
      case (distance < 20):
        this.score += 2;
        return 'GREAT!'
      case (distance < 45):
        this.score += 0;
        return 'DECENT'
      case (distance < 60):
        this.score -= 4;
        return 'WAY OFF'
    }
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

  // this is only temporary until game_view is working
  startMoving() {
    setInterval(() => {
      this.step();
      this.drawArrows(ctx);
    }, 20)
  }
}

module.exports = Game;