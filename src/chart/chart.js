class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['directory'];
    this.chart = getChartInfo(this.directory);
    this.difficulties = [];
    this.audio = [];
  }

  getChartInfo(dir) {
    // let chart = await fetch('../../assets/chart/drop_pop_candy/drop_pop_candy.txt').then(res => res.text());
    let chart = await fetch(`${dir}`).then(res => res.text()).then(text => text)
    chart = chart.split("\r\n");
    return chart
  }

  parseDifficulties(chart) {
    
  }

}

module.exports = Chart;