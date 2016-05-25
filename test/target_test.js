var chai = require('chai');
var assert = chai.assert;

var Target = require('../lib/target');

describe('Target', function() {
  context('with assigned and default attributes', function() {
    var target = new Target({x: 100, y: 100, direction: 'left'});

    it('defaults height and width to 50', function() {
      assert.equal(target.height, 50);
      assert.equal(target.width, 50);
    });

    it('defaults x and y coordinates', function() {
      assert.equal(target.x, 100);
      assert.equal(target.y, 100);
    });

    it('direction can be set to left', function() {
      assert.equal(target.direction, 'left');
    });
  });

  context('move prototype moves the x coordinates of the target', function() {
    var target = new Target({x: 400, y: 50, direction: 'left', min: 300, max: 720});

    it('target moves left initially', function() {
      target.move();
      assert.equal(target.x, 399);
      target.move();
      assert.equal(target.x, 398);
    });

    it('target will switch from left to right after hitting certain point', function() {
      target.x = 302;

      assert.equal(target.direction, 'left');

      target.move();
      assert.equal(target.x, 301);

      target.move();
      assert.equal(target.x, 300);

      target.move();
      assert.equal(target.x, 299);
      assert.equal(target.direction, 'right');

      target.move();
      assert.equal(target.x, 300);

      target.move();
      assert.equal(target.x, 301);
    });
  });
});
