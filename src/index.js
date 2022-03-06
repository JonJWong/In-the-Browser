window.addEventListener("DOMContentLoaded", (event) => {
  // document.querySelector('body').style.zoom = `${1 / window.devicePixelRatio * 100}%`;
  window.canvasEl = document.getElementById('game-canvas');
  window.ctx = canvasEl.getContext('2d');

  window.Game = require('./game/game.js');
  window.GameView = require('./game/game_view.js');
  window.Util = require('./util.js');
  window.Options = require('./game/options.js');
  window.Chart = require('./game/chart.js');

  window.gameOpts = Options.gameOpts();
  window.g = new GameView(gameOpts);
  g.bindKeys();
  
  window.menu = document.getElementById('information-display');
  window.startButton = document.getElementById('start');
  window.optionsButton = document.getElementById('options-btn');

  window.optMenu = document.getElementById('game-opts');
  window.diffButtons = document.getElementsByClassName('difficulty-button');
  window.speedButtons = document.getElementsByClassName('speed-button');
  window.hideButtons = document.getElementsByClassName('hide-button');
  window.backButton = document.getElementById('back');

  window.messageMessage = document.getElementById('message-message');
  window.messageScreen = document.getElementById('message-screen');

  window.inGameOverlay = document.getElementById('in-game-overlay');
  window.volDown = document.getElementById('vol-down');
  window.volUp = document.getElementById('vol-up');
  window.muteButton = document.getElementById('mute');

  window.judgeText = document.getElementById('judgement');
  window.stepStatsBlock = document.getElementById('step-statistics-block');
  window.stepStatsGrid = document.getElementsByClassName('ss-judgement-grid');
  window.stepStats = document.getElementsByClassName('ss-judgement');
  window.chartStats = document.getElementsByClassName('chart-stats');
  
  window.endMessage = document.getElementById('end-message');
  window.endScreen = document.getElementById('end-screen');
  window.restartButton = document.getElementById('restart');

  window.clearButtons = function(buttons) {
    for (let button of buttons) {
      
      if (button.dataset.selected === "true") {
        button.classList.remove('button-selected')
      }
      button.dataset.selected = "";
    }
  }

  for (let button of diffButtons) {
    if (parseInt(button.dataset.number) === g.diff) {
    button.classList.add('button-selected');
    } 
    
    button.addEventListener('click', () =>{
      clearButtons(diffButtons);
      button.dataset.selected = "true";
      button.classList.add('button-selected');
      g.diff = parseInt(button.dataset.number);
    })
  }

  for (let button of speedButtons) {
    if (parseInt(button.dataset.speed) === g.game.speed) {
      button.classList.add('button-selected');
    }
    
    button.addEventListener('click', () =>{
      clearButtons(speedButtons);
      button.dataset.selected = "true";
      button.classList.add('button-selected');
      g.game.speed = parseInt(button.dataset.speed);
    })
  }
  
  for (let button of hideButtons) {
    if (parseInt(button.value) === g.game.darkened) {
      button.classList.add('button-selected');
    }
    
    button.addEventListener('click', () =>{
      clearButtons(hideButtons);
      button.dataset.selected = "true";
      button.classList.add('button-selected');
      g.game.darkened = parseInt(button.value);
    })
  }

  startButton.addEventListener('click', g.startButtonHandler)
  optionsButton.addEventListener('click', g.openCloseOpts)
  backButton.addEventListener('click', g.openCloseOpts)
  restartButton.addEventListener('click', g.restartGame)

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
  console.log('Dom_ITG fully loaded and parsed');
})