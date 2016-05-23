function Projectile(cannonBarrel) {
  this.x = cannonBarrel.anglex || 0;
  this.y = cannonBarrel.angley || 0;
  this.angle = cannonBarrel.angle || 0;
  this.width = 10;
  this.height = 10;
  this.xVel = 0
  this.yVel = 0
  this.g = 0
}

Projectile.prototype.draw = function(Zeus) {
  var img = new Image();
  img.src = 'images/cannonball.png';
  Zeus.context.drawImage(img, this.x, this.y, 15, 15)
  return this;
}

Projectile.prototype.setPosition = function(Zeus, coords) {
  coords = coords || Zeus.getCoords();
  // coords = Zeus.getCoords();
  var cannonBarrel = Zeus.cannonBarrel;
  this.x = cannonBarrel.anglex - 5;
  this.y = cannonBarrel.angley - 5;
  this.xVel = cannonBarrel.anglex - cannonBarrel.x - 5;
  this.yVel = cannonBarrel.angley - cannonBarrel.y - 5;
  this.g = powerSetting(Zeus.toggle.y);
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
  Zeus.toggle.pause = false;
  Zeus.projectiles.pop();
};

var destroyTarget = function(Zeus, target) {
  var index = Zeus.targets.indexOf(target);
  Zeus.targets.splice(index, 1);
};


Projectile.prototype.movement = function(Zeus) {
  this.x+=this.xVel;
  this.y+=this.yVel;
  this.yVel+=this.g;
  var ball = {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  }
  Zeus.towers.forEach(function(tower) {
    var one = ((ball.x+ball.width) < (tower.x+tower.width) && tower.x < (ball.x+ball.width) && (tower.y+tower.height) > (ball.y+ball.height) && tower.y < (ball.y+ball.height));
    if (one || ball.y > 800) {
      ballCollides(Zeus);
    }
  });
  Zeus.targets.forEach(function(target) {
    var one = ((ball.x+ball.width) < (target.x+target.width) && target.x < (ball.x+ball.width) && (target.y+target.height) > (ball.y+ball.height) && target.y < (ball.y+ball.height));
    var two = (ball.x < (target.x + target.width) && (target.x + target.width) < (ball.x + ball.width) && target.y < ball.y&& target.y +target.height > ball.y);
    if (one || two) {
      destroyTarget(Zeus, target);
      ballCollides(Zeus);
    }
  });
};

module.exports = Projectile;
