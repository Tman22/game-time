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

Scoreboard.prototype.sendHighScore = function(score) {
  debugger;
  this.scoreboardRecords = helpers.addToScoreboardRecords(this.scoreboardRecords, score);
    this.database.ref('highscore/').set({
      highscores: this.scoreboardRecords
    });

  // fireDb.ref('highscore/').set({
  //   highscore: scoreboardRecords
  // });
};

Scoreboard.prototype.showDisplayInput = function(score) {
  if (this.scoreboardRecords[9].score < score) {
    $('.scoreboard').hide();
    $('.submit-field').css('display', 'inline-block');
  }
};

function scorestuff(scoreArray) {
  scoreArray.sort(function(a, b) {
    return b.score - a.score;
  });
}
Scoreboard.prototype.submitHighScore = function() {
  this.database.ref('highscore/').set({
    highscores: this.scoreboardRecords
  });
};

Scoreboard.prototype.loadHighscores = function() {
  var that = this;
  this.database.ref('highscore/').on('value', function(scores) {
    helpers.showHighScores(scores.val().highscores);
    that.scoreboardRecords = scores.val().highscores;
  });
};

module.exports = Scoreboard;




// [{name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0},
// {name: "Not Set", score: 0}]


















// Scoreboard.prototype.showHighScoreEntry = function(score) {
//   if (scoreboardRecords[9].score < score) {
//     $('scoreboard').hide();
//     $('.submit-field').css('display', 'inline-block');
//   }
// }
//
// Scoreboard.prototype.sendHighScore(score) {
//   scoreboardRecords = helpers.addToScoreboardRecords(scoreboardRecords, score);
//   fireDb.ref('highscore/').set({
//     highscore: scoreboardRecords
//   })
//   event.preventDefault();
//   $(".submit-field").hide();
//   $('#name').val('');
//   this.loadScoreboard();
//   $('.scoreboard').show();
// }
//
// Scoreboard.prototype.loadScoreboard() {
//   scoreboardRecords = [];
//   $('#scoreboard-records').empty();
//   fireDb.ref('highscore/').once('value').then(function(scores) {
//     var allScore = helpers.sortScore(score.val().highscores);
//     scoreboardRecords = heleprs.addScores(scoreboardRecords, allScores);
//     helpers.renderScore(allScores, scoreboardRecords.length);
//   });
// }
