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
    key('left', () => this.game)
    key('down', () => this.game)
    key('up', () => this.game)
    key('right', () => this.game)
  }
}