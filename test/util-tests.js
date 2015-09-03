var calc        = require('../util/calc');
var fn          = require('../util/fn');
var printer     = require('../util/printer');
var chalk       = require('chalk');
var realLength  = require('../util/real-length');
var Board       = require('../components/board');
var assert      = require('assert');

describe('Utilities', function () {

  describe('util/calc', function () {
    it ('calc: ' + Object.keys(calc).join(', '));

    it('sortCardsByCost', function () {
      var board = new Board();
      var cardsInPlay = board.getCardsInPlay();
      var sortedCards = calc.sortCardsByCost(cardsInPlay);
      for (var k = 0; k < sortedCards.length - 1; k++) {
        assert(sortedCards[k + 1].totalCost >= sortedCards[k].totalCost);
      }
    });
    it('overallCostDifference');
  });

  describe('util/fn', function () {
    it('fn: ' + Object.keys(fn).join(', '));
    it('sumIntegerArrays', function () {
      var arrayOfArrays = [
        [1,2,3,4,5],
        [1,2,3,4,5],
        [1,2,3,4,5]
      ];
      var result = fn.sumIntegerArrays(arrayOfArrays);
      result.forEach(function (val, index) {
        assert.equal(val, (index + 1) * 3);
      });
    });
    it('shuffle');
    it('integerReduce');
  });

  describe('util/printer', function () {
    it('printer: ' + Object.keys(printer).join(', '));
    it('can combine strings prepared for out put', function () {
      var string1 = 'Column One\ncol1 contents';
      var string2 = 'Column Two\ncol2 contentsdfsffdss';
      var result = printer.combine([string1, string2]);
      // console.log(result);
    });
  });

  describe('util/real-length', function () {
    it('return the real length of string which includes ansi escape codes', function () {
      var baseString = 'welcome to the machine';
      var ansiEscapedString = chalk.red(baseString);
      var rl = realLength(ansiEscapedString);
      assert.equal(baseString.length, rl);
    });
  });

});
