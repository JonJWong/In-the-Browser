const Arrow = require('/src/game/arrow.js');

const Util = {
  targetOpts() {
    let targetOpts = {
      imgUrl: '/assets/images/Arrow.png',
      velocity: [0, 0],
      target: true
    };
    return targetOpts
  },

  arrowOpts() {
    let targetOpts = {
      imgUrl: '/assets/images/Arrow.png',
      velocity: [0, 0],
      target: true
    };
    return targetOpts
  },

  createTarget(i) {
    let targetOpts = this.targetOpts()
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
  },
};

module.exports = Util;