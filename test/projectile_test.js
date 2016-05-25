var chai = require('chai');
var assert = chai.assert;
var Projectile = require('../lib/projectile');
var projectile = new Projectile({});


describe('Projectile', function() {
  context('with assigned and default attributes', function() {
    it('sets position', function() {
      var coords = {x: 10, y: 10, anglex: 20, angley: 20, toggle: 100};
      projectile.setPosition(coords);

      assert.equal(projectile.x, 15);
      assert.equal(projectile.y, 15);
      assert.equal(projectile.xVel, 10);
      assert.equal(projectile.yVel, 10);
      assert.equal(projectile.g, 0.9);
    });

    it('movement changes coordinates', function() {

      projectile.movement();

      assert.equal(projectile.x, 18.333333333333332);
      assert.equal(projectile.y, 18.333333333333332);
      assert.equal(projectile.xVel, 10);
      assert.equal(projectile.yVel, 10.9);
      assert.equal(projectile.g, 0.9);

    });

    it('should have x and y seperate as g continutes to add to yVel', function() {
      projectile.movement();
      assert.equal(projectile.x, 21.666666666666664);
      assert.equal(projectile.y, 21.966666666666665);
      assert.equal(projectile.xVel, 10);
      assert.equal(projectile.yVel, 11.8);
    });
  });
});
