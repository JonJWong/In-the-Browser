const Game = require("./game");
const Keymaster = require('../keymaster.js');

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.difficulty = gameOpts['difficulty'];
    this.ctx = ctx;
  }

  start() {
    this.game.getStepsAndCount(this.difficulty)
    setInterval(() => {
      this.game.step();
      this.game.drawArrows(ctx);
    }, 20);
    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.05);
    }, 3240)
    this.game.startChart();
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