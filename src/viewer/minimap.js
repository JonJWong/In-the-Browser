const Chartv2 = require('./chart_v2');
const Options = require('../game/options');
const CHART_OPTS = Options.chartOpts();

class Minimap {
  constructor(CHART_OPTS) {
    this.chart = new Chartv2(CHART_OPTS);
    this.allInfo = this.chart.syncChart();

  }
}

export default Minimap;