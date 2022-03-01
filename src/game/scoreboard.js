class Scoreboard {
  constructor(game) {
    this.game = game;
    this.score = 0;
    this.maxScore = 0;
    this.fantastics = 0;
    this.excellents = 0;
    this.greats = 0;
    this.decents = 0;
    this.wayOffs = 0;
    this.minesTotal = 0;
    this.minesHit = 0;
    this.misses = 0;

    this.title = this.game.chart.metadata[1].slice(6);
    this.artist = this.game.chart.metadata[3].slice(7);
    this.banner = this.game.chart.banner;
  }
}

module.exports = Scoreboard;