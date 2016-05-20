var Toggle = require('./toggle');

function Zeus(context) {
  this.projectileCoord = {};
  this.toggle = new Toggle();
  this.canvas = document.getElementById('game');
  this.projectiles = [];
  this.context = context
}

module.exports = Zeus;
