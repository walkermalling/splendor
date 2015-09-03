var _     = require('lodash');
var fn    = require('./fn');
var Card  = require('../components/card');
var log   = require('./logger');
var DEBUG = process.env.SPLENDOR_DEBUG || false;

function sortCardsByCost (arrayOfCards) {
  return _.sortBy(_.flatten(arrayOfCards), 'totalCost');
}

function overallCostDifference (card1, card2) {
  var cardA = new Card(card1);
  var cardB = new Card(card2);
  return cardA.getOverallCost() - cardB.getOverallCost();
}

module.exports.sortCardsByCost = sortCardsByCost;
module.exports.overallCostDifference = overallCostDifference;
