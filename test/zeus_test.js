var chai = require('chai');
var assert = chai.assert;
var Zeus = require('../lib/zeus')
var collision = require('../lib/collision');

var Zeus = new Zeus();
var cannonBarrel = {x: 10, y: 10, anglex: 20, angley: 25};
var toggle = {x: 5, y: 15, pause: true};
var ball = {x: 5, y: 6, width: 15, height: 8};
var target = {x: 20, y: 6, width: 50, height: 50};
var target2 = {x: 50, y: 6, width: 50, height: 50};

Zeus.cannonBarrel = cannonBarrel;
Zeus.toggle = toggle;
Zeus.projectiles.push(ball);
Zeus.targets.push(target);
Zeus.targets.push(target2);

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

  context('projectile collision', function() {
    it('projectile collides with target and both pop()', function() {
      Zeus.projectileCollidesWithTarget();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.targets.length, 1);
      assert.equal(Zeus.toggle.pause, false);
    });

    it('projectile pops when it hits a tower', function() {
      Zeus.projectiles.push(ball);
      Zeus.towers.push(target);
      Zeus.towers.push(target2);
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTower();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.towers.length, 2);
      assert.equal(Zeus.toggle.pause, false);
    });

    it('projectile is greater then canvas.y', function() {
      ball.y = 801;
      Zeus.projectiles.push(ball);
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTower();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.toggle.pause, false);
    });

    it('projectile is inside canvas.y', function() {
      ball.y = 800;
      Zeus.projectiles.push(ball);
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTower();

      assert.equal(Zeus.projectiles.length, 1);
      assert.equal(Zeus.toggle.pause, true);
    });

    it('projectile is greater then canvas.x', function() {
      ball.y = 6;
      ball.x = 801
      Zeus.projectiles.push(ball);
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTower();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.toggle.pause, false);
    });

    it('projectile is less then canvas.x', function() {
      ball.x = -1;
      Zeus.projectiles.push(ball);
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTower();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.toggle.pause, false);
    });

    it('projectiles is an [] - tower collision', function() {
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTower();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.toggle.pause, true);
    });

    it('projectiles is an [] - targets collision', function() {
      Zeus.toggle.pause = true;

      Zeus.projectileCollidesWithTarget();

      assert.equal(Zeus.projectiles.length, 0);
      assert.equal(Zeus.toggle.pause, true);
    });

  });

});
