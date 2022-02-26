const Arrow = require('./arrow.js');
const Receptor = require('./arrow.js');

class Game {
  constructor(gameOpts) {
    this.score = 0;
    this.maxScore = gameOpts['numNotes'] * 5;
    this.targets = new Target(gameOpts['numTargets']);
    this.arrows = [];
    this.chart = this.buildChartObj(gameOpts['chartDir'])
  }
  
  buildChartObj(dir) {
    // let chart = fetch('../../assets/chart/dpc/dpc.txt').then(res => res.text()).then(text => console.log(text));
    let chart = fetch(`${dir}`).then(res => res.text()).then(text => text)
  }
  // readline info
}

module.exports = Game;