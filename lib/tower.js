
function Tower(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height;
  this.width = options.width || 80;
  this.image = options.image || 'images/building1_crop.png';
}

Tower.prototype.draw = function(context) {
  var img = new Image();
  img.src = this.image;

  context.drawImage(img, this.x, this.y, this.width, this.height);
  return this;
};

module.exports = Tower;
