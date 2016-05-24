var chai = require('chai');
var assert = chai.assert;
var createTowers = require('../lib/create_towers');



describe('CreateTowers', function() {
  context('will assign default attributes for level one', function() {
    var towers = createTowers('one');

    it('has 9 towers', function() {
      assert.equal(towers.length, 9);
    });

    it('towers have correct x coordinates', function() {
      assert.equal(towers[0].x, 10);
      assert.equal(towers[1].x, 95);
      assert.equal(towers[2].x, 180);
      assert.equal(towers[3].x, 265);
      assert.equal(towers[4].x, 350);
      assert.equal(towers[5].x, 435);
      assert.equal(towers[6].x, 520);
      assert.equal(towers[7].x, 605);
      assert.equal(towers[8].x, 690);
    });

    it('first, third, and eighth tower have same y and height', function() {
      assert.equal(towers[0].y, 400);
      assert.equal(towers[2].y, 400);
      assert.equal(towers[7].y, 400);
      assert.equal(towers[0].height, 200);
      assert.equal(towers[2].height, 200);
      assert.equal(towers[7].height, 200);
    });

    it('sixth tower has different y and height', function() {
      assert.equal(towers[5].height, 400);
      assert.equal(towers[5].y, 200);
    });

    it('last tower has a width of 100', function() {
      assert.equal(towers[8].width, 100);
    });


  });
});
