class Chartv2 {
  constructor(chartOpts) {
    this.directory = chartOpts['stepDir'];
    this.audio = new Audio(chartOpts['audioDir']);
    this.background = chartOpts['bgDir'];
    this.banner = chartOpts['bannerDir'];
    this.metadata;
    this.difficulties = [];
    this.syncChart();
  }

  syncChart() {
    this.getChartInfo(this.directory)
  }
  
  async getChartInfo(dir) {
    // let chart = await fetch('../../assets/chart/drop_pop_candy/drop_pop_candy.ssc').then(res => res.text());
    const startTime = Date.now();
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

    this.metadata = metaAndDiffs[0].map(datum => {
      return datum.slice(1, datum.length - 1)
    });

    for (let i = 1; i < metaAndDiffs.length; i++) {
      const diff = metaAndDiffs[i];
      this.difficulties.push(this.getMeasures(diff))
    }
  }

  getMeasures(difficulty) {
    let steps = {};
    let chart = {
      "steps": steps,
      "difficulty": difficulty[5].slice(12, difficulty[5].length - 1),
      "rating": parseInt(difficulty[6].slice(7, difficulty[6].length - 1)),
      "stepCount": 0,
      "mineCount": 0,
      "startPoint": 0
    };
    let currentMeasure = 0;
    for (let g = 10; g < difficulty.length; g++) {
      let line = difficulty[g];
      if (line.startsWith(',') || line.startsWith('//')) {
        currentMeasure += 1
        continue
      } else if ('01234M'.includes(line[0])) {
        if (!chart['startPoint'] 
          && (line.includes('1') || line.includes('2') || line.includes('4'))){
          chart['startPoint'] = currentMeasure;
          }  
        steps[currentMeasure] ||= [];
        steps[currentMeasure].push(line)
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '1' || line[i] === '2' || line[i] === '4') {
            chart["stepCount"] += 1
          }
          if (line[i] === 'M') chart["mineCount"] += 1;
        }
      } else {
        continue;
      }
    }
    chart['measureCount'] = currentMeasure;
    return chart
  }

  getQuantizationDelay(quantization, bpm) {
    const minuteInMs = 60000;
    const beatTimeInMs = minuteInMs / bpm;
    return beatTimeInMs / quantization
  }
}

module.exports = Chart;