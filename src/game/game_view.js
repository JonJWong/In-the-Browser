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
  }

  startButtonHandler() {
    // this.game.speed = speed;
    const menu = document.getElementById('information-display');
    const optMenu = document.getElementById('game-opts')
    optMenu.style.display = "none";
    menu.style.display = "none";
    this.start(this.diff);
    this.startButton.textContent = "Game Started!"; // ADD DIFFICULTY IN HERE FROM DROPDOWN
    this.startButton.removeEventListener('click', this.startButtonHandler)
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

    setInterval(() => {
      this.game.step();
    }, 20);

    setTimeout(() => {
      this.playAudio();
      this.changeVolume(.5);
    }, startPoint) // the bigger this number, the later the chart
    this.game.startChart();
  }

  playAudio() {
    this.audio = this.game.chart.audio;
    this.audio.play();  
  }

  changeVolume(num) {
    this.audio.volume = num;
  }

  openCloseOpts() {
    const mainMenu = document.getElementById('information-display')
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