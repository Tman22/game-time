
function Tower(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height;
  this.width = options.width || 80;
}

Tower.prototype.draw = function(context) {
  context.fillStyle = 'blue';
  context.fillRect(this.x, this.y, this.width, this.height)
  // var image = new Image();
  // image.src = 'images/building1.png';
  // context.drawImage(image, this.x, this.y, this.width, this.height);
  return this;
};


module.exports = Tower;
