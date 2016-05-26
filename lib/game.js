var levelOne = require('./level_one');
var levelTwo = require('./level_two');
var levelThree = require('./level_three');
var Projectile = require('./projectile');
var GameOver = require('./game_over');

var GameOver = new GameOver();


function Game() {

}

Game.prototype.run = function(Zeus) {
  drawBackground(Zeus);
  if (Zeus.currentLevel === 'One') {
    levelOne(Zeus);
  } else if (Zeus.currentLevel === 'Two') {
    levelTwo(Zeus);
  } else if (Zeus.currentLevel === 'Three') {
    levelThree(Zeus);
  } else if ( Zeus.currentLevel === 'Game Over'){
    GameOver.update(Zeus);
    GameOver.draw(Zeus.score());
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

Game.prototype.clicks = function(event, Zeus) {
  GameOver.clicks(event, Zeus);
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

function drawBackground(Zeus) {
  var context = Zeus.context;
  context.font="30px Verdana";
  context.fillStyle = 'red';
  var countAndLevel = Zeus.score() + " | Level: " + Zeus.currentLevel;
  context.fillText(countAndLevel, 50, 50);
  var img = new Image();
  img.src = 'images/power_bar.png';
  context.drawImage(img, 10, 10, 10, 200);
}

module.exports = Game;
