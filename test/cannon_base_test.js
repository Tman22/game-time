var chai = require('chai');
var assert = chai.assert;

var CannonBase = require('../lib/cannon_base');

describe('CannonBase', function() {
  context('with assigned and default attributes', function() {
    var cannonBase = new CannonBase({x: 10, y:10});

    it('should assign an x coordinate', function() {
      assert.equal(cannonBase.x, 10);
    });

    it('should assign an y coordinate', function() {
      assert.equal(cannonBase.y, 10);
    });

    it('should assign an width coordinate', function() {
      assert.equal(cannonBase.width, 40);
    });

    it('should assign an height coordinate', function() {
      assert.equal(cannonBase.height, 40);
    });


  });
});
