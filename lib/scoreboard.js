var firebase = require('firebase');
require('firebase/database');
var firebaseConfig = require('./firebase-config');
var firebaseApp = firebase.initializeApp(firebaseConfig);
var fireDb = firebaseApp.database();
var ScoreboardHelper = require('./scoreboard_helpers');
var helpers = new ScoreboardHelper();

function Scoreboard() {
  this.database = fireDb;
  this.scoreboardRecords = [];
}

Scoreboard.prototype.checkHighScores = function(score) {
  var that = this;
  this.database.ref('highscore/').on('value', function(scores) {
    that.scoreboardRecords = (scores.val().highscores);
  });
  if (this.scoreboardRecords[9].score < score) {
    // debugger;
    this.showDisplayInput();
  }

};

Scoreboard.prototype.showDisplayInput = function() {
    $('.scoreboard').hide();
    $('.submit-field').css('display', 'inline-block');
};

Scoreboard.prototype.submitHighScore = function(score) {
  var scoreboardRecords = helpers.addScoreToBoard(this.scoreboardRecords, score);
  this.database.ref('highscore/').set({
    highscores: scoreboardRecords
  });
  event.preventDefault();
  $(".submit-field").hide();
  $('#name').val('');
  // debugger;
  $('.scoreboard').show();
  this.loadHighscores();
};

Scoreboard.prototype.loadHighscores = function() {
  var scoreboardRecords = [];
  var that = this;
  this.database.ref('highscore/').on('value', function(scores) {
    var allScores = helpers.sortScores(scores.val().highscores);
    scoreboardRecords = helpers.topTenScores(scoreboardRecords, allScores);
    helpers.showHighScores(allScores, scoreboardRecords.length);
    that.scoreboardRecords = allScores;
  });
};

module.exports = Scoreboard;
