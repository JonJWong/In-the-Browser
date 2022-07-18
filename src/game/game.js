const Arrow = require('./arrow.js');
const Options = require('./options.js');
const Chart = require('./chart.js');

const DIRECTION_TO_INDEX = {
  left: 0,
  down: 1,
  up: 2,
  right: 3
};

const INDEX_TO_DIRECTION = {
  0: 'left',
  1: 'down',
  2: 'up',
  3: 'right'
};

const ARROW_QUANTIZATION_IMGURL = {
  4: 'assets/images/quarter.png',
  8: 'assets/images/eighth.png',
  16: 'assets/images/sixteenth.png',
  MINE: 'assets/images/mine.png'
}

const MINE_WINDOW = {
  MIN: -20,
  MAX: 0
}

class Game {
  constructor(gameOpts) {
    this.chart = new Chart(gameOpts['chartOpts']);
    
    this.targets = this.addTargets(gameOpts['numTargets']);
    this.arrows = [];
    this.speed = gameOpts['speed']; // arrow velocity
    this.darkened = 0;
    
    this.isAlive = true;
    this.chartFinished = false;

    this.startTime;
    this.previousFrameTime;
    this.currentFrameTime;

    this.fantastics = 0;
    this.excellents = 0;
    this.greats = 0;
    this.decents = 0;
    this.wayOffs = 0;
    this.misses = 0;
    this.minesDodged = 0;
    this.minesTotal = 0;

    this.hits = 0;
    this.score = 0;
    this.maxScore;
    this.combo = 0;

    this.slayer;
    this.life = 50;
    this.maxLife = 100;
  }

  addArrow(arrowDirection, quantColorNum) {
    const arrowOpts = Object.assign({}, Options.arrowOpts);

    if (quantColorNum === 'MINE') {
      arrowOpts.imgUrl = ARROW_QUANTIZATION_IMGURL[quantColorNum];
      arrowOpts.isAMine = true;
    } else {
      arrowOpts.imgUrl = ARROW_QUANTIZATION_IMGURL[quantColorNum];
    }
    arrowOpts.direction = arrowDirection;
    arrowOpts.velocity = [0, -this.speed];

    this.arrows.push(new Arrow(arrowOpts));
  }

  getStepsAndCount(rating) {
    for (let diff of this.chart.difficulties) {
      if (diff.rating === rating) {
        this.difficulty = diff;
        this.maxScore = diff.stepCount * 5;
        this.steps = diff.steps;
        this.minesTotal = diff.mineCount
      }
    }
    this.bpm = parseInt(this.chart.metadata[23].slice(11))
  }

