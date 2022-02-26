const Game = require("./game");

class GameView {

  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
  }

  start() {
    setInterval(() => {
      
    }, 20);
  }
}