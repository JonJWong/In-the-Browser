  <img src="https://github.com/JonJWong/In-the-Browser/blob/main/assets/images/inthebrowser.jpg" alt="In_the_Browser2_banner"
  style="display: block; width: 50%; height: auto; margin: 0 auto"></img>  
  Welcome to In the Browser! This is a fun and interactive Javascript based spin-off of In the Groove 2, which is a rhythm game where you have to hit the arrows on screen when they reach the targets. There will be a song selected, and multiple difficulties per song.

  The arrows will come up the screen, according to the rhythm of the song, and depending on how close to the beat you press they correct key, you will be rewarded more points. Your final score will be shown to you once you pass a song, but if your lifebar reaches 0 from missing too many notes in succession, you will fail!

  <img src="https://media.giphy.com/media/ICXY2WEioV8GAiMlHp/giphy.gif" alt="gameplay_demo" style="display: block; margin: 0 auto"></img>  
  <a href="https://jonjwong.github.io/In-the-Browser/" style="text-align: center; display: block; margin: 0 auto;">Live Link</a>

#
## Features / MVPs

In the main menu, there will be a button to start the song, as well as an options button to get to the options menu.

Inside of the options menu, users will be able to:
- Select song difficulty, and scroll rate, and then return to the main menu.

During Gameplay:
- Arrows are generated from an `.ssc` file that is taken from an original simfile (SM5).
- There will be the player's lifebar at the top of the screen. If this reaches 0, you fail!
- While the song plays, judgements are reflected live, on-screen within the statistics block, as well as on the lane when an arrow is pressed.
- A combo counter will appear when arrows are hit, that reflects how many arrows were hit in succession without missing.
- Points and score are awarded based on how accurately the arrows are hit, and current score is displayed in a percentage on the right hand side.
- Users can mute/unmute the song audio, as well as restart the song with a button that appears on pass/fail.

When the song ends:
- If the user has failed, the background and elements will begin to gray-out. Then, an option to restart the game will be presented, as well as a count of how many arrows were left to hit, and why the user failed.
- If the user did not fail, and the song ends, a congratulations screen will be shown, along with an option to play again.

#
## Key functions and logic

The steps are read from a file, and when they are re-generated as arrows, they go through an asynchronous loop with a timer.
```javaScript
const timer = ms => new Promise(res => setTimeout(res, ms))
```
The loop first iterates through the measures of the song, and within the measure, for every note, the timer is called. The delay between notes is set by this helper method:
```javaScript
getDelay(bpm, quantization) {
  const minuteInMs = 60000;
  return minuteInMs / ((quantization / 4) * bpm) - 1
}
```
(the `- 1` takes 1 millisecond away from the delay added to the loop to take into account the natural delay in asynchronous functions.)

With keymaster.js, I was able to bind inputs without relying on `"keyUp"` and `"keyDown"` `eventListeners`, which would crowd the event loop. *(any additional functions added to the queue will introduce lag in the steps while it is still generating, resulting in the rest of the arrows being off-sync.)*
```javaScript
bindKeys() {
  key('left', () => this.game.checkKeyPress('left'));
  key('down', () => this.game.checkKeyPress('down'));
  key('up', () => this.game.checkKeyPress('up'));
  key('right', () => this.game.checkKeyPress('right'));
}
```
All the arrows are sourced from one image so there would not have to be one image per arrow direction, and in order to do that, before each arrow gets rendered I rotated the canvas to draw it, and then reset the rotation. Inside of that function, I also incremented the rotation of the mine that was being rendered so that they spin.
```javaScript
  render(ctx) {
    if (this.isAMine) {
      this.rotation += .1
    }
    ctx.setTransform(this.scale, 0, 0, this.scale, this.pos[0], this.pos[1]);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2)
    ctx.setTransform(1,0,0,1,0,0)
  }
  ```
#
### Technologies used
- javaScript handles the logic of the game.
- Vanilla JS to handle HTML element interaction, as well as button interaction.
- <a href="https://github.com/madrobby/keymaster">Keymaster.js</a> to handle key inputs.
- Canvas API to draw dynamic objects such as arrows, targets, lifebar.
- `.ssc` files from Stepmania 5 hold the steps for the song, which are then parsed out via JS.
- Webpack and Babel.JS to transpile the scripts

#
### Future Plans
- Add a pause button, maybe bound to `"Space"`
- Refactor the logic to use `requestAnimationFrame()` instead of `setInterval()`
- Add the ability to upload custom songs.
- Add the ability to scroll from top to bottom, as well as to change noteskin.
- Change volume buttons to a volume slider.
- Add the ability to use custom keybinds for arrows.

#
### Credit:
- Peter's scalable noteskins for SM5
- Benpai for Notice Me Benpai 2 charts
- Dom-ITG for the amazing banners for In The Browser
- <a href="https://github.com/Simply-Love/Simply-Love-SM5">Simply Love ITG</a> team for font, color theme inspiration, and design inspiration.
- <a href="https://www.dafont.com/wendy.font">Wendy Font</a>
- <a href="https://www.dafont.com/bebas-neue.font">Bebas-neue Font</a>

<p style="display: none">Changes to add:
Freis:
Make options save and carry over between plays.
Add some delay to when the results screen shows up after fail.
Fix CSS or make it more scalable for options menu, still too crowded.
</p>