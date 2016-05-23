function CannonBase(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 40;
  this.width = options.width || 40;
}

CannonBase.prototype.draw = function(context) {
  context.fillStyle = '#556270';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

module.exports = CannonBase;
