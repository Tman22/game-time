var levelOne = require('./level_one');
var Projectile = require('./projectile.js');


var drawBackground = function(context) {
  // context.fillStyle = 'red';
  // context.fillRect(10, 10, 10, 200);
  var img = new Image();
  img.src = 'images/power_bar.png';
  context.drawImage(img, 10, 10, 10, 200);
};

function Game() {

}

Game.prototype.run = function(Zeus) {
  drawBackground(Zeus.context);
  levelOne(Zeus);
  Zeus.projectiles.forEach(function(projectile) {
    projectile.draw(Zeus).movement(Zeus);
  });
};

Game.prototype.move = function(Zeus, keyCode) {
  if(keyCode === 38) {
    Zeus.cannonBarrel.moveUp();
  } else if(keyCode === 40) {
    Zeus.cannonBarrel.moveDown();
  }
};

Game.prototype.fire = function(Zeus, keyCode) {
  if (keyCode === 32 && Zeus.projectiles.length === 0) {
    Zeus.toggle.pause = true;
    Zeus.projectiles.push(new Projectile(Zeus.cannonBarrel));
    Zeus.projectiles.forEach(function(projectile) {
      projectile.setPosition(Zeus);
    });
  }
};

module.exports = Game;
