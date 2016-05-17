var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var CannonBase = require('./cannon_base');
var CannonBarrel = require('./cannon_barrel');
var Tower = require('./tower');

var cannonBase = new CannonBase({x: 30, y: 360});
var cannonBarrel = new CannonBarrel(cannonBase);
var tower1 = new Tower({x: 10, y: 400, height: 200});
var tower2 = new Tower({x: 95, y: 400, height: 200});
var tower3 = new Tower({x: 180, y: 400, height: 200});
var tower4 = new Tower({x: 265, y: 400, height: 200});
var tower5 = new Tower({x: 350, y: 400, height: 200});
var tower6 = new Tower({x: 435, y: 400, height: 200});
var tower7 = new Tower({x: 520, y: 400, height: 200});
var tower8 = new Tower({x: 605, y: 400, height: 200});
var tower9 = new Tower({x: 690, y: 400, height: 200, width: 100});
var towers = [tower1, tower2, tower3, tower4, tower5, tower6, tower7, tower8, tower8, tower9];

function projectile(cannonBarrel) {
  this.x = cannonBarrel.anglex;
  this.y = cannonBarrel.angley;
  this.angle = cannonBarrel.angle;
  this.width = 5;
  this.height = 5;
}


requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  towers.forEach(function(tower) {
    tower.draw(context);
  });
  cannonBase.draw(context);
  cannonBarrel.draw(context);
  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('keydown', function(event) {
  var keyCode = event.keyCode;
  if(keyCode === 38) {
    cannonBarrel.moveUp();
  } else if(keyCode === 40) {
    cannonBarrel.moveDown();
  }
});

canvas.addEventListener('keyup', function(event) {
  var keyCode = event.keyCode;
  if (keyCode === 32) {
    projectile.start();
  }
});
