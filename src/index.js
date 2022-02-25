window.addEventListener("DOMContentLoaded", (event) => {
  const playArea = require('./game/play_area.js');
  const Arrow = require('./game/arrow.js')

  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  window.Arrow = Arrow;
  window.playArea = playArea;
  console.log('DOM fully loaded and parsed');
})