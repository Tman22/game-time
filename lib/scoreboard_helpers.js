function ScoreboardHelper() {
  this.score = [];
}

// var doc = document;
// var name = doc.getElementById('#name');
// doc.getElementById('#input-button');

ScoreboardHelper.prototype.addToScoreboardRecords = function(scoreboardRecords, score) {
  var name = this.validateInput();
  scoreboardRecords.push({name: name, score: score});
  return scoreboardRecords;
};

ScoreboardHelper.prototype.validateInput = function() {
  debugger;
  var userInput = $('#name').val();
  var formattedName = userInput.slice(0, 17);
  if (formattedName.indexOf("<") !== -1) {
    formattedName = "Invalid Name";
  }
  return formattedName;
};

ScoreboardHelper.prototype.showHighScores = function(scoreboardRecords) {
  this.score = scoreboardRecords;
  for (var i = 0; i < scoreboardRecords.length; i++) {
    // $('#scoreboard').append("<p>" + i+1 + ". " + scoreboardRecords[i].name + ": " + scoreboardRecords[i].score + "<br></p>");
    $('#scoreboard').append("<li>" + scoreboardRecords[i].name + ": " + scoreboardRecords[i].score + "</li>");
  }

};

module.exports = ScoreboardHelper;
