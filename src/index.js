window.addEventListener("DOMContentLoaded", (event) => {
  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  const Game = require('./game/game.js');
  const GameView = require('./game/game_view.js');
  const Util = require('./util.js');
  const Options = require('./game/options.js');
  const Chart = require('./game/chart.js');
  
  window.Game = Game;
  window.GameView = GameView;
  window.Util = Util;
  window.Options = Options;
  window.Chart = Chart;

  const gameOpts = Options.gameOpts();
  window.g = new GameView(gameOpts);
  g.bindKeys();

  const startButton = document.getElementById('start');
  startButton.addEventListener('click', () => {
    g.start(9);
  })
  const volDown = document.getElementById('vol-down');
  volDown.addEventListener('click', () => {
    g.changeVolume();
  })
  const volUp = document.getElementById('vol-up');
  volUp.addEventListener('click', () => {
    g.changeVolume();
  })
  const muteButton = document.getElementById('mute');
  muteButton.addEventListener('click', () => {
    if (g.audio) {
      if (g.audio.volume > 0) {
        g.prevVolume = g.audio.volume || 0;
        g.changeVolume(0);
        muteButton.textContent = "Unmute"
      }
      if (g.audio.volume === 0) {
        g.changeVolume(g.prevVolume);
        muteButton.textContent = "Mute"
      }
    }
  })
  console.log('DOM fully loaded and parsed');
})