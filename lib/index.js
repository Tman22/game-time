var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Tower(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height;
  this.width = options.width || 80;
}

Tower.prototype.draw = function() {
 context.fillStyle = 'black';
 context.fillRect(this.x,this.y,this.width,this.height);
 return this;
};

var tower1 = new Tower({x: 10, y: 400, height: 200});
var tower2 = new Tower({x: 100, y: 400, height: 200});
var tower3 = new Tower({x: 190, y: 400, height: 200});
var tower4 = new Tower({x: 280, y: 400, height: 200});
var tower5 = new Tower({x: 370, y: 400, height: 200});
var tower6 = new Tower({x: 460, y: 400, height: 200});
var tower7 = new Tower({x: 550, y: 400, height: 200});
var tower8 = new Tower({x: 640, y: 400, height: 200});
var tower9 = new Tower({x: 730, y: 400, height: 200});
var towers = [tower1, tower2, tower3, tower4, tower5, tower6, tower7, tower8, tower8, tower9];

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  towers.forEach(function(tower) {
    tower.draw();
  });
  requestAnimationFrame(gameLoop);
});
