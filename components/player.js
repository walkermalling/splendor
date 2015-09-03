var assert = require('assert');
var calc   = require('../util/calc');
var fn     = require('../util/fn');
var trx    = require('../util/transformer');

var get = trx.get;
var parse = trx.parse;

function Player (name) {
  this.number = null;
  this.name = name || 'x';
  this.points = 0;
  this.gems = [0,0,0,0,0,0];
  this.cards = [0,0,0,0,0,0];
  this.reserved = [];
  this.visited = false;
}

Player.prototype.getPurchasePower = function () {
  var self = this;
  return fn.sumIntegerArrays([self.cards, self.gems]);
};

function tallygems (player) {
  return fn.integerReduce(player.gems);
}

// function makeColorTransaction (player, colorCost, colorIndex) {
//   var colorName = get.name(colorIndex);
//   var assetChain = [
//     player.cards[colorIndex],
//     player.gems[colorIndex],
//     player.gems[5]
//   ];
//   var balance = colorCost;
//   var differenceSet = assetChain.map(function (value) {
//     return balance -= value;
//   });
//   if (differenceSet[0] <= 0) return;
//   player.subtractgem(colorName, (differenceSet[1] + assetChain[1]));
//   if (differenceSet[1] <= 0) return;
//   player.subtractgem('yellow', (differenceSet[2] + assetChain[2]));
// }

Player.prototype.canAfford = function (card) {
  var self = this;
  var assets = getPurchasePower(self.cards, self.gems);

  var differenceSet = card.costArray.map(function subtractAssetFromCost (colorCost, index) {
    return colorCost - assets[index];
  });

  var remainingBalance = differenceSet.reduce(function (a, b) {
    var prev = a > 0 ? a : 0;
    var curr = b > 0 ? b : 0;
    return prev + curr;
  });

  if (self.gems[5] - remainingBalance < 0) {
    return false;
  }
  return true;
};

Player.prototype.cannotAfford = function (card) {
  return !this.canAfford(card);
};

Player.prototype.purchase = function (card) {
  var self = this;
  if (self.cannotAfford(card)) {
    throw new Error('Unable to purchase, insufficient funds');
  }
  self.pay(card.costArray);
  self.cards[get.index(card.color)]++;
  self.points += card.points;
  return card.cost;
};

Player.prototype.pay = function (cost) {
  var self = this;
  cost.forEach(function (gemCost, index) {
    self.gems[index] -= gemCost;
  });
};

Player.prototype.take = function (gemArray) {
  var self = this;
  gemArray.forEach(function (gemAmount, index) {
    self.gems[index] += gemAmount;
  });
};

module.exports = Player;
