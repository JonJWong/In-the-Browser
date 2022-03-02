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
    
    this.isAlive = true;

    this.slayer;
    this.life = 50;
    this.maxScore;
    this.score = 0;
    this.hits = 0;
    this.combo = 0;
    this.fantastics = 0;
    this.excellents = 0;
    this.greats = 0;
    this.decents = 0;
    this.wayOffs = 0;
    this.misses = 0;
    this.minesTotal = 0;
    this.minesDodged = 0;
  }

  addArrow(arrowDirection, quantColorNum) {
    const arrowOpts = Options.arrowOpts();
    switch (quantColorNum) {
      case 4:
        arrowOpts['imgUrl'] = 'assets/images/quarter.png';
        break;
      case 8:
        arrowOpts['imgUrl'] = 'assets/images/eighth.png';
        break;
      case 16:
        arrowOpts['imgUrl'] = 'assets/images/sixteenth.png';
        break;
      case 'MINE':
        arrowOpts['imgUrl'] = 'assets/images/mine.png';
        arrowOpts['isAMine'] = true;
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
  
  drawArrows() {
    this.arrows.forEach(arrow =>{
      arrow.render(ctx);
    })
  }

  drawTargets() {
    this.targets.forEach(target => {
      this.scaleTarget(target);
      target.render(ctx);
    })
  }

  drawLifebar() {
    ctx.beginPath();
    ctx.rect(120, 20, 300, 50);
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  fillLifebar() {
    ctx.beginPath();
    ctx.rect(120, 20, this.life*3, 50);
    if (this.life === 100) {
      ctx.fillStyle = "#ffffff"
    } else if (this.life > 20) {
      ctx.fillStyle = "#c4c4c4"
    } else {
      ctx.fillStyle = "#940c0c"
    }
    ctx.fill();
  }

  step() {
    if (this.life <= 0) {
      this.isAlive = false;
    }
    ctx.clearRect(0, 0, 1280, 960);
    this.fillLifebar(ctx);
    this.drawLifebar(ctx);
    this.drawTargets(ctx);
    this.moveArrows();
    this.updateStepStats();
    this.drawArrows(ctx);
  }

  getMoneyScore() {
    return this.score <= 0 ? 0 : ((this.score / this.maxScore) * 100).toFixed(2)
  }

  updateStepStats() {
    const stepStats = document.getElementsByClassName('ss-judgement');
    stepStats['fantastic'].textContent = `Fantastics: ${this.fantastics}`;
    stepStats['excellent'].textContent = `Excellents: ${this.excellents}`;
    stepStats['great'].textContent = `Greats: ${this.greats}`;
    stepStats['decent'].textContent = `Decents: ${this.decents}`;
    stepStats['way-off'].textContent = `WayOffs: ${this.wayOffs}`;
    stepStats['misses'].textContent = `Misses: ${this.misses}`;
    stepStats['mines'].textContent = `Mines: ${this.minesDodged}/${this.minesTotal}`;
    stepStats['percentage-score'].textContent = `${this.getMoneyScore()}%`;
    if (this.combo > 0) {
      stepStats['combo-counter'].style.display = 'block'
      stepStats['combo-counter'].textContent = `${this.combo}`;
    } else {
      stepStats['combo-counter'].textContent = 0;
      stepStats['combo-counter'].style.display = 'none'
    }
    
    const chartStats = document.getElementsByClassName('chart-stats');
    chartStats['artist-name'].textContent = `Artist: ${this.chart.metadata[3].slice(7)}`
    chartStats['song-title'].textContent = `Song: ${this.chart.metadata[1].slice(6)}`
    chartStats['difficulty-name'].textContent = `Difficulty: ${this.difficulty["difficulty"]}`
    chartStats['difficulty-rating'].textContent = `Rating: ${this.difficulty["rating"]}`
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos) && !arrow.isAMine) {
        this.misses += 1;
        this.score -= 12;
        this.combo = 0;
        this.life -= 10;
        this.setJudgementEle('Miss');
        if (this.life <= 0) {
          this.slayer = arrow;
        }
        this.removeArrow(arrow);
      } else if (this.isOutOfBounds(arrow.pos) && arrow.isAMine) {
        this.minesDodged += 1;
        this.removeArrow(arrow);
      };
    })
  }

  removeArrow(arrow) {
    const removeIndex = this.arrows.indexOf(arrow);
    this.arrows.splice(removeIndex, 1);
  }

  checkKeyPress(direction) {
    const target = this.targets[directionToIndex[direction]]
    this.hitTarget(target);
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
          this.life -= 10;
          if (this.life <= 0) {
            this.slayer = arrow
          };
          this.removeArrow(arrow);
        };
        this.getJudgementAddScore(distance)
        this.removeArrow(arrow);
        this.hits += 1;
        break;
      }
    }
  }

  hitTarget(target) {
    target.scale = .42;
  }
  
  scaleTarget(target) {
    if (target.scale - .01 > .35) {
      target.scale -= .01
    } if (target.scale - .01 < .35) {
      target.scale = .35
    }
  }

  addLife(judgement) {
    if (this.combo > 3 && this.life !== 100) {
      switch (judgement) {
        case 'FANTASTIC': case 'EXCELLENT':
          if (this.life + 5 < 100) {
            this.life += 5
          } else {
            this.life = 100;
          }
          break;
        case 'GREAT':
          if (this.life + 3 < 100) {
            this.life += 3
          } else {
            this.life = 100;
          }
          break;
      }
    }
  }

  setJudgementEle(judgement) {
    const judgeText = document.getElementById('judgement');
    judgeText.style.display = 'block';
    switch (judgement) {
      case 'Fantastic':
        judgeText.textContent = "Fantastic!"
        judgeText.style.color = '#21CCE8'
        break;
      case 'Excellent':
        judgeText.textContent = "Excellent!"
        judgeText.style.color = '#e29c18'
        break;
      case 'Great':
        judgeText.textContent = "Great!"
        judgeText.style.color = '#66c955'
        break;
      case 'Decent':
        judgeText.textContent = "Decent"
        judgeText.style.color = '#b45cff'
        break;
      case 'Way-Off':
        judgeText.textContent = "Way Off"
        judgeText.style.color = '#c9855e'
        break;
      case 'Miss':
        judgeText.textContent = "MISS"
        judgeText.style.color = '#ff3030'
        break;
    }
  }

  // currently hard-coded for distance, need to figure out how to do this
  // with ms timing later?
  getJudgementAddScore(distance) {
    if (distance < 0) distance = -distance;
    switch (true) {
      case (distance < 10):
        this.score += 5;
        this.fantastics += 1;
        this.combo += 1;
        this.addLife('FANTASTIC');
        this.setJudgementEle('Fantastic');
        break;
      case (distance < 20):
        this.score += 4;
        this.excellents += 1;
        this.combo += 1;
        this.addLife('EXCELLENT');
        this.setJudgementEle('Excellent');
        break;
      case (distance < 30):
        this.score += 2;
        this.greats += 1;
        this.combo += 1;
        this.addLife('GREAT');
        this.setJudgementEle('Great');
        break;
      case (distance < 50):
        this.score += 0;
        this.decents += 1;
        this.combo = 0;
        this.setJudgementEle('Decent');
        return 'DECENT';
      case (distance < 60):
        this.score -= 6;
        this.wayOffs += 1;
        this.combo = 0;
        this.setJudgementEle('Way-Off');
        return 'WAY OFF';
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
  getQuantColorNum(i, length) {
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
    for (let i = 1; i <= this.difficulty.measureCount; i++) {
      if (!this.isAlive) {
        return;
      }
      const measure = this.steps[`${i}`];
      const quantization = measure.length;
      let delay = this.getDelay(this.bpm, quantization);
      await this.measureIteration(measure, delay);
    }
    this.chartFinished = true;
  }

  async measureIteration(measure, delay) {
    // goes through the measure, needs to wait per note
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (let j = 0; j < measure.length; j++) {
      if (!this.isAlive) {
        return;
      }
      let beat = measure[j];
      let quantColorNum = this.getQuantColorNum(j + 1, measure.length);
      this.laneIteration(beat, quantColorNum)
      await timer(delay);
    }
  }

  laneIteration(beat, quantColorNum) {
    for (let k = 0; k < beat.length; k++) {
      if (!this.isAlive) {
        return;
      }
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