function Target(options) {
  this.options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.height = options.height || 40;
  this.width = options.width || 40;
  this.image = options.image || 'images/target.png';
  this.display = true;
}

// var directionChange = function(object) {
//   if (object.x === 200) {
//     object.direction = 'up';
//   } else if (object.x === 10){
//     object.direction = 'down';
//   }
// };

Target.prototype.draw = function(context) {
  if (this.display) {
    var image = new Image();
    image.src = this.image;
    context.drawImage(image, this.x, this.y, this.width, this.height);
    return this;
  }
};

// Target.prototype.move = function(Zeus) {
//   if (this.y <= 200 && this.direction === 'down' && !this.pause) {
//     directionChange(this);
//       return this.y++;
//   } else if (this.y >= 10 && this.direction === 'up' && !this.pause) {
//     directionChange(this);
//       return this.y--;
//   }

// };
module.exports = Target;
