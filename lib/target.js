function Target(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 40;
  this.width = options.width || 40;
  this.image = options.image || 'images/target.png';
  this.display = true;
}

Target.prototype.draw = function(context) {
  if (this.display) {
    var image = new Image();
    image.src = this.image;
    context.drawImage(image, this.x, this.y, this.width, this.height);
    return this;
  }
};

module.exports = Target;
