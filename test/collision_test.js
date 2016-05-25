var chai = require('chai');
var assert = chai.assert;

var collision = require('../lib/collision');


describe('Collision', function() {
  context('detects collision between ball and target', function() {

    it('right side of ball hitting left side of target', function() {
      var target = {x: 20, y: 6, width: 50, height: 50};
      var ball = {x: 5, y: 6, width: 15, height: 8};
      assert.equal(collision(ball, target), true);
    });


    it('bottom of ball hitting top of target', function() {
      var target = {x: 100, y:200, width: 50, height: 50, };
      var ball = {x: 100, y: 215, width: 15, height: 15};
      assert.equal(collision(ball, target), true);
    });

    it('left of ball hitting right of target', function() {
      var target = {x: 100, y:200, width: 50, height: 50, };
      var ball = {x: 150, y: 200, width: 15, height: 15};
      assert.equal(collision(ball, target), true);
    });

    it('top of ball hitting bottom of target', function() {
      var target = {x: 100, y:200, width: 50, height: 50, };
      var ball = {x: 100, y: 250, width: 15, height: 15};
      assert.equal(collision(ball, target), true);
    });


  });
});
