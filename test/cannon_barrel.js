const chai = require('chai');
const assert = chai.assert;

const CannonBase = require('../lib/cannon_base');
const CannonBarrel = require('../lib/cannon_barrel');

describe('CannonBase', function() {
  context('can move up and down', function() {
    var cannonBase = new CannonBase({x: 10, y:10});
    var cannonBarrel = new CannonBarrel(cannonBase);

    it('should move x and y coordinate', function() {
      
      assert.equal(cannonBase.x, 10);
    });





  });
});
