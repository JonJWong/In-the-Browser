const Chart = require('./chart.js');

class Difficulty extends Chart {
  constructor(difficultyOpts) {
    this.name;
    this.rating;
    this.steps = difficultyOpts['steps'];
  }
}

module.exports = Difficulty;