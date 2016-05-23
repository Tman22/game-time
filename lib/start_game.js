function StartGame(canvas, context) {
    this.elemLeft = canvas.offsetLeft;
    this.elemTop = canvas.offsetTop;
    this.context = context;
    this.start = false;
    this.element = {
      color: '#05EFFF',
      width: 200,
      height: 100,
      top: 200,
      left: 300
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

StartGame.prototype.draw = function() {
  if(this.start === false) {
    this.context.fillStyle = this.element.color;
    this.context.fillRect(this.element.left, this.element.top, this.element.width, this.element.height);
    var gradient = this.context.createLinearGradient(0, 0, 50, 15);
    this.context.font="30px Verdana";
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    // Fill with gradient
    this.context.fillStyle=gradient;
    this.context.fillText("Start Game",this.element.left + 15, this.element.top + 50);
  } else {
    return this.start;
  }
};
module.exports = StartGame;
