var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var LittleZeus = require('./zeus');
var GameTime = require('./game');
var Start = require('./start_game');
var StartGame = new Start(canvas, context);
var Zeus = new LittleZeus(context);
var Game = new GameTime(Zeus);

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(StartGame.draw()) {
    Game.run(Zeus);
  }
  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('keydown', function(event) {
  var keyCode = event.keyCode;
  Game.move(Zeus, keyCode);
});

canvas.addEventListener('keyup', function(event) {
  var keyCode = event.keyCode;
  Game.fire(Zeus, keyCode);
});

canvas.addEventListener('click', function(event) {
  StartGame.clicks(event);
}, false);
