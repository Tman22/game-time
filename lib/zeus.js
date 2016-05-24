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

Zeus.prototype.projectileCollidesWithTower = function() {
  var ball = this.projectiles[0] || nullBall();
  var zeus = this;
  this.towers.forEach(function(tower) {
    var one = ((ball.x+ball.width) < (tower.x+tower.width) && tower.x < (ball.x+ball.width) && (tower.y+tower.height) > (ball.y+ball.height) && tower.y < (ball.y+ball.height));
    var two = (ball.x < (tower.x + tower.width) && (tower.x + tower.width) < (ball.x + ball.width) && tower.y < ball.y&& tower.y +tower.height > ball.y);
    if (one || two || ball.y > 800) {
      ballCollides(zeus);
    }
  });
  return this;
};

Zeus.prototype.projectileCollidesWithTarget = function() {
  var ball = this.projectiles[0];
  var zeus = this;
  this.targets.forEach(function(target) {
    var one = ((ball.x+ball.width) < (target.x+target.width) && target.x < (ball.x+ball.width) && (target.y+target.height) > (ball.y+ball.height) && target.y < (ball.y+ball.height));
    var two = (ball.x < (target.x + target.width) && (target.x + target.width) < (ball.x + ball.width) && target.y < ball.y&& target.y +target.height > ball.y);
    if (one || two) {
      destroyTarget(zeus, target);
      ballCollides(zeus);
    }
  });
  return this;
};

function ballCollides(Zeus) {
  Zeus.toggle.pause = false;
  return Zeus.projectiles.pop();
}

function destroyTarget(Zeus, target) {
  var index = Zeus.targets.indexOf(target);
  Zeus.targets.splice(index, 1);
}

function nullBall() {
  return {x: 0, y: 0, width: 0, height: 0};
}


module.exports = Zeus;
