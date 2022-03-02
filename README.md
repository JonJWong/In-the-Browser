# In-the-Browser
  Welcome to In the Browser! This is a fun and interactive Javascript based spin-off of In the Groove, which is a rhythm game where you have to hit the arrows on screen when they reach the targets. There will be a song selected, and multiple difficulties per song.
  
  The arrows will come up the screen, according to the rhythm of the song, and depending on how close to the beat you press they correct key, you will be rewarded more points. Your final score will be shown to you once you pass a song, but if your lifebar reaches 0 from missing too many notes in succession, you will fail!

  <a href="https://jonjwong.github.io/In-the-Browser/">Live Link</a>

#
## Features / MVPs

- Users can select a difficulty for the current song
- When the song finishes, they will be shown a summary screen which has their gameplay stats, like points and judgements
- Users can mute/unmute the song audio, as well as restart the song with a button

#
## Wireframe

<img src="https://github.com/JonJWong/In-the-Browser/blob/main/assets/images/wireframe.png"></img>

- In the "Main Game Area", the game would be on standby until the game is started
- In the "Step Statistics and instructions" area, there will be your score summary, as well as the instructions on how to play the game.
- In the "Navigation Area", there will be buttons to restart the game, control the volume, and other options if necessary.

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
- Add the ability to upload custom songs
- Add the ability to change song options through an options menu (scroll rate, note skin)
- Add a volume slider
- Custom keybinds to assign preferred keys to arrows

#
### Credit:
- Benpai for Notice Me Benpai 2 charts
- Peter's scalable noteskins for SM5
- <a href="https://www.dafont.com/wendy.font">Wendy Font</a>
- <a href="https://www.dafont.com/bebas-neue.font">Bebas-neue Font</a>