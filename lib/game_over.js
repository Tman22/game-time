function gameOver(Zeus) {
  var canvas = Zeus.canvas;
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
  var context = Zeus.context;
    context.font="110px Open Sans";
    context.fillStyle = 'red';
    context.fillText("Game Over!", 200, 175);
    context.fillStyle = 'red';
    var countAndLevel = Zeus.score() + " | Level: " + Zeus.currentLevel;
    context.fillText(countAndLevel, 50, 50);
}
