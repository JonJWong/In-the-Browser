const Game = require("./game");
const Keymaster = require('../keymaster.js');

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
    this.diff = 9;
    this.currVolume = .5;

    this.startButtonHandler = this.startButtonHandler.bind(this);
    this.startButton = document.getElementById('start')
    this.restartGame = this.restartGame.bind(this);
  }

  startButtonHandler() {
    const menu = document.getElementById('information-display');
    const optMenu = document.getElementById('game-opts');
    const inGameOverlay = document.getElementById('in-game-overlay');
    const stepStats = document.getElementById('step-statistics-block');

    optMenu.style.display = "none";
    menu.style.display = "none";
    inGameOverlay.style.display = "block";
    stepStats.style.display = "block";

    this.start(this.diff);
    this.startButton.textContent = "Game Started!"; // ADD DIFFICULTY IN HERE FROM DROPDOWN
    // this.startButton.removeEventListener('click', this.startButtonHandler)
  }

  getStartDelay() {
    const speed = this.game.speed;
    const diff = this.diff;

    switch(diff) {
      case 2: case 3:
        switch(speed) {
          case 3:
            return 12615
          case 5:
            return 10465
          case 10:
            return 8890
        }
      case 6: case 8: case 9:
        switch (speed) {
          case 3:
            return 5300
          case 5:
            return 3180
          case 10:
            return 1540
        }
    }
  }

  start() {
    this.game.getStepsAndCount(this.diff);
    let startPoint = this.getStartDelay();

    this.interval = setInterval(() => {
      this.game.step();
      if (!this.game.isAlive) {
        this.gameFail();
      }
      if (this.game.chartFinished && !this.game.arrows.length) {
        this.gameWin();
      }
    }, 20);

    const messageMessage = document.getElementById('message-message');
    const messageScreen = document.getElementById('message-screen');
    messageMessage.textContent = "Attempting to sync..."
    messageScreen.style.display = "block";

    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.5);
      messageScreen.style.display = "none";
    }, startPoint) // the bigger this number, the later the chart

    this.game.startChart();
  }

  gameWin() {
    clearInterval(this.interval);
    const judgeText = document.getElementById('judgement');
    judgeText.style.display = 'none';
    this.audio.pause();
    const endMessage = document.getElementById('end-message');
    endMessage.textContent = `Congratulations, you finished with a score of
    ${this.game.getMoneyScore()}% If you wish to play again, please press restart and choose
    your settings`
    const endScreen = document.getElementById('end-screen');
    endScreen.style.display = "block";
  }

  astralReaper() {
    if (this.game.slayer.isAMine) {
      return "Your life depleted when you hit a mine."
    } else {
      if (this.game.slayer.direction === 'up') {
        return "Your life depleted when you missed an up arrow."
      } else {
        return `Your life depleted when you missed a ${this.game.slayer.direction} arrow.`
      }
    }
  }

  gameFail() {
    this.audio.pause();
    this.game.arrows = [];
    const endMessage = document.getElementById('end-message');
    endMessage.textContent = `You failed. Please try again, you had 
    ${this.game.difficulty.stepCount - this.game.hits} arrows left. ${this.astralReaper()}`
    const endScreen = document.getElementById('end-screen');
    endScreen.style.display = "block";
  }

  restartGame() {
    ctx.clearRect(0, 0, 1280, 960);
    const menu = document.getElementById('information-display');
    const optMenu = document.getElementById('game-opts');
    const inGameOverlay = document.getElementById('in-game-overlay');
    const stepStats = document.getElementById('step-statistics-block');
    const judgeText = document.getElementById('judgement');
    
    menu.style.display = "block";
    optMenu.style.display = "none";
    inGameOverlay.style.display = "none";
    stepStats.style.display = "none";
    judgeText.style.display = "none";
    
    clearInterval(this.interval);
    
    const gameOpts = Options.gameOpts();
    this.game = new Game(gameOpts);
    this.startButton = document.getElementById('start');
    this.startButton.textContent = "Start Game";
    const failScreen = document.getElementById('end-screen');
    failScreen.style.display = "none";
  }

  playAudio() {
    this.audio = this.game.chart.audio;
    this.audio.play();  
  }

  changeVolume(num) {
    this.audio.volume = num;
  }

  openCloseOpts() {
    const mainMenu = document.getElementById('information-display');
    const optsMenu = document.getElementById('game-opts');
    let mainCurStyle = mainMenu.style['display'];
    if (mainCurStyle === 'none') {
      mainMenu.style.display = 'block';
      optsMenu.style.display = 'none';
    } else {
      mainMenu.style.display = 'none';
      optsMenu.style.display = 'block';
    }
  }

  bindKeys() {
    key('left', () => this.game.checkKeyPress('left'));
    key('down', () => this.game.checkKeyPress('down'));
    key('up', () => this.game.checkKeyPress('up'));
    key('right', () => this.game.checkKeyPress('right'));
  }
}

module.exports = GameView;