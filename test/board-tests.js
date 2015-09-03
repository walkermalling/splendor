var Board  = require('../components/board');
var Card   = require('../components/card');
var log    = require('../util/logger');
var assert = require('assert');

describe('Board', function () {

  it('Board Prototype: ' + Object.keys(Board.prototype).join(', '));

  it('constructor should generate a deck', function () {
    function isValidCard (card) {
      assert(card instanceof Card);
    }
    var board = new Board();
    assert.ok(board.deck);
    assert.equal(board.deck.length, 3);
    board.deck.forEach(function(tier){
      assert(Array.isArray(tier));
      tier.forEach(isValidCard);
    });
  });

  it('constructor should generate nobles roster', function () {
    var fourPlayerboard = new Board();
    assert.equal(fourPlayerboard.roster.length, 5);
    var threePlayerboard = new Board(3);
    assert.equal(threePlayerboard.roster.length, 4);
    var twoPlayerboard = new Board(2);
    assert.equal(twoPlayerboard.roster.length, 3);
  });

  it.skip('constructor should generate a gem bank', function () {
  });

  it('constructor should shuffle the deck', function () {
    var board = new Board();
    var lastId = 0;
    var instancesOfSequentiality = 0;
    function checkCardId (card) {
      if (++lastId === card.id) {
        instancesOfSequentiality++;
      }
      lastId = card.id;
    }
    board.deck.forEach(function (tier, index) {
      tier.forEach(checkCardId);
    });
    // to do: need algorithm to assess if too many instances of sequentiality
    console.log('      instances of sequentiality: ' + instancesOfSequentiality);
  });

  it('cardIsInPlay should check if a card has been dealt');

  it('cardIsNotInPlay should check if a card has NOT been dealt');

  it('getCardsInPlay should report which cards are in play', function () {
    var board = new Board(2);
    var cardsInPlay = board.getCardsInPlay();
    assert.ok(cardsInPlay);
  });

  it('print should print each tier', function () {
    var board = new Board(2);
    // board.print();
  });

  it.skip('grantCard should remove card from deck');

  it.skip('sellCard should sell a card', function () {
    var board = new Board(2);
    var cardsInPlay = board.getCardsInPlay();
    var cardToTake = cardsInPlay[0][0];
    var result = board.sellCard(cardToTake.id);
    assert.ok(result);
    // to do: assert correct amount has been deposited
    // to do: assert card is no longer in deck
  });

  it('grantGems should remove specified gems from bank', function () {
    var board = new Board(2);
    var result = board.grantGems([2,0,0,0,0,0]);
    assert.ok(result);
    var expect = [2,4,4,4,4,7];
    board.bank.forEach(function (gemAmount, index) {
      assert.equal(gemAmount, expect[index]);
    });
  });

  it('grantGems should not modify bank if request is invalid', function () {
    var board = new Board(2);
    var result = board.grantGems([3,0,0,0,0,0]);
    assert(!result);
    var expect = [4,4,4,4,4,7];
    board.bank.forEach(function (gemAmount, index) {
      assert.equal(gemAmount, expect[index]);
    });
  });

  it('depositGems should add specified gems to bank');

});
