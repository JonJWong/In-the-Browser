window.addEventListener("DOMContentLoaded", (event) => {
  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  const Game = require('/src/game/game.js');
  const GameView = require('/src/game/game_view.js');
  const Util = require('/src/util.js');
  const Options = require('/src/game/options.js');
  const Chart = require('/src/game/chart.js');
  
  window.Game = Game;
  window.GameView = GameView;
  window.Util = Util;
  window.Options = Options;
  window.Chart = Chart;

  const gameOpts = Options.gameOpts();

  window.g = new GameView(gameOpts);
  g.bindKeys();
  g.start();
  // g.startMoving();

  // const opts = {stepDir: "/assets/chart/drop_pop_candy/drop_pop_candy.ssc", audioDir: "/assets/chart/drop_pop_candy/drop_pop_candy.ogg"};
  // let dpc = new Chart(opts);
  // dpc
  console.log('DOM fully loaded and parsed');
})