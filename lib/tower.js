
function Tower(options, image) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height;
  this.width = options.width || 80;
  this.image = image;
}

Tower.prototype.draw = function(context) {
  // context.fillStyle = 'blue';
  // context.fillRect(this.x, this.y, this.width, this.height);
  context.drawImage(this.image, this.x, this.y, this.width, this.height);
  return this;
};


module.exports = Tower;
