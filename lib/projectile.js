function Projectile(cannonBarrel) {
  this.x = cannonBarrel.anglex;
  this.y = cannonBarrel.angley;
  this.angle = cannonBarrel.angle;
}

Projectile.prototype.move = function(Zeus) {
  var cannonBarrel = Zeus.cannonBarrel;
  var x = cannonBarrel.x;
  var y = cannonBarrel.y;
  var xVel = cannonBarrel.anglex - cannonBarrel.x;
  var yVel = cannonBarrel.angley - cannonBarrel.y;
  var g = powerSetting(Zeus.toggle.y);
  myInterval(x, y, xVel, yVel, g, Zeus);
  return this;
};


var powerSetting = function(power) {
  if(power <= 20) {
    return 1.5;
  } else if (20 < power && power <= 40) {
    return 2;
  } else if (40 < power && power <= 60) {
    return 2.5;
  } else if (60 < power && power <= 80) {
    return 3;
  } else if (80 < power && power <= 100) {
    return 3.5;
  } else if (100 < power && power <= 120) {
    return 4;
  } else if (120 < power && power <= 140) {
    return 4.5;
  } else if (140 < power && power <= 160) {
    return 5;
  } else if (160 < power && power <= 180) {
    return 5.5;
  } else if (180 < power && power <= 200) {
    return 6;
  }
};


var ballCollides = function(Zeus) {
  Zeus.projectileCoord = {};
  Zeus.toggle.pause = false;
  Zeus.projectiles.pop();
}

var destroyTarget = function(Zeus, target) {
  var index = Zeus.targets.indexOf(target);
  Zeus.targets.splice(index, 1);
}


var myInterval = function(x, y, xVel, yVel, g, Zeus) {
  var interval = setInterval(function() {
    x+=xVel;
    y+=yVel;
    yVel+=g;
    Zeus.projectileCoord.x = x;
    Zeus.projectileCoord.y = y;
    var ball = Zeus.projectileCoord;
    ball.width = 15;
    ball.height = 15;
    Zeus.towers.forEach(function(tower) {
      var one = ((ball.x+ball.width) < (tower.x+tower.width) && tower.x < (ball.x+ball.width) && (tower.y+tower.height) > (ball.y+ball.height) && tower.y < (ball.y+ball.height));
      if (one || y> Zeus.canvas.height) {
        clearInterval(interval);
        ballCollides(Zeus);
      }
    });
    Zeus.targets.forEach(function(target) {
      var one = ((ball.x+ball.width) < (target.x+target.width) && target.x < (ball.x+ball.width) && (target.y+target.height) > (ball.y+ball.height) && target.y < (ball.y+ball.height));
      var two = (ball.x < (target.x + target.width) && (target.x + target.width) < (ball.x + ball.width) && target.y < ball.y&& target.y +target.height > ball.y);
      if (one || two) {
        destroyTarget(Zeus, target);
        clearInterval(interval);
        ballCollides(Zeus);
      }
    });
  }, 15);
};

module.exports = Projectile;
