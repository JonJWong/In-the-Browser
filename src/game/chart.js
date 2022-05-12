class Chart {
  constructor(chartOpts) {
    this.directory = chartOpts['stepDir'];
    this.audio = new Audio(chartOpts['audioDir']);
    this.background = chartOpts['bgDir'];
    this.banner = chartOpts['bannerDir'];
    this.metadata;
    this.difficulties = [];
    this.syncChart();
  }

  // Helper to call the methods below synchronously
  // Not quite sure why this is needed, some JS language behavior to understand.
  // Bottom 3 functions are asnychronous, and this calls them all synchronously?
  syncChart() {
    this.getChartInfo(this.directory)
  }
  
  async getChartInfo(dir) {
    // Fetch chart info from file, and then split it into an array where each row
    // is an item in the array.
    let chart = await fetch(dir).then(res => res.text());
    let chartRows = chart.split("\r\n");
    let metaAndDiffs = [];
    let breakpoint = 0;
    
    // Segmented incrementation through the chart, creating new arrays based on
    // each section or measure of the chart, tracking the breakpoint along the way
    // This allows for multiple quantizations across measures.
    let doneParsing = false;
    while (!doneParsing) {
      doneParsing = true;
      let currentPart = [];
      
      // Iterate and populate the current part or measure of chart.
      for(let i = breakpoint; i < chartRows.length; i++) {
        
        // If the measure is over, set the breakpoint forward, and stop iterating
        // To finalize the current measure.
        if (chartRows[i].includes('//--')) {
          breakpoint = i + 1;
          doneParsing = false;
          break;
        }
        currentPart.push(chartRows[i]);
      }
      metaAndDiffs.push(currentPart)
    }

    // Parse metadata from the chart file
    this.metadata = metaAndDiffs[0].map(datum => {
      return datum.slice(1, datum.length - 1)
    });

    // Add difficulty to chart object
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
    let measure = 0;
    for (let g = 10; g < difficulty.length; g++) {
      let line = difficulty[g];
      if (line.startsWith(',') || line.startsWith('//')) {
        measure += 1
        continue
      } else if ('01234M'.includes(line[0])) {
        if (!chart['startPoint'] 
          && (line.includes('1') || line.includes('2') || line.includes('4'))){
          chart['startPoint'] = measure;
          }  
        steps[measure] ||= [];
        steps[measure].push(line)
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
    chart['measureCount'] = measure;
    return chart
  }
}

module.exports = Chart;