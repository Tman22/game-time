function CannonBarrel(cannon) {
  this.x = cannon.x + 17;
  this.y = cannon.y + 17;
  this.width = 6;
  this.height = 50;
  this.angle = 0;
  this.anglex = this.x + 50;
  this.angley = this.y;
  this.image = 'images/cannonbarrel.png';
}

CannonBarrel.prototype.draw = function(context) {
  // context.fillStyle = 'white';
  // context.stroke();
  // context.beginPath();
  // context.moveTo(this.x, this.y);
  // context.lineTo(this.anglex, this.angley);
  // context.strokeStyle = 'white';
  // context.stroke();
  var image = new Image();
  image.src = this.image;
  context.save();
  context.translate(this.x, this.y);
  context.translate(this.x, this.y);
  context.rotate(this.angle);
  context.drawImage(image, -this.x, -this.y, 40, 10);
  context.restore();
  return this;
};

var step = Math.PI/180;

CannonBarrel.prototype.moveUp = function() {
  var x = this.x + 50*Math.cos(this.angle+=step);
  var y = this.y - 50*Math.sin(this.angle+=step);
  this.anglex = x;
  this.angley = y;
  return this;
};

CannonBarrel.prototype.moveDown = function() {
  var x = this.x + 50*Math.cos(this.angle-=step);
  var y = this.y - 50*Math.sin(this.angle-=step);
  this.anglex = x;
  this.angley = y;
  return this;
};





module.exports = CannonBarrel;
