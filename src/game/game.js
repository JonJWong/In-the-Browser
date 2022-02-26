const Arrow = require('./arrow.js');
const Receptor = require('./arrow.js');

class Game {
  constructor(gameOpts) {
    this.score = 0;
    this.maxScore = gameOpts['numNotes'] * 5;
    this.targets = new Target(gameOpts['numTargets']);
    this.arrows = [];
    this.speed = gameOpts['speed']; // arrow velocity
  }

  addArrow(arrowDirection) {

  }
}

module.exports = Game;