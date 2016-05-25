var chai = require('chai');
var assert = chai.assert;
var Zeus = require('../lib/zeus')
var collision = require('../lib/collision');

var Zeus = new Zeus();
var cannonBarrel = {x: 10, y: 10, anglex: 20, angley: 25};
var toggle = {x: 5, y: 15};

Zeus.cannonBarrel = cannonBarrel
Zeus.toggle = toggle

describe('Zeus', function() {
  context('with assigned and default attributes', function() {
    it('sets and returns an object with coordinates', function() {
      var coords = Zeus.setCoordinates();

      assert.equal(coords.x, 10);
      assert.equal(coords.y, 10);
      assert.equal(coords.anglex, 20);
      assert.equal(coords.angley, 25);
      assert.equal(coords.toggle, 15);
    });

    it('coords will change when barrel is changed', function() {
      Zeus.cannonBarrel.x = 20
      Zeus.cannonBarrel.y = 20

      var coords = Zeus.setCoordinates();

      assert.equal(coords.x, 20);
      assert.equal(coords.y, 20);
      assert.equal(coords.anglex, 20);
      assert.equal(coords.angley, 25);
      assert.equal(coords.toggle, 15);
    });
  });

  context('projectile', function() {
    it('sets and returns an object with coordinates', function() {


    });
  });

});