  isOutOfBounds(pos) {
    let [x, y] = pos;
    return x > 1000 || x < 0 || y > 1000 || y < 90
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
    ctx.rect(120, 15, 300, 50);
    if (this.darkened) {
      ctx.strokeStyle = "#cccccc"
    }
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  fillLifebar() {
    ctx.beginPath();
    ctx.rect(120, 15, this.life*3, 50);
    if (this.life === 100) {
      ctx.fillStyle = "#ffffff"
    } else if (this.life > 20) {
      ctx.fillStyle = "#c4c4c4"
    } else {
      ctx.fillStyle = "#940c0c"
    }
    ctx.fill();
  }

  darkenLane() {
    ctx.beginPath();
    ctx.rect(12, 0, 435, 960);
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fill();
  }

  step() {
    if (this.life <= 0) {
      this.isAlive = false;
    }
    ctx.clearRect(0, 0, 1280, 960);
    if (this.darkened) {
      this.darkenLane();
    }
    this.fillLifebar(ctx);
    this.drawLifebar(ctx);
    this.drawTargets(ctx);
    this.moveArrows();
    this.updateStepStats();
    this.drawArrows(ctx);
  }

  getMoneyScore() {
    return this.score <= 0 
    ? 0 
    : ((this.score / this.maxScore) * 100).toFixed(2)
  }

  updateStepStats() {
    window.stepStatsGrid.fCount.textContent = `${this.fantastics}`;
    window.stepStatsGrid.eCount.textContent = `${this.excellents}`;
    window.stepStatsGrid.gCount.textContent = `${this.greats}`;
    window.stepStatsGrid.dCount.textContent = `${this.decents}`;
    window.stepStatsGrid.woCount.textContent = `${this.wayOffs}`;
    window.stepStatsGrid.missCount.textContent = `${this.misses}`;
    window.stepStatsGrid.mineCount.textContent = `${this.minesDodged}/${this.minesTotal}`;

    window.stepStats.percentage_score.textContent = `${this.getMoneyScore()}%`;

    if (this.combo > 2) {
      window.stepStats.combo_counter.style.display = 'block'
      window.stepStats.combo_counter.textContent = `${this.combo}`;
    } else {
      window.stepStats.combo_counter.textContent = 0;
      window.stepStats.combo_counter.style.display = 'none'
    }
    
    window.chartStats.artist_name.textContent = `Artist: ${this.chart.metadata[3].slice(7)}`
    window.chartStats.song_title.textContent = `Song: ${this.chart.metadata[1].slice(6)}`
    window.chartStats.difficulty_name.textContent = `Difficulty: ${this.difficulty.difficulty}`
    window.chartStats.difficulty_rating.textContent = `${this.difficulty.rating}`
  }

  moveArrows() {
    this.arrows.forEach(arrow => {
      arrow.move()
      if (this.isOutOfBounds(arrow.pos) && !arrow.isAMine) {
        this.misses++;
        this.score -= 12;
        this.combo = 0;
        this.life -= 10;
        this.setJudgementEle('Miss');
        if (this.life <= 0) {
          this.slayer = arrow;
        }
        this.removeArrow(arrow);
      } else if (this.isOutOfBounds(arrow.pos) && arrow.isAMine) {
        this.minesDodged++;
        this.removeArrow(arrow);
      };
    })
  }

  removeArrow(arrow) {
    this.arrows.splice(this.arrows.indexOf(arrow), 1);
  }

  checkKeyPress(direction) {
    const target = this.targets[DIRECTION_TO_INDEX[direction]]
    this.enlargeTarget(target);
    // target indices left: 0, down: 1, up: 2, right: 3
    for (let i = 0; i < this.arrows.length; i++) {
      const arrow = this.arrows[i];
      if (arrow.direction === direction) {
        const distance = target.getDistance(arrow);
        if (distance > 60) break;
        if (arrow.isAMine &&
            (distance >= MINE_WINDOW['MIN'] && distance < MINE_WINDOW['MAX'])) {
          this.combo = 0;
          this.score -= 6;
          this.life -= 10;
          if (this.life <= 0) {
            this.slayer = arrow
          };
          this.removeArrow(arrow);
          break;
        };
        this.metricsIni(distance);
        this.removeArrow(arrow);
        this.hits++;
        break;
      }
    }
  }

  enlargeTarget(target) {
    target.scale = .42;
  }
  
  scaleTarget(target) {
    if (target.scale - .01 > .35) {
      target.scale -= .01
    } if (target.scale - .01 < .35) {
      target.scale = .35
    }
  }

  comboRegainLife(judgement) {
    if (this.combo > 5 && this.life !== this.maxLife) {

      if (judgement === 'FANTASTIC' || judgement === 'EXCELLENT') {
        if (this.life + 5 < this.maxLife) {
          this.life += 5
        } else {
          this.life = this.maxLife
        }

      } else if (judgement === 'GREAT') {
        if (this.life + 3 < this.maxLife) {
          this.life += 3
        } else {
          this.life = this.maxLife
        }
      }
    }
  }

  setJudgementEle(judgement) {
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
  metricsIni(distance) {
    if (distance < 0) distance = -distance;
    if (distance <= 20) {
      this.score += 5;
      this.fantastics += 1;
      this.combo += 1;
      this.comboRegainLife('FANTASTIC');
      this.setJudgementEle('Fantastic');
    } else if (distance <= 30) {
      this.score += 4;
      this.excellents += 1;
      this.combo += 1;
      this.comboRegainLife('EXCELLENT');
      this.setJudgementEle('Excellent');
    } else if (distance <= 40) {
      this.score += 2;
      this.greats += 1;
      this.combo += 1;
      this.comboRegainLife('GREAT');
      this.setJudgementEle('Great');
    } else if (distance <= 50) {
      this.score += 0;
      this.decents += 1;
      this.combo = 0;
      this.setJudgementEle('Decent');
    } else if (distance <= 60) {
      this.score -= 6;
      this.wayOffs += 1;
      this.combo = 0;
      this.setJudgementEle('Way-Off');
    }
  }

  addTargets(num) {
    const targets = [];
    for (let i = 0; i < num; i++) {
      targets.push(this.createTarget[i])
    }
    return targets;
  }

  createTarget(i) {
    const targetOpts = Options.targetOpts;
    targetOpts.direction = INDEX_TO_DIRECTION[i];
    return new Arrow(targetOpts);
  }

  getDelay(bpm, quantization) {
    // 60,000 = 1 minute in ms
    return 60000 / ((quantization / 4) * bpm) - 1
  }

  getQuantColorNum(i, length) {
    if (length >= 16) {
      if (i % 4 === 1) return 4;
      if (i % 4 === 3) return 8;
      if (i % 2 === 0) return 16;
    } else if (length === 8) {
      if (i % 2 === 1) return 4;
      if (i % 2 === 0) return 8;
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
      const measure = this.steps[i];
      const quantization = measure.length;
      const delay = this.getDelay(this.bpm, quantization);
      await this.measureIteration(measure, delay);
    }
    this.chartFinished = true;
  }

  async measureIteration(measure, delay) {
    // goes through the measure, needs to wait per note
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (let j = 0; j < measure.length; j++) {
      const beat = measure[j];
      const quantColorNum = this.getQuantColorNum(j + 1, measure.length);
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
        this.addArrow(INDEX_TO_DIRECTION[k], quantColorNum)
      }
      if (beat[k] === 'M') {
        this.addArrow(INDEX_TO_DIRECTION[k], 'MINE')
      }
    }
  }
}
module.exports = Game;