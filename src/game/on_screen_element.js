class OnScreenElement {
  constructor(oseOptions) {
    this.imgUrl = oseOptions['imgUrl']
  }

  draw(ctx) {
    ctx.drawImage(this.imgUrl, 100, 100)
  }
}

module.exports = OnScreenElement;