class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['stepDir'];
    this.audio = chartOpts['audioDir'];
    this.metadata;
    this.difficulties = [];
    this.getChartInfo(this.directory);
  }

  async getChartInfo(dir) {
    // let chart = await fetch('../../assets/chart/drop_pop_candy/drop_pop_candy.ssc').then(res => res.text());
    let chart = await fetch(dir).then(res => res.text());
    let chartRows = chart.split("\r\n");
    let metaAndDiffs = [];
    let breakpoint = 0;
    
    let doneParsing = false;
    while (!doneParsing) {
      doneParsing = true;
      let currentPart = [];
      
      for(let i = breakpoint; i < chartRows.length; i++) {
        
        if (chartRows[i].includes('//--')) {
          breakpoint = i + 1;
          doneParsing = false;
          break;
        }
        currentPart.push(chartRows[i]);
      }
      metaAndDiffs.push(currentPart)
    }
    
    this.metadata = metaAndDiffs.slice(0, 1);
    metaAndDiffs.forEach((diff, i) => {
      if (i !== 0) {
        this.difficulties.push(this.getMeasures(diff))
      }
    })
  }

  getMeasures(difficulty) {
    let chart = {};
    let measure = 0;
    for (let g = 10; g < difficulty.length; g++) {
      let line = difficulty[g];
      if (line.startsWith(',') || line.startsWith('//')) {
        measure += 1
        continue
      } else if ('01234M'.includes(line[0])) {
        chart[measure] ||= [];
        chart[measure].push(line)
      } else {
        continue;
      }
    }
    return chart
  }
}

module.exports = Chart;