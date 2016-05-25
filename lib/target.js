function Target(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 50;
  this.width = options.width || 50;
  this.image = options.image || 'images/target.png';
  this.display = true;
  this.direction = options.direction || '';
  this.min = options.min || 0;
  this.max = options.max || 0;
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
  if(this.direction === 'up' || this. direction === 'down') {
    return movementUpDown(this);
  } else if (this.direction === 'left' || this.direction === 'right') {
    return movementLeftRight(this);
  }
};

function movementUpDown(target) {
  if (target.y >= (target.min - 1) && target.direction === 'down') {
    directionUpDown(target);
    return target.y++;
  } else if (target.y <= (target.max + 1) && target.direction === 'up') {
    directionUpDown(target);
    return target.y--;
  }
}

function movementLeftRight(target) {
  if (target.x <= (target.max + 1) && target.direction === 'left') {
    directionLeftRight(target);
    return target.x--;
  } else if (target.x >= (target.min - 1) && target.direction === 'right') {
    directionLeftRight(target);
    return target.x++;
  }
}

function directionUpDown(target) {
  if (target.y === target.min) {
    target.direction = 'down';
  } else if (target.y === target.max){
    target.direction = 'up';
  }
}

function directionLeftRight(target) {
  if (target.x === target.max) {
    target.direction = 'left';
  } else if (target.x === target.min){
    target.direction = 'right';
  }
}

module.exports = Target;
