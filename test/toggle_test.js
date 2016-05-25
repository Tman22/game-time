var chai = require('chai');
var assert = chai.assert;

var Toggle = require('../lib/toggle');

describe('Toggle', function() {
  context('starting coordinates', function() {
    var toggle = new Toggle();

    it('should assign an x coordinate', function() {
      assert.equal(toggle.x, 5);
    });

    it('should assign an y coordinate', function() {
      assert.equal(toggle.y, 10);
    });

    it('should assign an width coordinate', function() {
      assert.equal(toggle.width, 20);
    });

    it('should assign an height coordinate', function() {
      assert.equal(toggle.height, 5);
    });
  });

  context('can move up and down', function() {
    var toggle = new Toggle();

    it('should start moving down', function() {
      assert.equal(toggle.direction, 'down');
      assert.equal(toggle.y, 10);

      toggle.move();

      assert.equal(toggle.direction, 'down');
      assert.equal(toggle.y, 11);
    });

    it('should move up when direction equals up', function() {
      assert.equal(toggle.direction, 'down');
      assert.equal(toggle.y, 11);

      toggle.direction = 'up'
      toggle.move();

      assert.equal(toggle.direction, 'up');
      assert.equal(toggle.y, 10);
    });

  });

  context('changes direction at end of power bar', function() {
    var toggle = new Toggle();

    it('should change direction when y equals 200', function() {
      assert.equal(toggle.direction, 'down');

      toggle.y = 199;
      toggle.move();

      assert.equal(toggle.y, 200);
      toggle.move();

      assert.equal(toggle.direction, 'up');
      assert.equal(toggle.y, 201);

      toggle.move();

      assert.equal(toggle.y, 200);
      toggle.move();

      assert.equal(toggle.y, 199);

    });

    it('should change direction when y equals 10', function() {
      assert.equal(toggle.direction, 'up');

      toggle.y = 11;
      toggle.move();

      assert.equal(toggle.y, 10);
      toggle.move();

      assert.equal(toggle.direction, 'down');
      assert.equal(toggle.y, 9);

      toggle.move();

      assert.equal(toggle.y, 10);
      toggle.move();

      assert.equal(toggle.y, 11);

    });


  });
});
