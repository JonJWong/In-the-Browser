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
    this.darkened = 0;
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

  start() {
    // ORIGINAL : 3240 for speed 5
    // 7392 = FIRST ARROW MS AFTER AUDIO STARTS
    // ALSO THE DELAY BEFORE THE FIRST ARROW IF LINE 50 IS 0
    // AUDIO PLAYS FOR 4 MEASURES
    // NEED TO CLOSE THE GAP BY BRINGING THE AUDIO 4 MEASURES CLOSER
    // ~3696 to get to the top (8 beats)
    // time to top = 7401
    // 648 u/s at speed 5
    this.game.getStepsAndCount(this.diff);
    let startPoint = 0;
    let speed = this.game.speed
    switch (this.diff) {
      case 2: case 3:
        startPoint = 5058;
        break;
      case 6: case 8: case 9:
        startPoint = 3240;
        break;
    }

    this.interval = setInterval(() => {
      this.game.step();
      if (!this.game.isAlive) {
        this.gameFail();
      }
      if (this.game.isFinished && !this.game.arrows.length) {
        this.gameWin();
      }
    }, 20);

    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.5);
    }, startPoint) // the bigger this number, the later the chart
    this.game.startChart();
  }

  gameWin() {
    clearInterval(this.interval);
    this.audio.pause();
    const endMessage = document.getElementById('end-message');
    endMessage.textContent = `You passed. Congratulations, you finished with a score of
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
    const menu = document.getElementById('information-display');
    const optMenu = document.getElementById('game-opts');
    const inGameOverlay = document.getElementById('in-game-overlay');
    const stepStats = document.getElementById('step-statistics-block');
    const failScreen = document.getElementById('fail-screen');

    menu.style.display = "block";
    optMenu.style.display = "none";
    inGameOverlay.style.display = "none";
    stepStats.style.display = "none";
    failScreen.style.display = "none";

    clearInterval(this.interval);

    const gameOpts = Options.gameOpts();
    this.game = new Game(gameOpts);
    this.startButton.textContent = "Start Game";
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
    optsMenu.style.display = optsMenu.style.display === 'none' ? 'none' : 'block';
    mainMenu.style.display = mainMenu.style.display === 'none' ? 'block' : 'none';
  }

  bindKeys() {
    key('left', () => this.game.checkKeyPress('left'));
    key('down', () => this.game.checkKeyPress('down'));
    key('up', () => this.game.checkKeyPress('up'));
    key('right', () => this.game.checkKeyPress('right'));
  }
}

module.exports = GameView;