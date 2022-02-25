window.addEventListener("DOMContentLoaded", (event) => {
  const playArea = require('./game/play_area.js');

  window.playArea = playArea;
  console.log('DOM fully loaded and parsed');
})