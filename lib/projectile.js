function Projectile() {
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.width = 10;
  this.height = 10;
  this.xVel = 0;
  this.yVel = 0;
  this.g = 0;
}

Projectile.prototype.draw = function(Zeus) {
  var img = new Image();
  img.src = 'images/cannonball.png';
  Zeus.context.drawImage(img, this.x, this.y, 15, 15);
  return this;
};

Projectile.prototype.setPosition = function(Zeus, testZeus) {
  var coords = testZeus || Zeus.setCoordinates();
  this.x = coords.anglex - 5;
  this.y = coords.angley - 5;
  this.xVel = coords.anglex - coords.x -5;
  this.yVel = coords.angley - coords.y -5;
  this.g = powerSetting(coords.toggle);
  return this;
};



function powerSetting(power) {
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
}


Projectile.prototype.movement = function() {
  this.x+=this.xVel;
  this.y+=this.yVel;
  this.yVel+=this.g;
};

module.exports = Projectile;
