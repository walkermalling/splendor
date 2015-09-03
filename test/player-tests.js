var assert = require('assert');
var Player = require('../components/player');

describe('Player', function () {

  it('should generate and instance of Player object', function () {
    var player = new Player();
    assert.ok(player instanceof Player);
  });

  it('should construct with 0 values for gems & cards', function () {
    var player = new Player();
    assert.equal(player.cards.length, 6);
    player.cards.forEach(function (value) {
      assert.equal(0, value);
    });
    assert.equal(player.gems.length, 6);
    player.gems.forEach(function (value) {
      assert.equal(0, value);
    });
  });

  it('should purchase cards it can afford');

  it('should not purchase cards it cannot afford');

  it('should retain change when purchasing cards');

});
