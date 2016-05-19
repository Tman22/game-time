var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var CannonBase = require('./cannon_base');
var CannonBarrel = require('./cannon_barrel');
var Tower = require('./tower');
var PowerBar = require('./power_bar');
var Projectile = require('./projectile');
var LittleZeus = require('./zeus');
var Zeus = new LittleZeus();


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
var powerBar = new PowerBar();
var img = new Image();
img.src = 'images/cannonball.png';

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  powerBar.draw(context);
  Zeus.toggle.draw(context).move();
  towers.forEach(function(tower) {
    tower.draw(context);
  });
  context.drawImage(img, Zeus.projectileCoord.x, Zeus.projectileCoord.y);
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
  if (keyCode === 32 && Zeus.projectiles.length === 0) {
    Zeus.toggle.pause = true;
    Zeus.projectiles.push(new Projectile(cannonBarrel));
    Zeus.projectiles.forEach(function(projectile) {
      projectile.move(cannonBarrel, Zeus.toggle.y, Zeus);
    });
  }
});
