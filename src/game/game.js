const Arrow = require('./arrow.js');
const Options = require('./options.js');
const Chart = require('./chart.js');

const directionToIndex = {left: 0, down: 1, up: 2, right: 3};
const indexToDirection = {0: 'left', 1: 'down', 2: 'up', 3: 'right'}

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

  addArrow(arrowDirection, arrowOpts) {
    arrowOpts ||= Options.arrowOpts();
    arrowOpts['direction'] = arrowDirection;
    arrowOpts['velocity'] = [0, -this.speed];
    let newArrow = new Arrow(arrowOpts);
    this.arrows.push(newArrow);
  }

  getStepsAndCount(rating) {
    let difficulty;
    let stepCount = 0;
    this.chart.difficulties.forEach(diff => {
      if (diff["rating"] === rating){
        difficulty = diff;
        stepCount = diff["stepCount"];
      }
    })
    this.difficulty = difficulty;
    this.steps = difficulty["steps"];
    this.maxScore = stepCount * 5;
    this.bpm = parseInt(this.chart.metadata[0][23].slice(12))
  }

  isOutOfBounds(pos) {
    let [x, y] = pos;
    return (x > 1000 || y > 1000 || x < 0 || y < 90)
  }

  render(ctx) {
    ctx.clearRect(0, 0, 1280, 960);
    this.drawBg(ctx);
    this.drawTargets(ctx);
    this.drawArrows(ctx);
  }

  drawBg(ctx) {
    ctx.drawImage(this.bg, 0, 0, 1280, 960)
  }
  
  drawArrows(ctx) {
    this.arrows.forEach(arrow =>{
      arrow.render(ctx);
    })
  }

  drawTargets(ctx) {
    this.targets.forEach(target => {
      target.render(ctx);
    })
  }

  step() {
    this.drawBg(ctx);
    this.drawTargets(ctx);
    this.moveArrows();
    this.drawArrows(ctx);
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos)) {
        console.log("MISS")
        this.removeArrow(arrow);
        this.score -= 12;
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
  getJudgementAddScore(distance) {
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
        this.score -= 6;
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

  createTarget(i, targetOpts) {
    targetOpts ||= Options.targetOpts()
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

  // 7392 + 9 ms from start of audio to first note
  // distance from targets from spawn is 960-150 (= 810)
  // with speed(5) it takes 162 ticks to get to the top, with each tick as 20ms
  // formula timeToTop = (distance / speed) * tick-delay
  // formula timeToStart = 7392 + 9 - timeToTop (?)
  // 3240ms to travel from bottom to miss
  // 462ms 1/4 notes @ 130bpm
  // 231ms 1/8 notes @ 130bpm
  // 115ms 1/16 notes @ 130bpm
  // 58ms 1/32 notes @ 130bpm
  // async delay should take in bpm
  delay(bpm, quantization) {
    // 1 minute / bpm = quarter note in ms
    const minuteInMs = 60000;
    let delay = 0;
    switch (quantization) {
      case 4:
        delay = (minuteInMs / (bpm * 1));
        break;
      case 8:
        delay = (minuteInMs / (bpm * 2));
        break;
      case 16:
        delay = (minuteInMs / (bpm * 4));
        break
      case 32:;
        delay = (minuteInMs / (bpm * 8));
        break;
    }
    setTimeout(() => {
      console.log(delay);
    }, delay)
  }

  placeArrowsFromChart() {
    for (let i = 1; i < this.difficulty.measureCount; i++) {
      const measure = this.steps[`${i}`];
      const quantization = measure.length;
      measure.forEach(beat => {
        // console.log(beat);
        this.delay(this.bpm, quantization)
      })
    }
  }
}

module.exports = Game;