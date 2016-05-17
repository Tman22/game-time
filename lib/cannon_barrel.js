
function CannonBarrel(cannon) {
  this.x = cannon.x + 17;
  this.y = cannon.y + 17;
  this.width = 6;
  this.height = 50;
  this.angle = 0;
  this.anglex = this.x + 50;
  this.angley = this.y;
}

CannonBarrel.prototype.draw = function(context) {
  context.fillStyle = 'white';
  context.stroke();
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.anglex, this.angley);
  context.strokeStyle = 'white';
  context.stroke();
  return this;
};

var step = Math.PI/180;

CannonBarrel.prototype.moveUp = function() {
  var x = this.x + 50*Math.cos(this.angle+=step);
  var y = this.y - 50*Math.sin(this.angle+=step);
  this.anglex = x;
  this.angley = y;
  console.log(x, y, this.angle);
  return this;
};

CannonBarrel.prototype.moveDown = function() {
  var x = this.x + 50*Math.cos(this.angle-=step);
  var y = this.y - 50*Math.sin(this.angle-=step);
  this.anglex = x;
  this.angley = y;
  console.log(x, y, this.angle);
  return this;
};





module.exports = CannonBarrel;
