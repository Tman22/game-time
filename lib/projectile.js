function Projectile(cannonBarrel) {
  this.x = cannonBarrel.anglex;
  this.y = cannonBarrel.angley;
  this.angle = cannonBarrel.angle;
  this.width = 5;
  this.height = 5;
}

Projectile.prototype.move = function(cannonBarrel, power, Zeus) {
  var x = cannonBarrel.x;
  var y = cannonBarrel.y;
  var xVel = cannonBarrel.anglex - cannonBarrel.x;
  var yVel = cannonBarrel.angley - cannonBarrel.y;
  var g = powerSetting(power);
  myInterval(x, y, xVel, yVel, g, Zeus);
  return this;
};


var powerSetting = function(power) {
  if(power <= 20) {
    return 1.5;
  } else if (20 < power && power <= 40) {
    return 3;
  } else if (40 < power && power <= 60) {
    return 4;
  } else if (60 < power && power <= 80) {
    return 4.5;
  } else if (80 < power && power <= 100) {
    return 5;
  } else if (100 < power && power <= 120) {
    return 5.5;
  } else if (120 < power && power <= 140) {
    return 6.5;
  } else if (140 < power && power <= 160) {
    return 7.5;
  } else if (160 < power && power <= 180) {
    return 8;
  } else if (180 < power && power <= 200) {
    return 8.5;
  }
};


var myInterval = function(x, y, xVel, yVel, g, Zeus) {
  var interval = setInterval(function() {
    x+=xVel;
    y+=yVel;
    yVel+=g;
    Zeus.projectileCoord.x = x;
    Zeus.projectileCoord.y = y;
    if (y>Zeus.canvas.height) {
      clearInterval(interval);
      Zeus.projectiles.pop();
      Zeus.toggle.pause = false;
    }
  }, 20);
};

module.exports = Projectile;
