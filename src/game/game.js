const Arrow = require('./arrow.js');
const Options = require('./options.js');
const Chart = require('./chart.js');

const directionToIndex = {left: 0, down: 1, up: 2, right: 3};
const indexToDirection = {0: 'left', 1: 'down', 2: 'up', 3: 'right'}

class Game {
  constructor(gameOpts) {
    this.chart = new Chart(gameOpts['chartOpts']);
    
    this.targets = this.addTargets(gameOpts['numTargets']);
    this.arrows = [];
    this.speed = gameOpts['speed']; // arrow velocity
    
    this.life = 50;
    this.maxScore;
    this.score = 0;
    this.combo = 0;
    this.fantastics = 0;
    this.excellents = 0;
    this.greats = 0;
    this.decents = 0;
    this.wayOffs = 0;
    this.misses = 0;
    this.minesTotal = 0;
    this.minesHit = 0;
  }

  addArrow(arrowDirection, quantColorNum) {
    const arrowOpts = Options.arrowOpts();
    switch (quantColorNum) {
      case 4:
        arrowOpts['imgUrl'] = 'assets/images/quarter.png';
        break;
      case 8:
        arrowOpts['imgUrl'] = 'assets/images/eighth.png'
        break;
      case 16:
        arrowOpts['imgUrl'] = 'assets/images/sixteenth.png'
        break;
      case 'MINE':
        arrowOpts['imgUrl'] = 'assets/images/mine.png';
        break;
    }
    arrowOpts['direction'] = arrowDirection;
    arrowOpts['velocity'] = [0, -this.speed];
    let newArrow = new Arrow(arrowOpts);
    this.arrows.push(newArrow);
  }

  getStepsAndCount(rating) {
    let difficulty;
    let stepCount = 0;
    for (let diff of this.chart.difficulties) {
      if (diff["rating"] === rating){
        difficulty = diff;
        stepCount = diff["stepCount"];
      }
    }
    this.difficulty = difficulty;
    this.steps = difficulty["steps"];
    this.minesTotal = difficulty["mineCount"]
    this.maxScore = stepCount * 5;
    this.bpm = parseInt(this.chart.metadata[23].slice(11))
  }

  isOutOfBounds(pos) {
    let [x, y] = pos;
    return (x > 1000 || y > 1000 || x < 0 || y < 90)
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
    ctx.clearRect(0, 0, 1280, 960);
    this.drawTargets(ctx);
    this.moveArrows();
    this.drawArrows(ctx);
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos) && !arrow.isAMine) {
        this.removeArrow(arrow);
        if (!arrow.isAMine) {
          this.score -= 12;
          this.misses += 1;
          this.combo = 0;
        }
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
        if (arrow.isAMine && distance > 20) {
          continue;
        } else if (arrow.isAMine && distance < 20) {
          this.combo = 0;
          this.score -= 6;
          this.minesHit += 1;
          this.removeArrow(arrow);
        };
        this.getJudgementAddScore(distance)
        this.removeArrow(arrow);
        this.combo += 1;
        break;
      }
    }
  }

  addLife(judgement) {
    if (this.combo > 3 && this.life !== 100) {
      switch (judgement) {
        case 'FANTASTIC': case 'EXCELLENT':
          this.life += 5
          break;
        case 'GREAT':
          this.life += 3
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
        this.fantastics += 1;
        this.addLife('FANTASTIC');
      case (distance < 10):
        this.score += 4;
        this.excellents += 1;
        this.addLife('EXCELLENT')
      case (distance < 20):
        this.score += 2;
        this.greats += 1;
        this.addLife('GREAT')
      case (distance < 45):
        this.score += 0;
        this.decents += 1;
        return 'DECENT'
      case (distance < 60):
        this.score -= 6;
        this.wayOffs += 1;
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

  // 7392 + 9 ms from start of audio to first note (7401)
  // distance from targets from spawn is 960-150 (= 810)
  // with speed(5) it takes 162 ticks to get to the targets, with each tick as 20ms
  // formula timeToTop = (distance / speed) * tick-delay
  // formula timeToStart = 7392 + 9 - timeToTop (?)
  // 3240ms to travel from bottom to target
  // 462ms 1/4 notes @ 130bpm
  // 231ms 1/8 notes @ 130bpm
  // 115ms 1/16 notes @ 130bpm
  // 58ms 1/32 notes @ 130bpm
  // async delay should take in bpm
  getDelay(bpm, quantization) {
    const minuteInMs = 60000;
    return minuteInMs / ((quantization / 4) * bpm) - 1
  }

  // R = 1, 5, 9, 13                | num % 4 === 1;
  // G = 2, 4, 6, 8, 10, 12, 14, 16 | num % 2 === 0;
  // B = 3, 7, 9, 15                | num % 4 === 3;
  // R  G  B  G  R  G  B  G  R  G  B  G  R  G  B  G
  // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
  getQuantColorNum(i) {
    if (length >= 16) {
      switch(true) {
        case (i % 4 === 1):
          return 4
        case (i % 4 === 3):
          return 8
        case (i % 2 === 0):
          return 16
      }
    } else if (length === 8) {
      switch(true) {
        case (i % 2 === 1):
          return 4
        case (i % 2 === 0):
          return 8
      }
    } else {
      return 4
    }
  }

  startChart() {
    this.chartIteration();
  }

  async chartIteration() {
    // goes through the chart, needs to wait for the measure
    for (let i = 1; i < this.difficulty.measureCount; i++) {
      const measure = this.steps[`${i}`];
      const quantization = measure.length;
      let delay = this.getDelay(this.bpm, quantization);
      await this.measureIteration(measure, delay);
    }
  }

  async measureIteration(measure, delay) {
    // goes through the measure, needs to wait per note
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (let j = 0; j < measure.length; j++) {
      let beat = measure[j];
      let quantColorNum = this.getQuantColorNum(j + 1);
      this.laneIteration(beat, quantColorNum)
      await timer(delay);
    }
  }

  laneIteration(beat, quantColorNum) {
    for (let k = 0; k < beat.length; k++) {
      if (beat[k] === '1' || beat[k] === '2' || beat[k] === '4') {
        this.addArrow(indexToDirection[k], quantColorNum)
      }
      if (beat[k] === 'M') {
        this.addArrow(indexToDirection[k], 'MINE')
      }
    }
  }
}
module.exports = Game;