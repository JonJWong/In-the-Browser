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

  bluePopOpts() {
    const popOpts = {
      imgUrl: 'assets/images/bluepop.png',
      velocity: [0, 0],
      position: [70, 150],
      isAPop: true
    };
    return popOpts
  },

  yellowPopOpts() {
    const popOpts = {
      imgUrl: 'assets/images/yellowPop.png',
      velocity: [0, 0],
      position: [70, 150],
      isAPop: true
    };
    return popOpts
  },

  greenPopOpts() {
    const popOpts = {
      imgUrl: 'assets/images/greenPop.png',
      velocity: [0, 0],
      position: [70, 150],
      isAPop: true
    };
    return popOpts
  },

  purplePopOpts() {
    const popOpts = {
      imgUrl: 'assets/images/purplePop.png',
      velocity: [0, 0],
      position: [70, 150],
      isAPop: true
    };
    return popOpts
  },

  brownPopOpts() {
    const popOpts = {
      imgUrl: 'assets/images/brownPop.png',
      velocity: [0, 0],
      position: [70, 150],
      isAPop: true
    };
    return popOpts
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
      difficulty: 3
    }
    return gameOpts;
  },

  colors() {
    const colors = {
    FANTASTIC: 'rgba(33, 204, 232, 1)',
    EXCELLENT: 'rgba(226, 156, 24, 1)',
    GREAT: 'rgba(102, 201, 85, 1)',
    DECENT: 'rgba(180, 92, 255, 1)',
    WAYOFF: 'rgba(201, 133, 94, 1)'
    }
    return colors
  }
}

module.exports = Options;