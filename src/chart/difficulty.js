const Chart = require('./chart.js');

class Difficulty extends Chart {
  constructor(difficultyOpts) {
    this.steps = difficultyOpts['steps'];
    
  }
}

module.exports = Difficulty;