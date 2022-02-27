const Arrow = require('./arrow.js');

const Options = {
  targetOpts() {
    let targetOpts = {
      imgUrl: '/assets/images/Arrow.png',
      velocity: [0, 0],
      position: [50, 50],
      target: true
    };
    return targetOpts
  },

  arrowOpts() {
    let arrowOpts = {
      imgUrl: '/assets/images/Arrow.png',
      velocity: [0, 0],
      position: [50, 1000],
      target: false
    };
    return arrowOpts
  },

  chartOpts() {
    let chartOpts = {
      stepDir: '/assets/chart/drop_pop_candy/drop_pop_candy.ssc',
      audioDir: '/assets/chart/drop_pop_candy/drop_pop_candy.ogg'
    }
    return chartOpts;
  },

  gameOpts() {
    let gameOpts = {
      numTargets: 4,
      speed: 5,
    }
    return gameOpts;
  }
}

module.exports = Options;