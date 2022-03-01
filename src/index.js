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
  const volDown = document.getElementById('vol-down');
  const volUp = document.getElementById('vol-up');
  const muteButton = document.getElementById('mute');

  startButton.addEventListener('click', g.startButtonHandler)

  volDown.addEventListener('click', () => {
    if (g.audio) {
      if (g.currVolume > 0) {
        g.currVolume -= .1;
        g.currVolume = Math.round(g.currVolume * 10) / 10;
        g.changeVolume(g.currVolume);
      }
    }
  })

  volUp.addEventListener('click', () => {
    if (g.audio) {
      if (g.currVolume < 1) {
        g.currVolume += .1;
        g.currVolume = Math.round(g.currVolume * 10) / 10;
        g.changeVolume(g.currVolume);
      }
    }
  })

  muteButton.addEventListener('click', () => {
    if (g.audio) {
      if (g.audio.volume > 0) {
        g.currVolume = g.audio.volume
        g.changeVolume(0);
      } else {
        g.changeVolume(g.currVolume);
      }
    }
  })
  console.log('DOM fully loaded and parsed');
})