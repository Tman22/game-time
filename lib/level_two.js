var CannonBase = require('./cannon_base');
var CannonBarrel = require('./cannon_barrel');
var Target = require('./target');
var createTowers = require('./create_towers');


var cannonBase = new CannonBase({x: 30, y: 360});
var cannonBarrel = new CannonBarrel(cannonBase);
var target1 = new Target({x: 720, y: 360});
var target2 = new Target({x: 720, y: 50});
var target3 = new Target({x: 400, y: 200});
var target4 = new Target({x: 100, y: 200});
var towers = createTowers('one');
var targets = [target1, target2, target3, target4];

function levelTwo(Zeus) {
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
    target.draw(Zeus.context);
  });
  nextLevel(Zeus);
}

function nextLevel(Zeus){
  if(Zeus.targets === []) {
    Zeus.currentLevel = 'three';
  }
}

module.exports = levelTwo;
