var Tower = require('./tower');

function createTowers(level) {
  if(level === 'one') {
   return levelOneTowers();
 } else if (level === 'two') {
   return levelTwoTowers();
 } else if (level === 'three') {
   return levelThreeTowers();
 } else if (level === 'game over') {
   // end of game montage
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

function levelTwoTowers() {
  var arrayOfTowers = makeArrayOfTowers(9, 400, 200);
  var tower4 = new Tower({x: 265, y: 200, height: 400});
  var tower6 = new Tower({x: 435, y: 200, height: 400});
  var tower9 = new Tower({x: 690, y: 400, height: 200, width: 100});
  arrayOfTowers.splice(3, 1, tower4);
  arrayOfTowers.splice(5, 1, tower6);
  arrayOfTowers.splice(8, 1, tower9);
  return arrayOfTowers;
}

function levelThreeTowers() {
  var arrayOfTowers = makeArrayOfTowers(9, 400, 200);
  var tower4 = new Tower({x: 265, y: 200, height: 400});
  var tower6 = new Tower({x: 435, y: 200, height: 400});
  var tower8 = new Tower({x: 605, y: 200, height: 400});
  var tower9 = new Tower({x: 690, y: 400, height: 200, width: 100});
  arrayOfTowers.splice(3, 1, tower4);
  arrayOfTowers.splice(5, 1, tower6);
  arrayOfTowers.splice(7, 1, tower8);
  arrayOfTowers.splice(8, 1, tower9);
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
