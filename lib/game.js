var levelOne = require('./level_one');
var levelTwo = require('./level_two');
var levelThree = require('./level_three');
var gameOver = require('./game_over');
var Projectile = require('./projectile');

var shotCount = 0;


function Game() {

}

Game.prototype.run = function(Zeus) {
  drawBackground(Zeus);
  if (Zeus.currentLevel === 'one') {
    levelOne(Zeus);
  } else if (Zeus.currentLevel === 'two') {
    levelTwo(Zeus);
  } else if (Zeus.currentLevel === 'three') {
    levelThree(Zeus);
  } else if ( Zeus.currentLevel === 'gameOver'){
    gameOver(Zeus);
  }
  Zeus.projectiles.forEach(function(projectile) {
    projectile.draw(Zeus.context).movement();
    Zeus.projectileCollidesWithTarget()
        .projectileCollidesWithTower()
        .projectileFlysOutOfCanvas();
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
    Zeus.projectiles.push(new Projectile());
    Zeus.projectiles.forEach(function(projectile) {
      projectile.setPosition(Zeus.setCoordinates());
    });
  }
};

function getScore(shotCount) {
  shotCount
}

function drawBackground(Zeus) {
  var context = Zeus.context;
  var gradient = context.createLinearGradient(0, 0, 50, 15);
  context.font="30px Verdana";
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  context.fillStyle=gradient;
  var countAndLevel = Zeus.score() + " | Level: " + Zeus.currentLevel;
  context.fillText(countAndLevel, 50, 50);
  var img = new Image();
  img.src = 'images/power_bar.png';
  context.drawImage(img, 10, 10, 10, 200);
};

module.exports = Game;
