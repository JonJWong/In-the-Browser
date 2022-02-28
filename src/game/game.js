const Arrow = require('./arrow.js');
const Options = require('./options.js');
const Chart = require('./chart.js');

const directionToIndex = {left: 0, down: 1, up: 2, right: 3};

class Game {
  constructor(gameOpts) {
    this.score = 0;
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
    return (x > 1000 || y > 1000 || x < 0 || y < 0)
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
    // add code here to check for hits later?
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos)) {
        this.removeArrow(arrow);
        this.score -= 13;
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
        console.log(`distance = ${distance}`)
        console.log(`judgement = ${this.getJudgement(distance)}`);
        console.log(`score = ${this.score}`)
        this.removeArrow(arrow)
      }
    }
  }

  // currently hard-coded for distance, need to figure out how to do this
  // with ms timing later?
  getJudgement(distance) {
    switch (true) {
      case (distance < 10):
        this.score += 5;
        return 'fantastic'
      case (distance < 20):
        this.score += 4;
        return 'excellent'
      case (distance < 40):
        this.score += 2;
        return 'great'
      case (distance < 70):
        this.score += 0;
        return 'decent'
      case (distance < 90):
        this.score -= 4;
        return 'way off'
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