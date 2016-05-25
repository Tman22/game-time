var chai = require('chai');
var assert = chai.assert;
var Projectile = require('../lib/projectile');
var Zeus = require('../lib/zeus');


describe('Projectile', function() {
  context('with assigned and default attributes', function() {
    it('sets position', function() {
      var projectile = new Projectile({});
      var testCannon = {x: 10, y: 10, anglex: 20, angley: 20};
      var toggle =  100;
      var zeus = new Zeus();
      projectile.setPosition(zeus, zeus.setCoordinates(testCannon, toggle));

      assert.equal(projectile.x, 15);
      assert.equal(projectile.y, 15);
      assert.equal(projectile.xVel, 10);
      assert.equal(projectile.yVel, 10);
      assert.equal(projectile.g, 0.9);
    });
  });
});
