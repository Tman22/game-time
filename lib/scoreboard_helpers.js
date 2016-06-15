function ScoreboardHelper() {
  this.score = [];
}

ScoreboardHelper.prototype.addScoreToBoard = function(scoreboardRecords, score) {
  var name = this.validateInput();
  scoreboardRecords.push({name: name, score: score});
  return scoreboardRecords;
};

ScoreboardHelper.prototype.validateInput = function() {
  var userInput = $('#name').val();
  var formattedName = userInput.slice(0, 17);
  if (formattedName.indexOf("<") !== -1) {
    formattedName = "Invalid Name";
  }
  return formattedName;
};

ScoreboardHelper.prototype.sortScores = function(scoreArray) {
  var sortedScores = scoreArray.sort(function(a, b) {
    return b.score - a.score;
  });
  return sortedScores;
};

ScoreboardHelper.prototype.topTenScores = function(scoreboardRecords, allScores) {
  for (var i = 0; i < 10; i++) {
    if (allScores[i] !== undefined) {
      scoreboardRecords.push(allScores[i]);
    }
  }
  return scoreboardRecords.slice(0,10);
};

ScoreboardHelper.prototype.showHighScores = function(allScores, scoreboardRecordsLength) {
  $('#scoreboard').empty();
  for (var i = 0; i < scoreboardRecordsLength; i++) {
    $('#scoreboard').append("<li>" + allScores[i].name + ": " + allScores[i].score + "</li>");
  }

};

module.exports = ScoreboardHelper;
