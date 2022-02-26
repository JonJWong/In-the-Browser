class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['directory'];
    // this.chart = getChartInfo(this.directory);
    this.difficulties = [];
    this.audio = [];
  }
}

module.exports = Chart;