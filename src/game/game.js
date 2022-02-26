const Arrow = require('./arrow.js');
const Target = require('./arrow.js');
const Target = require('./target.js');
const Util = require('/src/util.js');

class Game {
  constructor(gameOpts) {
    this.score = 0;
    this.maxScore = gameOpts['numNotes'] * 5;
    this.targets = new Target(gameOpts['numTargets']);
    this.arrows = [];
    this.targets = new Target(4);
    this.speed = gameOpts['speed']; // arrow velocity
  }

  addArrow(arrowDirection) {
    let opts = Util.arrowOpts();
    opts['direction'] = arrowDirection;
    opts['velocity'][1] = this._getArrowSpeed(opts['velocity'], this.speed);
    let newArrow = new Arrow(opts);
    this.arrows.push(newArrow);
  }

  _getArrowSpeed(vel, speed) {
    let original = vel[1];
    return original + speed;
  }

  isOutOfBounds(pos) {
    let [x, y] = pos;
    return (x > 1000 || y > 1000 || x < 0 || y < 0)
  }

  
}

module.exports = Game;