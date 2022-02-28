class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['stepDir'];
    this.audio = new Audio(chartOpts['audioDir']);
    this.background = chartOpts['bgDir'];
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
    let steps = {};
    let chart = {
      "steps": steps,
      "difficulty": difficulty[5].slice(12, difficulty[5].length - 1),
      "rating": difficulty[6].slice(7, difficulty[6].length - 1),
      "stepCount": 0
    };
    let measure = 0;
    for (let g = 10; g < difficulty.length; g++) {
      let line = difficulty[g];
      if (line.startsWith(',') || line.startsWith('//')) {
        measure += 1
        continue
      } else if ('01234M'.includes(line[0])) {
        steps[measure] ||= [];
        steps[measure].push(line)
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '1' || line[i] === '2' || line[i] === '4') {
            chart["stepCount"] += 1
          }
        }
      } else {
        continue;
      }
    }
    return chart
  }
}

module.exports = Chart;