var CannonBase = require('./cannon_base');
var CannonBarrel = require('./cannon_barrel');
var Target = require('./target');
var createTowers = require('./create_towers');
var levelOpener = require('./level_opener');


var cannonBase = new CannonBase({x: 30, y: 360});
var cannonBarrel = new CannonBarrel(cannonBase);
var target1 = new Target({x: 720, y: 350, direction: 'up',   min: 200, max: 450});
var target2 = new Target({x: 720, y: 50,  direction: 'left', min: 300, max: 720});
var target3 = new Target({x: 365, y: 350, direction: 'down', min: 200, max: 450});
var target4 = new Target({x: 535, y: 210, direction: 'up', min: 200, max: 450});
var towers = createTowers('three');
var targets = [target1, target2, target3, target4];

function levelThree(Zeus) {
  cannonBase.draw(Zeus.context);
  Zeus.cannonBarrel = cannonBarrel;
  Zeus.towers = towers;
  Zeus.targets = targets;
  cannonBarrel.draw(Zeus.context);
  Zeus.toggle.draw(Zeus.context).move();
  towers.forEach(function(tower) {
    tower.draw(Zeus.context);
  });
  targets.forEach(function(target) {
    target.draw(Zeus.context).move();
  });
  nextLevel(Zeus);
}

function nextLevel(Zeus) {
  if(Zeus.targets.length === 0) {
    levelOpener(Zeus.context, 'Three');
    setTimeout(function() {
    Zeus.currentLevel = 'game over';
    }, 1000);
  }
}

module.exports = levelThree;
