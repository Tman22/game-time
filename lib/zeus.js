var Toggle = require('./toggle');

function Zeus(context) {
  this.projectileCoord = {};
  this.toggle = new Toggle();
  this.canvas = document.getElementById('game');
  this.projectiles = [];
  this.context = context;
  this.towers = [];
  this.targets = [];
  this.cannonBarrel = {};
}

module.exports = Zeus;
