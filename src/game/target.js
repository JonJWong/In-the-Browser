const Arrow = require('./arrow.js');
const Util = require('../util.js');

class Target {
  constructor(num) {
    this.targets = [];
    this.addTargets(num);
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  addTargets(num) {
    for (let i = 0; i < num; i++) {
      let targetOpts = {
        imgUrl: '/assets/images/Arrow.png',
        velocity: [0, 0],
        target: true
      }
      let target = Util.createTarget(i);
      this.targets.push(target)
    }
  }

  render(ctx) {
    this.targets.forEach(tar => {
      tar.draw(ctx)
      console.log(tar)
    })
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