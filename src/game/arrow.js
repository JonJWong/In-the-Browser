const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOptions) {
    this.direction = arrowOptions['direction'];
    this.receptor = false;
    super(arrowOptions['imgUrl'])
  }
}

module.exports = Arrow;