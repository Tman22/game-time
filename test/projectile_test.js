var chai = require('chai');
var assert = chai.assert;
var Projectile = require('../lib/projectile');


describe('Projectile', function() {
  context('with assigned and default attributes', function() {
    it('collides with target', function() {

      var projectile = new Projectile({});
      var z = {cannonBarrel: {}};
      // get coordinates of a ball and target
        // where ball is underneath and to the right of target
        // such that a collision should be triggered
        // an assert that it is
    })
  });
});
