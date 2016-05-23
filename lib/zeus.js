var Toggle = require('./toggle');

function Zeus(context) {
  this.toggle = new Toggle();
  this.projectiles = [];
  this.context = context;
  this.towers = [];
  this.targets = [];
  this.cannonBarrel = {};
}

// Zeus.prototype.cannonCoordinates(){
//   return {x: 1, y: 2, z:3};
// }

module.exports = Zeus;
