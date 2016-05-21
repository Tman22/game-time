const chai = require('chai');
const assert = chai.assert;

const Tower = require('../lib/tower');

describe('Tower', function() {
  context('with assigned and default attributes', function() {
    var tower = new Tower({x: 100, y: 100, height: 100});

    it('should assign an x coordinate', function() {
      assert.equal(tower.x, 100);
    });

    it('should assign an y coordinate', function() {
      assert.equal(tower.y, 100);
    });

    it('should assign an width coordinate', function() {
      assert.equal(tower.width, 80);
    });

    it('should assign an height coordinate', function() {
      assert.equal(tower.height, 100);
    });


  });
});
