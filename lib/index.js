var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var CannonBase = require('./cannon_base');
var CannonBarrel = require('./cannon_barrel');
var Tower = require('./tower');
var PowerBar = require('./power_bar');
// var Toggle = require('./toggle');
var Projectile = require('./projectile');
var Zeus = require('./zeus');
var zeus = new Zeus();


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
// var Zeus.toggle = new Toggle();
// var projectileCoord = {};
// var projectiles = [];

// function Zeus() {
//   this.projectileCoord = {};
//   this.toggle = new Toggle();
//   this.canvas = document.getElementById('game');
//   this.projectiles = [];
// }



// function Projectile(cannonBarrel) {
//   debugger;
//   this.x = cannonBarrel.anglex;
//   this.y = cannonBarrel.angley;
//   this.angle = cannonBarrel.angle;
//   this.width = 5;
//   this.height = 5;
//
// }
//
// var powerSetting = function(power) {
//   if(power <= 20) {
//     return 1.5;
//   } else if (20 < power && power <= 40) {
//     return 3;
//   } else if (40 < power && power <= 60) {
//     return 4;
//   } else if (60 < power && power <= 80) {
//     return 4.5;
//   } else if (80 < power && power <= 100) {
//     return 5;
//   } else if (100 < power && power <= 120) {
//     return 5.5;
//   } else if (120 < power && power <= 140) {
//     return 6.5;
//   } else if (140 < power && power <= 160) {
//     return 7.5;
//   } else if (160 < power && power <= 180) {
//     return 8;
//   } else if (180 < power && power <= 200) {
//     return 8.5;
//   }
// };
//
// var myInterval = function(x, y, xVel, yVel, g) {
//   var interval = setInterval(function() {
//     x+=xVel;
//     y+=yVel;
//     yVel+=g;
//     projectileCoord.x = x;
//     projectileCoord.y = y;
//     if (y>canvas.height) {
//       clearInterval(interval);
//       projectiles.pop();
//       toggle.pause = false;
//     }
//   }, 20);
// };
//
// Projectile.prototype.move = function(cannonBarrel, power) {
//   var x = cannonBarrel.x;
//   var y = cannonBarrel.y;
//   var xVel = cannonBarrel.anglex - cannonBarrel.x;
//   var yVel = cannonBarrel.angley - cannonBarrel.y;
//   var g = powerSetting(power);
//   myInterval(x, y, xVel, yVel, g);
//   return this;
// };

var img = new Image();
img.src = 'images/cannonball.png';

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  powerBar.draw(context);
  zeus.toggle.draw(context).move();
  towers.forEach(function(tower) {
    tower.draw(context);
  });
  context.drawImage(img, zeus.projectileCoord.x, zeus.projectileCoord.y);
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
  if (keyCode === 32 && zeus.projectiles.length === 0) {
    zeus.toggle.pause = true;
    zeus.projectiles.push(new Projectile(cannonBarrel, this));
    zeus.projectiles.forEach(function(projectile) {
      projectile.move(cannonBarrel, zeus.toggle.y);
    });
  }
});

// module.exports = toggle;
// module.exports = Index;
