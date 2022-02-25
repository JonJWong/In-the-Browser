const Arrow = require('./arrow.js');

class Receptor {
  constructor(num) {
    this.receptors;
    this.addReceptors(num);
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  addReceptors(num) {
    const receptorOpts = {
      direction: 'left',
      imgUrl: '/assets/images/Arrow.png',
      pos: [50, 50],
      vel: [0, 0]
    }
    for (let i = 0; i < num; i++) {
      switch (i) {
        case 0:
          receptorOpts['direction'] = 'left'
        case 1:
          receptorOpts['direction'] = 'down'
        case 2:
          receptorOpts['direction'] = 'right'
        case 3:
          receptorOpts['direction'] = 'up'
      }
      let rec = new Arrow(opts);
      receptorOpts['pos'][0] += 75;
    }
  }
}

module.exports = Receptor;