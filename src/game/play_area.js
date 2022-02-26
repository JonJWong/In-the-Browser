const Arrow = require('./arrow.js');

class PlayArea{
  constructor(playAreaOptions) {
    this.game = playAreaOptions['game'];
    this.lane = playAreaOptions['lane'];
  }
}

module.exports = PlayArea;