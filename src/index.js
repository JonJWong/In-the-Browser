window.addEventListener("DOMContentLoaded", (event) => {
  const Arrow = require('./game/arrow.js');
  const Target = require('./game/target.js');
  const playArea = require('./game/play_area.js');
  const Chart = require('./chart/chart.js');

  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  window.Arrow = Arrow;
  window.Target = Target;
  window.playArea = playArea;
  window.Chart = Chart;

  let tar = new Target(4);
  tar.render(ctx);


  // const opts = {stepDir: "/assets/chart/drop_pop_candy/drop_pop_candy.ssc", audioDir: "/assets/chart/drop_pop_candy/drop_pop_candy.ogg"};
  // let dpc = new Chart(opts);
  // dpc
  console.log('DOM fully loaded and parsed');
})