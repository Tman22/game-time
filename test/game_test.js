var chai = require('chai');
var assert = chai.assert;
var Game = require('../lib/game');
var Zeus = require('../lib/Zeus');
var CannonBase = require('../lib/cannon_base');
var CannonBarrel = require('../lib/cannon_barrel');

var Game = new Game();
var Zeus = new Zeus();
var cannonBase = new CannonBase({x: 10, y:10});
var cannonBarrel = new CannonBarrel(cannonBase);
Zeus.cannonBarrel = cannonBarrel

describe('Game', function() {
  context('will move up or down', function() {

    it('should move up and change cannonBarrel coords', function() {
      assert.equal(Zeus.cannonBarrel.x, 27);
      assert.equal(Zeus.cannonBarrel.y, 27);
      assert.equal(Zeus.cannonBarrel.anglex, 77);
      assert.equal(Zeus.cannonBarrel.angley, 27);
      Game.move(Zeus, 38);


      assert.equal(Zeus.cannonBarrel.anglex, 76.99238475781956);
      assert.equal(Zeus.cannonBarrel.angley, 25.25502516487495);
    });

    it('should move down and change cannonBarrel coords', function() {
      assert.equal(Zeus.cannonBarrel.anglex, 76.99238475781956);
      assert.equal(Zeus.cannonBarrel.angley, 25.25502516487495);

      Game.move(Zeus, 40);


      assert.equal(Zeus.cannonBarrel.anglex, 76.99238475781956);
      assert.equal(Zeus.cannonBarrel.angley, 27);
    });
  });

  context('will fire and pop projectiles', function() {
    it('should move down and change cannonBarrel coords', function() {
      assert.equal(Zeus.projectiles.length, 0);

      Game.fire(Zeus, 32)

      assert.equal(Zeus.projectiles.length, 1);
    });
  });
});
