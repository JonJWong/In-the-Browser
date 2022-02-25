window.addEventListener("DOMContentLoaded", (event) => {
  const playArea = require('./game/play_area.js');
  const Arrow = require('./game/arrow.js')

  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  const img = new Image();
  img.addEventListener('load', function() {
    ctx.drawImage(img, 50, 50);
  })
  img.src = '/assets/images/Arrow.png';
  window.Arrow = Arrow;
  window.playArea = playArea;
  console.log('DOM fully loaded and parsed');
})