const Game = require("./game");
const Keymaster = require('../keymaster.js')

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
  }

  start() {
    setInterval(() => {
      
    }, 20);
  }

  bindKeys() {
    key('left', () => this.game.checkKeyPress('left'));
    key('down', () => this.game.checkKeyPress('down'));
    key('up', () => this.game.checkKeyPress('up'));
    key('right', () => this.game.checkKeyPress('right'));
  }
}