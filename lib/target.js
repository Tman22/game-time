function Target(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 50;
  this.width = options.width || 50;
  this.image = options.image || 'images/target.png';
  this.display = true;
  this.direction = 'left';
}

Target.prototype.draw = function(context) {
  if (this.display) {
    var image = new Image();
    image.src = this.image;
    context.drawImage(image, this.x, this.y, this.width, this.height);
    return this;
  }
};

Target.prototype.move = function() {
  if (this.y < 100) {
    if (this.x <= 721 && this.direction === 'left') {
      directionChange(this);
      return this.x--;
    } else if (this.x >= 299 && this.direction === 'right') {
      directionChange(this);
      return this.x++;
    }
  }
};

function directionChange(object) {
  // debugger;
  if (object.x === 720) {
    object.direction = 'left';
  } else if (object.x === 300){
    object.direction = 'right';
  }
}


module.exports = Target;
