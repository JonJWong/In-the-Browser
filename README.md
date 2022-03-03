  <img src="https://github.com/JonJWong/In-the-Browser/blob/main/assets/images/inthebrowser.jpg" alt="In_the_Browser2_banner"
  style="display: block; width: 50%; height: auto; margin: 0 auto"></img>  
  Welcome to In the Browser! This is a fun and interactive Javascript based spin-off of In the Groove, which is a rhythm game where you have to hit the arrows on screen when they reach the targets. There will be a song selected, and multiple difficulties per song.

  The arrows will come up the screen, according to the rhythm of the song, and depending on how close to the beat you press they correct key, you will be rewarded more points. Your final score will be shown to you once you pass a song, but if your lifebar reaches 0 from missing too many notes in succession, you will fail!

  <img src="https://media.giphy.com/media/ICXY2WEioV8GAiMlHp/giphy.gif" alt="gameplay_demo" style="display: block; margin: 0 auto"></img>  
  <a href="https://jonjwong.github.io/In-the-Browser/" style="text-align: center; display: block; margin: 0 auto;">Live Link</a>

#
## Features / MVPs

In the main menu, there will be a button to start the song, as well as an options button to get to the options menu.

Inside of the options menu, users will be able to:
- Select song difficulty, and scroll rate, and then return to the main menu.

During Gameplay:
- Arrows are generated from an SSC file that is taken from an original simfile (SM5).
- There will be the player's lifebar at the top of the screen. If this reaches 0, you fail!
- While the song plays, judgements are reflected live, on-screen within the statistics block, as well as on the lane when an arrow is pressed.
- A combo counter will appear when arrows are hit, that reflects how many arrows were hit in succession without missing.
- Points and score are awarded based on how accurately the arrows are hit, and current score is displayed in a % on the right hand side.
- Users can mute/unmute the song audio, as well as restart the song with a button that appears on pass/fail.

When the song ends:
- If the user has failed, the background and elements will begin to gray-out. Then, an option to restart the game will be presented, as well as a count of how many arrows were left to hit, and why the user failed.
- If the user did not fail, and the song ends, a congratulations screen will be shown, along with an option to play again.

#
## Key functions and logic



#
### Technologies used
- Javascript handles the logic of the game.
- Vanilla JS to handle HTML element interaction, as well as button handling.
- Keymaster.js to handle key inputs.
- Canvas API to draw dynamic objects such as arrows, targets, lifebar.
- SSC files from Stepmania 5 hold the steps for the song, which are then parsed out via JS.
- Webpack and Babel.JS to transpile the scripts

#
### Future Plans
- Add a pause button, maybe bound to "Space"
- Refactor the logic to use requestAnimationFrame() instead of setInterval()
- Add the ability to upload custom songs.
- Add the ability to scroll from top to bottom, as well as to change noteskin.
- Change volume buttons to a volume slider.
- Add the ability to use custom keybinds for arrows.

#
### Credit:
- Benpai for Notice Me Benpai 2 charts
- Peter's scalable noteskins for SM5
- <a href="https://www.dafont.com/wendy.font">Wendy Font</a>
- <a href="https://www.dafont.com/bebas-neue.font">Bebas-neue Font</a>