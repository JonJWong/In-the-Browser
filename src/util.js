const Arrow = require('./game/arrow.js');
const Options = require('./game/options.js')
const Util = {
  randomDirectionGenerator() {
    const dirs = ['left', 'down', 'up', 'right'];
    return dirs[Math.floor(Math.random() * 4)];
  },
};

module.exports = Util;