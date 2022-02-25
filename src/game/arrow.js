const OnScreenElement = require('./on_screen_element.js')

class Arrow extends OnScreenElement {
  constructor(arrowOptions) {
    super(arrowOptions)
    this.direction = arrowOptions['direction'];
    this.receptor = false;
  }
}

module.exports = Arrow;