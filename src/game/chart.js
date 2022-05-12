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
    // each section or difficulty of the chart. This is later expanded on with
    // the other helper below.
    let doneParsing = false;
    while (!doneParsing) {
      doneParsing = true;
      let currentPart = [];
      
      // Iterate and populate the current difficulty as rows.
      for(let i = breakpoint; i < chartRows.length; i++) {
        
        // If the difficulty is over, stop iterating and keep track of the breakpoint
        // So that iteration can continue on a new difficulty, on the next loop.
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

  // Helper to get the steps from the difficulty chunk.
  getMeasures(difficulty) {
    let steps = {};
    // Set new chart object metadata from difficulty chunk.
    let chart = {
      "steps": steps,
      "difficulty": difficulty[5].slice(12, difficulty[5].length - 1),
      "rating": parseInt(difficulty[6].slice(7, difficulty[6].length - 1)),
      "stepCount": 0,
      "mineCount": 0,
      "startPoint": 0
    };

    // Initialize measure count, and then iterate through chart where measures
    // exist.
    let measure = 0;
    for (let g = 10; g < difficulty.length; g++) {

      // Parse lines into array parts.
      let line = difficulty[g];
      if (line.startsWith(',') || line.startsWith('//')) {
        measure += 1
        continue
      } else if ('01234M'.includes(line[0])) {

        // Find the startpoint of the chart, some charts have empty space before
        // the arrows come. This is necessary because the arrows will not come up
        // on correct time if the empty space is not accurate.
        if (!chart['startPoint'] 
          && (line.includes('1') || line.includes('2') || line.includes('4'))){
          chart['startPoint'] = measure;
          }
        steps[measure] ||= [];
        steps[measure].push(line)

        // Iterate through the line, count the steps and mines for display later.
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

    // Finalize measurecount, and return chart object.
    chart['measureCount'] = measure;
    return chart
  }
}

module.exports = Chart;