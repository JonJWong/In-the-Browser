window.addEventListener("DOMContentLoaded", (event) => {
  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  const Game = require('/src/game/game.js');
  const Util = require('/src/util.js')
  const Chart = require('/src/game/chart.js')
  window.Game = Game;
  window.Util = Util;
  window.Chart = Chart;

  const gameOpts = {
    numTargets: 4,
    speed: 5,
  }

  window.g = new Game(gameOpts);
  // g.startMoving();

  // const opts = {stepDir: "/assets/chart/drop_pop_candy/drop_pop_candy.ssc", audioDir: "/assets/chart/drop_pop_candy/drop_pop_candy.ogg"};
  // let dpc = new Chart(opts);
  // dpc
  console.log('DOM fully loaded and parsed');
})