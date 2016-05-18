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
var powerBar = new PowerBar();
var toggle = new Toggle();

function PowerBar() {
}

PowerBar.prototype.draw = function() {
  context.fillStyle = 'red';
  context.fillRect(10, 10, 10, 200)
}

function Toggle() {
  this.x = 5;
  this.y = 10;
  this.width = 20;
  this.height = 5;
  this.direction = 'down';
  this.pause = false;
}

Toggle.prototype.draw = function() {
  context.fillStyle = 'black';
  context.fillRect(this.x, this.y, this.width, this.height);
  if (this.y === 200) {
    this.direction = 'up';
  } else if (this.y === 10){
    this.direction = 'down';
  }
  return this;
};

Toggle.prototype.move = function() {
  if (this.y <= 199 && this.direction === 'down' && !this.pause) {
      return this.y++;
  } else if (this.y >= 11 && this.direction === 'up' && !this.pause) {
      return this.y--;
  }
};

function Projectile(cannonBarrel) {
  this.x = cannonBarrel.anglex;
  this.y = cannonBarrel.angley;
  this.angle = cannonBarrel.angle;
  this.width = 5;
  this.height = 5;

}

Projectile.prototype.draw = function() {
  context.fillStyle = 'white';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
  };

var powerSetting = function(power) {
  console.log('hey')
  if(power <= 20) {
    return 1.5;
  } else if (20 < power && power <= 40) {
    return 3;
  } else if (40 < power && power <= 60) {
    return 4;
  } else if (60 < power && power <= 80) {
    return 4.5;
  } else if (80 < power && power <= 100) {
    return 5;
  } else if (100 < power && power <= 120) {
    return 5.5;
  } else if (120 < power && power <= 140) {
    return 6.5;
  } else if (140 < power && power <= 160) {
    return 7.5;
  } else if (160 < power && power <= 180) {
    return 8;
  } else if (180 < power && power <= 200) {
    return 8.5;
  }
};
Projectile.prototype.move = function(cannonBarrel, power) {
  var x = cannonBarrel.x;
  var y = cannonBarrel.y;
  var xVel = cannonBarrel.anglex - cannonBarrel.x;
  var yVel = cannonBarrel.angley - cannonBarrel.y;
  var g = powerSetting(power);
  console.log(g, power, 'why');
  var myInterval = setInterval(function() {
    var image = new Image();
    image.src = 'images/cannonball.png';
    x+=xVel;
    y+=yVel;
    yVel+=g;
    context.beginPath();
    context.drawImage(image, x, y, 5, 5);
    context.moveTo(this.x, this.y);
    context.lineTo(x,y);
    context.stroke();
    this.x = x;
    this.y = y;
    if (y>canvas.height) {
      clearInterval(myInterval);
      projectiles.pop();
      toggle.pause = false;
    }
  },20);

  return this;
};

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  powerBar.draw();
  toggle.draw().move();
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
var projectiles = [];
canvas.addEventListener('keyup', function(event) {
  var keyCode = event.keyCode;
  if (keyCode === 32 && projectiles.length === 0) {
    toggle.pause = true;
    projectiles.push(new Projectile(cannonBarrel));
    projectiles.forEach(function(projectile) {
      projectile.move(cannonBarrel, toggle.y);
    })
  }
});
