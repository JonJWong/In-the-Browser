window.addEventListener("DOMContentLoaded", (event) => {
  const playArea = require('./game/play_area.js');
  const Arrow = require('./game/arrow.js')

  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  window.Arrow = Arrow;
  window.playArea = playArea;

  let arrOpt = {
    direction: 'left',
    imgUrl: '/assets/images/Arrow.png',
    pos: [200, 200]
  }
  let arr = new Arrow(arrOpt);
  let img = new Image();
  arr.draw(ctx, 90)
  console.log('DOM fully loaded and parsed');
})