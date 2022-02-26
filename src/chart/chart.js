class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['directory'];
    // this.chart = getChartInfo(this.directory);
    this.difficulties = [];
    this.audio = [];
  }

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
}

module.exports = Chart;