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
}

module.exports = Options;