function Toggle() {
  this.x = 5;
  this.y = 10;
  this.width = 20;
  this.height = 5;
  this.direction = 'down';
  this.pause = false;
}

var directionChange = function(object) {
  if (object.y === 200) {
    object.direction = 'up';
  } else if (object.y === 10){
    object.direction = 'down';
  }
};

Toggle.prototype.draw = function(context) {
  context.fillStyle = 'black';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Toggle.prototype.move = function() {
  if (this.y <= 200 && this.direction === 'down' && !this.pause) {
    directionChange(this)
      return this.y++;
  } else if (this.y >= 10 && this.direction === 'up' && !this.pause) {
    directionChange(this)
      return this.y--;
  }
};


module.exports = Toggle;
