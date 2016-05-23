var Tower = require('./tower');
var CannonBase = require('./cannon_base');
var CannonBarrel = require('./cannon_barrel');
var Target = require('./target');

var img = new Image();
img.src = 'images/building1.png';


var cannonBase = new CannonBase({x: 30, y: 360});
var cannonBarrel = new CannonBarrel(cannonBase);
var tower1 = new Tower({x: 10, y: 400, height: 200}, img);
var tower2 = new Tower({x: 95, y: 400, height: 200}, img);
var tower3 = new Tower({x: 180, y: 400, height: 200}, img);
var tower4 = new Tower({x: 265, y: 400, height: 200}, img);
var tower5 = new Tower({x: 350, y: 400, height: 200}, img);
var tower6 = new Tower({x: 435, y: 400, height: 200}, img);
var tower7 = new Tower({x: 520, y: 400, height: 200}, img);
var tower8 = new Tower({x: 605, y: 400, height: 200}, img);
var tower9 = new Tower({x: 690, y: 400, height: 200, width: 100});
var target1 = new Target({x: 720, y: 360});
var target2 = new Target({x: 720, y: 50});
var target3 = new Target({x: 400, y: 200});
var target4 = new Target({x: 100, y: 200});
var towers = [tower1, tower2, tower3, tower4, tower5, tower6, tower7, tower8, tower8, tower9];
var targets = [target1, target2, target3, target4];

function levelOne(Zeus) {
  cannonBase.draw(Zeus.context);
  Zeus.cannonBarrel = cannonBarrel;
  Zeus.towers = towers;
  Zeus.targets = targets;
  cannonBarrel.draw(Zeus.context);
  Zeus.toggle.draw(Zeus.context).move();
  towers.forEach(function(tower) {
    // debugger;
    tower.draw(Zeus.context);
  });
  targets.forEach(function(target) {
    target.draw(Zeus.context);
  });
}

module.exports = levelOne;
