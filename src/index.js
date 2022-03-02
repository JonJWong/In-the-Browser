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
  const optionsButton = document.getElementById('options-btn');
  const volDown = document.getElementById('vol-down');
  const volUp = document.getElementById('vol-up');
  const muteButton = document.getElementById('mute');
  const diffButton = document.getElementsByClassName('difficulty-button');
  const speedButton = document.getElementsByClassName('speed-button');
  const backButton = document.getElementById('back');

  for (let button of speedButton) {
    if (button.dataset.speed === '5') button.classList.add('speed-selected');
    button.addEventListener('click', () =>{
      g.game.speed = parseInt(button.dataset.speed)
    })
  }
  
  for (let button of diffButton) {
    if (button.dataset.number === '9') button.classList.add('difficulty-selected');
    button.addEventListener('click', () =>{
      g.diff = parseInt(button.dataset.number)
    })
  }

  startButton.addEventListener('click', g.startButtonHandler)
  optionsButton.addEventListener('click', g.openCloseOpts)

  backButton.addEventListener('click', g.openCloseOpts)

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
        g.currVolume = g.audio.volume;
        g.changeVolume(0);
        muteButton.textContent = "Mute"
      } else {
        g.changeVolume(g.currVolume);
        muteButton.textContent = "Unmute"
      }
    }
  })
  console.log('DOM fully loaded and parsed');
})