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

Projectile.prototype.draw = function(context) {
  var img = new Image();
  img.src = 'images/cannonball.png';
  context.drawImage(img, this.x, this.y, this.width, this.height);
  return this;
};

Projectile.prototype.setPosition = function(coords) {
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
};

function powerSetting(power) {
  var min = 0;
  var max = 20;
  var result = 0.5;
  for (var i = 0; i <= 200; i++) {
    if (min < power && power <= max) {
      return result;
    }
    min += 20;
    max += 20;
    result += 0.12;
  }
}

module.exports = Projectile;
