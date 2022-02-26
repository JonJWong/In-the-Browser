const Arrow = require('/src/game/arrow.js');

const Util = {
  targetOpts() {
    let targetOpts = {
      imgUrl: '/assets/images/Arrow.png',
      velocity: [0, 0],
      target: true
    };
    return targetOpts
  },

  arrowOpts() {
    let targetOpts = {
      imgUrl: '/assets/images/Arrow.png',
      velocity: [0, 0],
      target: true
    };
    return targetOpts
  },

  createTarget(i) {
    let targetOpts = this.targetOpts()
    switch (i) {
      case 0:
        targetOpts['direction'] = 'left';
        return new Arrow(targetOpts);
      case 1:
        targetOpts['direction'] = 'down';
        return new Arrow(targetOpts);
      case 2:
        targetOpts['direction'] = 'up';
        return new Arrow(targetOpts);
      case 3:
        targetOpts['direction'] = 'right';
        return new Arrow(targetOpts);
    }
  },

  getChartInfo(dir) {
    // let chart = await fetch('../../assets/chart/drop_pop_candy/drop_pop_candy.ssc').then(res => res.text());
    let chart = await fetch(dir).then(res => res.text()).then(text => text)
    chartRows = chart.split("\r\n");
    let finalParts = [];
    let doneParsing = false;
    let breakpoint = 0;

    while (!doneParsing) {
      doneParsing = true;
      let currentPart = [];

      for(let i = breakpoint; i < chartRows.length; i++) {
        currentPart.push(chartRows[i]);

        if (chartRows[i].startWith('//--')) {
          finalParts.push(currentPart);
          breakpoint = i + 1;
          doneParsing = false;
        }

      }
    }
    return finalParts
  }
};

module.exports = Util;