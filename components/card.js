var fn = require('../util/fn');

var cardDataTOC = {
  'tier':  0,
  'points':1,
  'color': 2,
  'red':   3,
  'green': 4,
  'blue':  5,
  'white': 6,
  'black': 7
};

function Card (cardData) {
  var self = this;

  if (Array.isArray(cardData)) {
    for (var property in cardDataTOC) {
      var intVal = parseInt(cardData[cardDataTOC[property]]);
      self[property] = isNaN(intVal) ? cardData[cardDataTOC[property]] : intVal;
    }
  } else {
    for (var key in cardData) {
      self[key] = cardData[key];
    }
  }
  self.totalCost = self.getOverallCost();
  self.costArray = self.getCostArray();
  self.valueRating = ((self.points + 1) / self.totalCost).toPrecision(2) * 10;
}

Card.prototype.getCostArray = function (cardArg) {
  var card;
  if (!!cardArg) {
    card = cardArg;
  } else {
    card = this;
  }

  var arr = [
    card.red,
    card.green,
    card.blue,
    card.white,
    card.black
  ];

  var result = arr.map(function (value) {
    var numerical = parseInt(value);
    return numerical;
  });
  return result;
};

Card.prototype.getOverallCost = function () {
  var costArray = this.getCostArray();
  return fn.integerReduce(costArray);
};

module.exports = Card;
