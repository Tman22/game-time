var canvas = document.getElementById('game');
var submitButton = document.getElementById('input-button');
var context = canvas.getContext('2d');
var LittleZeus = require('./zeus');
var GameTime = require('./game');
var Start = require('./start_game');
var StartGame = new Start(canvas, context);
var Zeus = new LittleZeus(context, canvas);
var Game = new GameTime(Zeus);
var ScoreBoard = require('./scoreboard');
var scoreboard = new ScoreBoard();
scoreboard.loadHighscores();

var img = new Image();
img.src = './images/sky.jpg';

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
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
  if (Zeus.currentLevel === 'Game Over') {
    Game.clicks(event);
  } else {
    StartGame.clicks(event);
  }
}, false);

submitButton.addEventListener('click', function() {
  scoreboard.submitHighScore(Zeus.score());
});
