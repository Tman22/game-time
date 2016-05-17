function CannonBase(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 40;
  this.width = options.width || 40;
}

CannonBase.prototype.draw = function(context) {
  context.fillStyle = 'green';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
  // var image = new Image();
  // image.src = 'images/rotating-cannon1.png';
  // context.drawImage(image, 35, 350);
};

module.exports = CannonBase;
