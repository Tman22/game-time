function levelOpener(context, level) {
  var gradient = context.createLinearGradient(0,0,800,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  context.fillStyle=gradient;
  var completed = "Completed Level " + level + "!";
  context.fillText(completed, 200, 150);
}

module.exports = levelOpener;
