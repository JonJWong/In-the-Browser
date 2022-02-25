const Arrow = require('./arrow.js');
const OnScreenElement = require('./on_screen_element.js')

class PlayArea extends OnScreenElement {
  constructor(playAreaOptions) {
    this.lane = playAreaOptions['lane'];
    this.lifebar = playAreaOptions['lifebar'];
    this.receptors = playAreaOptions['receptors'];
    this.arrows = [];
  }
}

module.exports = PlayArea;