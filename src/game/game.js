const Arrow = require('./arrow.js');
const Receptor = require('./arrow.js');
const Util = require('/src/util.js');

class Game {
  constructor(gameOpts) {
    this.score = 0;
    this.maxScore = gameOpts['numNotes'] * 5;
    this.targets = new Target(gameOpts['numTargets']);
    this.arrows = [];
    this.speed = gameOpts['speed']; // arrow velocity
  }

  addArrow(arrowDirection) {
    let opts = Util.arrowOpts();
  }
}

module.exports = Game;