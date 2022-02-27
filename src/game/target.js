const Arrow = require('./arrow.js');
const Options = require('./options.js');
const Util = require('../util.js')

class Target {
  constructor(num) {
    this.targets = [];
    this.addTargets(num);
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  addTargets(num) {
    for (let i = 0; i < num; i++) {
      let target = this.createTarget(i);
      this.targets.push(target)
    }
  }

  createTarget(i) {
    let targetOpts = Options.targetOpts()
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

  checkHit(arrow) {
    this.targets.forEach(tar => {
      // if the arrows are in the same lane
      if (this.pos[1] === arrow.pos[1]){
        let dist = tar.getDistance(arrow);
        return dist < 65
      }
    })
  }
}

module.exports = Target;