var Board  = require('../components/board');
var Player = require('../components/player');
var Card   = require('../components/card');
var calc   = require('../util/calc');
var _      = require('lodash');
var assert = require('assert');

describe('AI/Decision-Making Tests', function () {
  // 
  // it('', function () {
  //   var board = new Board(2);
  //   var p1 = new Player(1, 'Tom');
  //   var p2 = new Player(2, 'George');
  //   var cardsInPlay = board.getCardsInPlay(); // or just _.flatten ?
  //   cardsInPlay = cardsInPlay.reduce(function (a, b) {
  //     return a.concat(b);
  //   });
  //   var cardCostArrays = cardsInPlay.map(function (card) {
  //     var result = Card.prototype.getCostArray(card);
  //     if (!result) {
  //       console.log('map returned falsy for: ' + card);
  //     }
  //     return result;
  //   });
  //   var profileOfCosts = calc.consolidateArrays(cardCostArrays);
  //   var indexesOfTopCosts = calc.sortCardsByCost(profileOfCosts);
  //
  //   /**
  //    * To Do: emmulate a turn cycle with purchasing decisions
  //    */
  //
  // });
});
