var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Tower(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height;
  this.width = options.width || 80;
}

function CannonBase(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 40;
  this.width = options.width || 40;
}

function CannonBarrel(cannon) {
  this.x = cannon.x + 17;
  this.y = cannon.y + 17;
  this.width = 6;
  this.height = 50;
  this.anglex = this.x + 50;
  this.angley = this.y;
}

CannonBarrel.prototype.draw = function(options) {
  context.fillStyle = 'white';
  context.stroke();
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.anglex, this.angley);
  context.strokeStyle = 'white';
  context.stroke();
  return this;
};

var theta = 0;
CannonBarrel.prototype.moveUp = function() {
  var step = Math.PI/180;
  var x = this.x + 50*Math.cos(theta+=step);
  var y = this.y - 50*Math.sin(theta+=step);
  this.anglex = x;
  this.angley = y;
  console.log(this.anglex, this.angley)
  return this;
};

CannonBarrel.prototype.moveDown = function() {
  var step = Math.PI/180;
  var x = this.x + 50*Math.cos(theta-=step);
  var y = this.y - 50*Math.sin(theta-=step);
  this.anglex = x;
  this.angley = y;
  return this;
};


CannonBase.prototype.draw = function() {
  context.fillStyle = 'green';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
  // var image = new Image();
  // image.src = 'images/rotating-cannon1.png';
  // context.drawImage(image, 35, 350);

};

Tower.prototype.draw = function() {
 context.fillStyle = 'black';
 context.fillRect(this.x,this.y,this.width,this.height);
 return this;
};

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

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  towers.forEach(function(tower) {
    tower.draw();
  });
  cannonBase.draw();
  cannonBarrel.draw();
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
