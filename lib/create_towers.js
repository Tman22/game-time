var Tower = require('./tower');

function createTowers(level) {
  if(level === 'one') {
   return levelOneTowers();
 }
}

function levelOneTowers() {
  var arrayOfTowers = makeArrayOfTowers(9, 400, 200);
  var tower6 = new Tower({x: 435, y: 200, height: 400});
  var tower9 = new Tower({x: 690, y: 400, height: 200, width: 100});
  arrayOfTowers.splice(5,1, tower6);
  arrayOfTowers.splice(8,1, tower9);
  return arrayOfTowers;
}

function makeArrayOfTowers(amount, y, height) {
  var newArray = [];
  var counter = 10;
  for(var i = 0; i < amount; i++) {
    newArray.push(new Tower({x: counter, y: y, height: height}));
    counter += 85;
  }
  return newArray;
}
module.exports = createTowers;
