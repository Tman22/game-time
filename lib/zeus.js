var Toggle = require('./toggle');

function Zeus() {
  this.projectileCoord = {};
  this.toggle = new Toggle();
  this.canvas = document.getElementById('game');
  this.projectiles = [];
}

module.exports = Zeus;
