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
  const diffButtons = document.getElementsByClassName('difficulty-button');
  const speedButtons = document.getElementsByClassName('speed-button');
  const hideButtons = document.getElementsByClassName('hide-button');
  const backButton = document.getElementById('back');

  function resetButtons(buttons) {
    for (let button of buttons) {
      if (button.dataset.selected === "true") {
        button.classList.remove('button-selected')
      }
      button.dataset.selected = "";
    }
  }

  for (let button of diffButtons) {
    button.addEventListener('click', () =>{
      resetButtons(diffButtons);
      button.dataset.selected = "true";
      button.classList.add('button-selected');
      g.diff = parseInt(button.dataset.number);
    })
  }

  for (let button of speedButtons) {
    button.addEventListener('click', () =>{
      resetButtons(speedButtons);
      button.dataset.selected = "true";
      button.classList.add('button-selected');
      g.game.speed = parseInt(button.dataset.speed);
    })
  }
  
  for (let button of hideButtons) {
    button.addEventListener('click', () =>{
      resetButtons(hideButtons);
      button.dataset.selected = "true";
      button.classList.add('button-selected');
      g.darkened = parseInt(button.value);
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