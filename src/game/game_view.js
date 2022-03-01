const Game = require("./game");
const Keymaster = require('../keymaster.js');

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.difficulty = gameOpts['difficulty'];
    this.ctx = ctx;
  }

  start() {
    setTimeout(() => {
      console.log('testing if this preloads');
      this.game.getStepsAndCount(this.difficulty)
      setInterval(() => {
        this.game.step();
      }, 20);
      setTimeout(() => {
        this.playAudio();
        this.changeVolume(.05);
      }, 3240) // this delay is only for the 9
      this.game.startChart();
    }, 1000)
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