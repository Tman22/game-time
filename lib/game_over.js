function GameOver() {
  this.canvas = {};
  this.context = {};
  this.elemLeft = {};
  this.elemTop = {};
  this.context = {};
  this.element = {};
}

GameOver.prototype.update = function(Zeus) {
  this.canvas = Zeus.canvas;
  this.context = Zeus.context;

  this.elemLeft = this.canvas.offsetLeft;
  this.elemTop = this.canvas.offsetTop;
  this.context = this.context;
  this.start = false;
  this.element = {
    color: '#05EFFF',
    width: 400,
    height: 80,
    top: 360,
    left: 200
  };
};

GameOver.prototype.draw = function(score) {
  var img = new Image();
  img.src = './images/sky.jpg';
  var image = new Image();
  image.src = './images/replay.png';
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.drawImage(img, 0, 0);
  this.context.drawImage(image, this.element.left, this.element.top, this.element.width, this.element.height);
  this.context.font="60px Open Sans";
  this.context.fillStyle = 'red';
  this.context.fillText("Game Over!", 250, 250);
  this.context.fillStyle = 'red';
  var countAndLevel = "Your Score is " + score + "!";
  this.context.fillText(countAndLevel, 180, 330);
};

GameOver.prototype.clicks = function(event, Zeus) {
  var x = event.pageX - this.elemLeft;
  var y = event.pageY - this.elemTop;

  if (y > this.element.top &&
      y < this.element.top + this.element.height &&
      x > this.element.left &&
      x < this.element.left + this.element.width) {
        location.reload();
  }
};



module.exports = GameOver;
