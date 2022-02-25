window.addEventListener("DOMContentLoaded", (event) => {
  const playArea = require('./game/play_area.js');
  const Arrow = require('./game/arrow.js')

  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  window.Arrow = Arrow;
  window.playArea = playArea;

  let leftOpt = {
    direction: 'left',
    imgUrl: '/assets/images/Arrow.png',
    pos: [50, 50]
  }
  let downOpt = {
    direction: 'down',
    imgUrl: '/assets/images/Arrow.png',
    pos: [125, 50]
  }
  let upOpt = {
    direction: 'up',
    imgUrl: '/assets/images/Arrow.png',
    pos: [200, 50]
  }
  let rightOpt = {
    direction: 'right',
    imgUrl: '/assets/images/Arrow.png',
    pos: [275, 50]
  }
  let left = new Arrow(leftOpt);
  left.draw(ctx)
  let down = new Arrow(downOpt);
  down.draw(ctx)
  let up = new Arrow(upOpt);
  up.draw(ctx)
  let right = new Arrow(rightOpt);
  right.draw(ctx)
  console.log('DOM fully loaded and parsed');
})