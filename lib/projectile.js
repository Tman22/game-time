function Projectile() {
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.width = 15;
  this.height = 15;
  this.xVel = 0;
  this.yVel = 0;
  this.g = 0;
}

Projectile.prototype.draw = function(Zeus) {
  var img = new Image();
  img.src = 'images/cannonball.png';
  Zeus.context.drawImage(img, this.x, this.y, this.width, this.height);
  return this;
};

Projectile.prototype.setPosition = function(Zeus, testZeus) {
  var coords = testZeus || Zeus.setCoordinates();
  this.x = coords.anglex - 5;
  this.y = coords.angley - 5;
  this.xVel = coords.anglex - coords.x;
  this.yVel = coords.angley - coords.y;
  this.g = powerSetting(coords.toggle);
};

Projectile.prototype.movement = function() {
  this.x += this.xVel / 3;
  this.y += this.yVel / 3;
  this.yVel+=this.g;
  // debugger;
};

function powerSetting(power) {
  if(power <= 20) {
    return 0.5;
  } else if (20 < power && power <= 40) {
    return 0.6;
  } else if (40 < power && power <= 60) {
    return 0.7;
  } else if (60 < power && power <= 80) {
    return 0.8;
  } else if (80 < power && power <= 100) {
    return 0.9;
  } else if (100 < power && power <= 120) {
    return 1.1;
  } else if (120 < power && power <= 140) {
    return 1.2;
  } else if (140 < power && power <= 160) {
    return 1.35;
  } else if (160 < power && power <= 180) {
    return 1.45;
  } else if (180 < power && power <= 200) {
    return 1.6;
  }
}


module.exports = Projectile;
