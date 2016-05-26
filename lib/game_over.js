function gameOver(Zeus) {
  var canvas = Zeus.canvas;
  var context = Zeus.context;
  var img = new Image();
  img.src = './images/sky.jpg';

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
    context.font="60px Open Sans";
    context.fillStyle = 'red';
    context.fillText("Game Over!", 250, 250);
    context.fillStyle = 'red';
    var countAndLevel = "Your Score is " + Zeus.score() + "!";
    context.fillText(countAndLevel, 180, 330);
}

module.exports = gameOver;
