const Game = require("./game");
const Keymaster = require('../keymaster.js')

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
  }

  start() {
    this.playAudio();
    setInterval(() => {
      this.game.step();
      this.game.drawArrows(ctx);
    }, 20);
  }

  playAudio() {
    this.audio = this.game.chart.audio;
    this.audio.play();
  }

  changeVolume(num) {
    this.audio.volume = num;
  }

  bindKeys() {
    key('left', () => this.game.checkKeyPress('left'));
    key('down', () => this.game.checkKeyPress('down'));
    key('up', () => this.game.checkKeyPress('up'));
    key('right', () => this.game.checkKeyPress('right'));
  }
}

module.exports = GameView;