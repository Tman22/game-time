function StartGame(canvas, context) {
    this.elemLeft = canvas.offsetLeft;
    this.elemTop = canvas.offsetTop;
    this.context = context;
    this.start = false;
    this.element = {
      color: '#05EFFF',
      // width: 200,
      width: 400,
      height: 100,
      // border-radius: 50%,
      // margin: auto,
      // height: 100,
      top: 250,
      // border: 10px solid red,
      left: 200
    };
  }

// Add event listener for `click` events.
StartGame.prototype.clicks = function(event) {
  var x = event.pageX - this.elemLeft,
  y = event.pageY - this.elemTop;

  // Collision detection between clicked offset and element.
  // this.elements.forEach(function(element) {
    if (y > this.element.top && y < this.element.top + this.element.height && x > this.element.left && x < this.element.left + this.element.width) {
        this.start = true;
      }
    // });

};
var img = new Image();
img.src = 'images/start-button.png';

StartGame.prototype.draw = function() {
  if(this.start === false) {
    this.context.fillStyle = this.element.color;
    this.context.drawImage(img, this.element.left, this.element.top, this.element.width, this.element.height);
  } else {
    return this.start;
  }
};
module.exports = StartGame;
