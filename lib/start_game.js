function StartGame(canvas, context) {
    this.elemLeft = canvas.offsetLeft;
    this.elemTop = canvas.offsetTop;
    this.context = context;
    this.start = false;
    this.element = {
      color: '#05EFFF',
      width: 400,
      height: 100,
      top: 250,
      left: 200
    };
  }

// Add event listener for `click` events.
StartGame.prototype.clicks = function(event) {
  var x = event.pageX - this.elemLeft;
  var y = event.pageY - this.elemTop;

  // Collision detection between clicked offset and element.
  if (y > this.element.top &&
      y < this.element.top + this.element.height &&
      x > this.element.left && x < this.element.left + this.element.width) {
      this.start = true;
    }
};

var img = new Image();
img.src = 'images/start-button.png';

StartGame.prototype.draw = function() {
  if (this.start === false) {
    var gradient = this.context.createLinearGradient(0, 0, 50, 15);
    this.context.font="110px Verdana";
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    this.context.fillStyle = gradient;
    this.context.fillText("Cannonz", 180, 200);

    this.context.fillStyle = this.element.color;
    this.context.drawImage(img, this.element.left, this.element.top, this.element.width, this.element.height);
  } else {
    return this.start;
  }
};
module.exports = StartGame;
