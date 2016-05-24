var Toggle = require('./toggle');

function Zeus(context) {
  this.toggle = new Toggle();
  this.projectiles = [];
  this.context = context;
  this.towers = [];
  this.targets = [];
  this.cannonBarrel = {};
}

module.exports = Zeus;
