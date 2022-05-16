const Game = require("./game");
const Keymaster = require('../keymaster.js');

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
    this.diff = 3;
    this.currVolume = .5;

    this.startButtonHandler = this.startButtonHandler.bind(this);
    this.startButton = document.getElementById('start')
    this.restartGame = this.restartGame.bind(this);
  }

  // Helper to remove menus from display, initialize game based on menu options
  // that were selected.
  startButtonHandler() {
    // Set variables for HTML elements.
    const menu = document.getElementById('information-display');
    const optMenu = document.getElementById('game-opts');
    const inGameOverlay = document.getElementById('in-game-overlay');
    const stepStats = document.getElementById('step-statistics-block');

    // Hide menus, and display in-game elements and overlay.
    optMenu.style.display = "none";
    menu.style.display = "none";
    inGameOverlay.style.display = "block";
    stepStats.style.display = "block";

    // Start game
    this.start(this.diff);
    this.startButton.textContent = "Game Started!"; // ADD DIFFICULTY IN HERE FROM DROPDOWN
    // this.startButton.removeEventListener('click', this.startButtonHandler)
  }

  // Helper to delay the start of the game based on scroll speed, and song start.
  // Not sure how the numbers came up but its a combination between scroll speed
  // and how many empty measures are at the beginning of the song.
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

  // for raf refactor - Done but on another branch.
  startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
  }

  // Helper to start game
  start() {
    this.game.getStepsAndCount(this.diff);
    let startPoint = this.getStartDelay();

    // Set interval attribute, and increment unless win or fail.
    this.interval = setInterval(() => {
      this.game.step();
      if (!this.game.isAlive) {
        this.gameFail();
      }
      if (this.game.chartFinished && !this.game.arrows.length) {
        this.gameWin();
      }
    }, 20);

    // Set syncing message on screen so that the game doesn't feel broken
    // when starting, since the delay is quite long on lower difficulties.
    const messageMessage = document.getElementById('message-message');
    const messageScreen = document.getElementById('message-screen');
    messageMessage.textContent = "Attempting to sync..."
    messageScreen.style.display = "block";

    // Start audio after "sync" and adjust volume, remove sync message.
    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.5);
      messageScreen.style.display = "none";
    }, startPoint) // the bigger this number, the later the chart

    // Generate arrows while the above setTimeout goes.
    this.game.startChart();
  }

  // Conditional helper for when the game is won and the chart ends.
  gameWin() {
    // remove interval
    clearInterval(this.interval);

    // get HTML elements
    const judgeText = document.getElementById('judgement');
    const endMessage = document.getElementById('end-message');
    const endScreen = document.getElementById('end-screen');

    // Remove judgement font, and display congratulation screen with score.
    judgeText.style.display = 'none';
    endMessage.textContent = `Congratulations, you finished with a score of
    ${this.game.getMoneyScore()}%. Thank you for playing.`
    endScreen.style.display = "block";
  }

  // Helper to determine loss message based on what happened last.
  astralReaper() {
    if (this.game.slayer.isAMine) {
      return "Your life depleted when you hit a mine."
    } else {
      // This is separated for grammar. "an up" vs "a up".
      if (this.game.slayer.direction === 'up') {
        return "Your life depleted when you missed an up arrow."
      } else {
        return `Your life depleted when you missed a ${this.game.slayer.direction} arrow.`
      }
    }
  }

  // Conditional method for when game is lost.
  gameFail() {
    // Stop audio, remove arrows, and clear interval.
    this.audio.pause();
    this.game.arrows = [];
    clearInterval(this.interval);

    // Gather and gray out the step statistics.
    const chartStats = document.getElementsByClassName('chart-stats');
    for (let ele of chartStats) {
      ele.style.filter = "grayscale(100%)";
    }

    const stepStats = document.getElementsByClassName('ss-judgement');
    for (let ele of stepStats) {
      ele.style.filter = null
    }

    // Gather end message and screen elements, and set their content.
    const endMessage = document.getElementById('end-message');
    const endScreen = document.getElementById('end-screen');
    
    endMessage.textContent = `You failed. Please try again, you had 
    ${this.game.difficulty.stepCount - this.game.hits} arrows left. ${this.astralReaper()}`

    endScreen.style.display = "block";
    window.canvasEl.style.filter = "grayscale(100%)";
  }

  // Method to restart game, invoked when restart is pressed on end screen.
  restartGame() {
    // Clear interval, and canvas
    clearInterval(this.interval);
    ctx.clearRect(0, 0, 1280, 960);

    // Gather Menus, and in-game overlay elements.
    const menu = document.getElementById('information-display');
    const optMenu = document.getElementById('game-opts');
    const inGameOverlay = document.getElementById('in-game-overlay');
    const stepStatsBlock = document.getElementById('step-statistics-block');
    const stepStats = document.getElementsByClassName('ss-judgement');
    const chartStats = document.getElementsByClassName('chart-stats');
    const judgeText = document.getElementById('judgement');

    // Remove filters (grayscale)
    for (let ele of chartStats) {
      ele.style.filter = null
    }
    
    for (let ele of stepStats) {
      ele.style.filter = null
    }
    
    // Show menus, and hide in-game overlays.
    menu.style.display = "block";
    optMenu.style.display = "none";
    inGameOverlay.style.display = "none";
    stepStatsBlock.style.display = "none";
    judgeText.style.display = "none";
    
    // Set parameters for a new game, and hide fail screen.
    const gameOpts = Options.gameOpts();
    this.game = new Game(gameOpts);
    this.startButton = document.getElementById('start');
    this.startButton.textContent = "Start Game";
    
    const failScreen = document.getElementById('end-screen');
    failScreen.style.display = "none";

    window.canvasEl.style.filter = "grayscale(0%)";
  }

  // Helper to play audio
  playAudio() {
    this.audio = this.game.chart.audio;
    this.audio.play();  
  }

  // Helper to adjust audio volume on click. the buttons are coded to increment
  // by tenths.
  changeVolume(num) {
    this.audio.volume = num;
  }

  // Menu toggle helper, only menu or options can be open at a time.
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