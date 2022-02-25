class PlayArea {
  constructor(playAreaOptions) {
    this.lane = playAreaOptions["lane"];
    this.lifebar = playAreaOptions["lifebar"];
    this.receptors = playAreaOptions["receptors"];
    this.arrows = [];
  }
}

module.exports = PlayArea;