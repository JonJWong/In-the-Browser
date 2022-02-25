const Arrow = require('./arrow.js');

class Receptor {
  constructor(num) {
    this.receptors = [];
    this.addReceptors(num);
  }

  // This is hard-coded for 4 panels, need to refactor to make scalable
  addReceptors(num) {
    const receptorOpts = {
      imgUrl: '/assets/images/Arrow.png',
      pos: [50, 50],
      vel: [0, 0]
    }
    for (let i = 0; i < num; i++) {
      switch (i) {
        case 0:
          receptorOpts['direction'] = 'left'
          this.receptors.push(new Arrow(receptorOpts))
        case 1:
          receptorOpts['direction'] = 'down'
          this.receptors.push(new Arrow(receptorOpts))
        case 2:
          receptorOpts['direction'] = 'right'
          this.receptors.push(new Arrow(receptorOpts))
        case 3:
          receptorOpts['direction'] = 'up'
          this.receptors.push(new Arrow(receptorOpts))
      }
      receptorOpts['pos'][0] += 75;
    }
  }

  render() {
    this.receptors.forEach(rec => {
      rec.draw(ctx)
    })
  }
}

module.exports = Receptor;