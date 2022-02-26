class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['directory'];
    this.chart = getChart(this.dir);
    this.difficulties = [];
  }

  getChart(dir) {
    // let chart = await fetch('../../assets/chart/dpc/dpc.txt').then(res => res.text()).then(text => console.log(text));
    let chart = await fetch(`${dir}`).then(res => res.text()).then(text => text)
    chart = chart.split("\r\n");
    return chart
  }

  getDifficulties(chart) {
    
  }

}

module.exports = Chart;