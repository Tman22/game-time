var Toggle = require('./toggle');
var collision = require('./collision');

function Zeus(context) {
  this.toggle = new Toggle();
  this.projectiles = [];
  this.context = context;
  this.towers = [];
  this.targets = [];
  this.cannonBarrel = {};
  this.currentLevel = 'One';
  this.targetsHitScore = 0;
  this.shotCount = 0;
}

Zeus.prototype.setCoordinates = function() {
  var coords = this.cannonBarrel;
  coords.toggle = this.toggle.y;
  return coords;
};

Zeus.prototype.projectileFlysOutOfCanvas = function() {
  var ball = this.projectiles[0] || nullBall();
  var zeus = this;
  if (ballGoesOffMap(ball)) {
    ballCollides(zeus);
    zeus.shotCount += 1;
    return this;
  }
};

Zeus.prototype.projectileCollidesWithTower = function() {
  var ball = this.projectiles[0] || nullBall();
  var zeus = this;
  this.towers.forEach(function(tower) {
    if (collision(ball, tower)) {
      ballCollides(zeus);
      zeus.shotCount += 1;
    }
  });
  return this;
};

Zeus.prototype.projectileCollidesWithTarget = function() {
  var ball = this.projectiles[0] || nullBall();
  var zeus = this;
  this.targets.forEach(function(target) {
    if (collision(ball, target)) {
      destroyTarget(zeus, target);
      ballCollides(zeus);
    }
  });
  return this;
};

Zeus.prototype.score = function() {
  return this.targetsHitScore - this.shotCount;
};

function ballGoesOffMap(ball) {
  return (ballYGreaterThanCanvas(ball) ||
          ballXGreaterThanCanvas(ball) ||
          ballXLessThanCanvas(ball)
        );
}

function ballYGreaterThanCanvas(ball) {
  return ball.y > 800;
}

function ballXGreaterThanCanvas(ball) {
  return ball.x > 800;
}

function ballXLessThanCanvas(ball) {
  return ball.x < 0;
}

function ballCollides(Zeus) {
  Zeus.toggle.pause = false;
  Zeus.projectiles.pop();
}

function destroyTarget(Zeus, target) {
  var index = Zeus.targets.indexOf(target);
  Zeus.targetsHitScore += 10;
  Zeus.targets.splice(index, 1);
}

function nullBall() {
  return {x: 0, y: 0, width: 0, height: 0};
}


module.exports = Zeus;
