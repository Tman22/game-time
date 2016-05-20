var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var LittleZeus = require('./zeus');
var StartGame = require('./game');

var Zeus = new LittleZeus(context);
var Game = new StartGame(Zeus);

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  Game.run(Zeus);
  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('keydown', function(event) {
  var keyCode = event.keyCode;
  if(keyCode === 38) {
    Game.moveUp(Zeus);
  } else if(keyCode === 40) {
    Game.moveDown(Zeus);
  }
});

canvas.addEventListener('keyup', function(event) {
  var keyCode = event.keyCode;
  Game.fire(Zeus, keyCode);
});
