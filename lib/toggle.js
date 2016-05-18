function Toggle() {
  this.x = 5;
  this.y = 10;
  this.width = 20;
  this.height = 5;
  this.direction = 'down';
  this.pause = false;
}

Toggle.prototype.draw = function(context) {
  context.fillStyle = 'black';
  context.fillRect(this.x, this.y, this.width, this.height);
  if (this.y === 200) {
    this.direction = 'up';
  } else if (this.y === 10){
    this.direction = 'down';
  }
  return this;
};

Toggle.prototype.move = function() {
  if (this.y <= 199 && this.direction === 'down' && !this.pause) {
      return this.y++;
  } else if (this.y >= 11 && this.direction === 'up' && !this.pause) {
      return this.y--;
  }
};

module.exports = Toggle;
