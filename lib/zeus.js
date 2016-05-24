var Toggle = require('./toggle');

function Zeus(context) {
  this.toggle = new Toggle();
  this.projectiles = [];
  this.context = context;
  this.towers = [];
  this.targets = [];
  this.cannonBarrel = {};
  this.currentLevel = 'one';
}

Zeus.prototype.setCoordinates = function(testCoords, testToggle) {
  var coords = testCoords || this.cannonBarrel;
  coords.toggle = testToggle || this.toggle.y;
  return coords;
};

module.exports = Zeus;
