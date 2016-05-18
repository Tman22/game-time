function PowerBar() {
}

PowerBar.prototype.draw = function(context) {
  context.fillStyle = 'red';
  context.fillRect(10, 10, 10, 200);
};

module.exports = PowerBar;
