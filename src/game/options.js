const Options = {
  targetOpts() {
    const targetOpts = {
      imgUrl: 'assets/images/target.png',
      velocity: [0, 0],
      position: [70, 150],
      target: true
    };
    return targetOpts
  },

  arrowOpts() {
    const arrowOpts = {
      imgUrl: 'assets/images/target.png',
      velocity: [0, 0],
      position: [70, 960],
      target: false
    };
    return arrowOpts
  },

  chartOpts() {
    const chartOpts = {
      stepDir: 'assets/chart/drop_pop_candy/drop_pop_candy.ssc',
      audioDir: 'assets/chart/drop_pop_candy/drop_pop_candy.ogg',
      bgDir: 'assets/chart/drop_pop_candy/drop_pop_candy_bg.png',
      bannerDir: 'assets/chart/drop_pop_candy/drop_pop_candy_bn.png'
    }
    return chartOpts;
  },

  gameOpts() {
    const gameOpts = {
      numTargets: 4,
      speed: 5,
      chartOpts: this.chartOpts(),
      difficulty: 9
    }
    return gameOpts;
  },

  judgeOpts() {
    const judgeOpts = {
    }
    return judgeOpts;
  }
}

module.exports = Options;