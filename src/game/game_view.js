const Game = require("./game");
const Keymaster = require('../keymaster.js');

class GameView {
  constructor(gameOpts) {
    this.game = new Game(gameOpts);
    this.ctx = ctx;
    this.diff = 9;
    this.currVolume = .5;

    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;

    this.startButtonHandler = this.startButtonHandler.bind(this);
    this.startButton = document.getElementById('start')
    this.restartGame = this.restartGame.bind(this);
    this.animate = this.animate.bind(this);
  }

  startButtonHandler() {
    optMenu.style.display = "none";
    menu.style.display = "none";
    inGameOverlay.style.display = "block";
    stepStatsBlock.style.display = "block";

    this.start(this.diff);
    this.startButton.textContent = "Game Started!"; // ADD DIFFICULTY IN HERE FROM DROPDOWN
    // this.startButton.removeEventListener('click', this.startButtonHandler)
  }

  getStartDelay() {
    switch(this.diff) {
      case 2: case 3:
        switch(this.game.speed) {
          case 3:
            return 12615
          case 5:
            return 10465
          case 10:
            return 8890
        }
      case 6: case 8: case 9:
        switch (this.game.speed) {
          case 3:
            return 5300
          case 5:
            return 3180
          case 10:
            return 1540
        }
    }
  }

  animate() {
    this.frame = requestAnimationFrame(this.animate)
    
    this.game.currentFrameTime = Date.now();
    let timeBetweenFrames = this.game.currentFrameTime - this.game.previousFrameTime
    
    if (timeBetweenFrames > this.fpsInterval) {
      this.game.previousFrameTime = this.game.currentFrameTime - (timeBetweenFrames % this.fpsInterval);
      
      this.game.step();
      if (!this.game.isAlive) {
        this.gameFail();
      }
      if (this.game.chartFinished && !this.game.arrows.length) {
        this.gameWin();
      }
    }
  }

  start() {
    this.game.getStepsAndCount(this.diff);
    let startPoint = this.getStartDelay();
    this.game.previousFrameTime = Date.now();
    this.game.startTime = this.game.previousFrameTime;
    this.animate();

    theMessage.textContent = "Attempting to sync...";
    messageScreen.style.display = "block";

    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.5);
      messageScreen.style.display = "none";
    }, startPoint) // the bigger this number, the later the chart

    this.game.startChart();
    // it takes 6109ms to place first note
  }

  gameWin() {
    judgeText.style.display = 'none';

    endMessage.textContent = `Congratulations, you finished with a score of
    ${this.game.getMoneyScore()}%. Thank you for playing.`
    endScreen.style.display = "block";

    cancelAnimationFrame(this.frame);
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

    for (let ele of chartStats) {
      ele.style.filter = "grayscale(100%)";
    }

    for (let ele of stepStats) {
      ele.style.filter = null
    }

    endMessage.textContent = `You failed. Please try again, you had 
    ${this.game.difficulty.stepCount - this.game.hits} arrows left. ${this.astralReaper()}`
    endScreen.style.display = "block";
    window.canvasEl.style.filter = "grayscale(100%)";
    cancelAnimationFrame(this.frame);
  }

  restartGame() {
    cancelAnimationFrame(this.frame);
    ctx.clearRect(0, 0, 1280, 960);

    for (let ele of chartStats) {
      ele.style.filter = null
    }
    
    for (let ele of stepStats) {
      ele.style.filter = null
    }
    
    menu.style.display = "block";
    optMenu.style.display = "none";
    inGameOverlay.style.display = "none";
    stepStatsBlock.style.display = "none";
    judgeText.style.display = "none";
    endScreen.style.display = "none";
    
    const gameOpts = Options.gameOpts();
    this.game = new Game(gameOpts);
    this.startButton = startButton;
    this.startButton.textContent = "Start Game";

    window.clearButtons(diffButtons);
    window.clearButtons(speedButtons);
    window.clearButtons(hideButtons);
    
    window.canvasEl.style.filter = "grayscale(0%)";
  }

  playAudio() {
    this.audio = this.game.chart.audio;
    this.audio.play();  
  }

  changeVolume(num) {
    this.audio.volume = num;
  }

  openCloseOpts() {
    let mainCurStyle = menu.style['display'];
    if (mainCurStyle === 'none') {
      menu.style.display = 'block';
      optMenu.style.display = 'none';
    } else {
      menu.style.display = 'none';
      optMenu.style.display = 'block';
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