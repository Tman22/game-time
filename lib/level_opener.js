function levelOpener(context, level) {
  context.fillStyle = 'red';
  var completed = "Completed Level " + level + "!";
  context.fillText(completed, 250, 150);
}

module.exports = levelOpener;
