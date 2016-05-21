var levelOne = require('./level_one');
var Projectile = require('./projectile.js');

var img = new Image();
img.src = 'images/cannonball.png';

var drawBackground = function(context) {
  context.fillStyle = 'red';
  context.fillRect(10, 10, 10, 200);
};

function Game() {

}

Game.prototype.run = function(Zeus) {
  drawBackground(Zeus.context);
  levelOne(Zeus);
  Zeus.context.drawImage(img, Zeus.projectileCoord.x, Zeus.projectileCoord.y, 15, 15);
};

Game.prototype.moveUp = function(Zeus) {
  Zeus.cannonBarrel.moveUp();
};

Game.prototype.moveDown = function(Zeus)  {
  Zeus.cannonBarrel.moveDown();
};

Game.prototype.fire = function(Zeus, keyCode) {
  if (keyCode === 32 && Zeus.projectiles.length === 0) {
    Zeus.toggle.pause = true;
    Zeus.projectiles.push(new Projectile(Zeus.cannonBarrel));
    Zeus.projectiles.forEach(function(projectile) {
      projectile.move(Zeus);
    });
  }
};

module.exports = Game;
