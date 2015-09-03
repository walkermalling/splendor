var Card    = require('./card');
var Noble   = require('./noble');
var file    = require('../util/file');
var printer = require('../util/printer');
var fn      = require('../util/fn');
var log     = require('../util/logger');
var _       = require('lodash');

var DECK_SOURCE_FILE = '/data/deck.md';
var ROSTER_SOURCE_FILE = '/data/nobles.md';
var TIER = {
  ONE: 0,
  TWO: 1,
  THREE: 2
};

function Board (numberOfPlayers) {
  var self = this;
  var playerCount = numberOfPlayers || 2;
  self.deck = generateDeck(); // [[...],[...],[...]]
  self.bank = generateBank(playerCount);
  self.roster = generateNoblesRoster(playerCount);
}

function generateDeck () {
  var cards = file.read(DECK_SOURCE_FILE);
  var deck = [[],[],[]];
  cards.forEach(function (lineStr, index) {
    var cardData = lineStr.split(' ');
    if (cardData.length !== 8 || cardData[0] === '#') {
      return;
    }
    var newCard = new Card(cardData);
    newCard.id = index;
    deck[TIER[newCard.tier]].push(newCard);
  });
  deck.forEach(function (tier) {
    tier = fn.shuffle(tier);
  });
  return deck;
}

function generateBank (numberOfPlayers) {
  var offset = 0;
  offest = (numberOfPlayers === 3) ? 2 : offset;
  offset = (numberOfPlayers === 4) ? 4 : offset;
  var bank = [4,4,4,4,4].map(function (color) {
    return color + offset;
  });
  bank.push(7); // yellow
  return bank;
}

function generateNoblesRoster (numberOfPlayers) {
  var nobles = file.read(ROSTER_SOURCE_FILE);
  var roster = [];
  nobles.forEach(function (lineStr, index) {
    var nobleData = lineStr.split(' ');
    if (nobleData.length !== 5 || nobleData[0] === '#') {
      return;
    }
    var newNoble = new Noble(nobleData);
    newNoble.id = index;
    roster.push(newNoble);
  });
  roster = fn.shuffle(roster);
  roster = roster.slice(0, numberOfPlayers + 1);
  return roster;
}

/**
 * Calculate the last 4 cards of each tier
 * @return {array} array of 3 arrays, representing the 3 tiers
 */
Board.prototype.getCardsInPlay = function () {
  return this.deck.map(function (tier, index) {
    var sliceFromIndex = tier.length > 4 ? tier.length - 5 : 0;
    return tier.slice(sliceFromIndex);
  });
};

Board.prototype.cardIsInPlay = function (cardId) {
  var self = this;
  return _.flatten(self.getCardsInPlay()).some(function (card) {
    return card.id === cardId;
  });
};

Board.prototype.cardIsNotInPlay = function (cardId) {
  return !this.cardIsInPlay(cardId);
};

Board.prototype.getCard = function (cardId) {
  var self = this;
  return _.find(_.flatten(this.getCardsInPlay()), {id: cardId});
};

/**
 * Validate that the requested card is in play
 * @param  {integer} cardId
 * @return {boolean}
 */
Board.prototype.sellCard = function (cardId) {
  var self = this;
  if (self.cardIsNotInPlay(cardId)) {
    return false;
  }
  var card = self.getCard(cardId);
  var success = self.grantCard(card.id);
  if (success) {
    self.depositGems(card.costArray);
    return true;
  }
  return false;
};

Board.prototype.depositGems = function (gemArray) {
  var self = this;
  gemArray.forEach(function (gemAmount, index) {
    self.bank[index] += gemAmount;
  });
};

Board.prototype.grantCard = function (cardId) {
  var self = this;

  function updateTier (tierIndex) {
    var cardIndex = _.findIndex(self.deck[tierIndex], {id: cardId});
    if (cardIndex === -1) {
      return false;
    }
    self.deck[tierIndex].splice(cardIndex, 1);
    return true;
  }

  return self.deck.some(function (tier, index) {
    return updateTier(index);
  });
};

/**
 * Validate that the bank has the gems requested
 * @param  {array} gemArray
 * @return {boolean}
 * N.B. calculate transaction as the new bank balance before applying
 */
Board.prototype.grantGems = function (gemArray) {
  var self = this;
  var valid = true;

  var newBankBalance = self.bank.map(function (gemsAvailable, index) {
    if (gemArray[index] > 2) {
      valid = false;
    }
    if (gemArray[index] === 2 && gemsAvailable < 4) {
      valid = false;
    }
    if (gemsAvailable - gemArray[index] < 0) {
      valid = false;
    }
    return gemsAvailable - gemArray[index];
  });

  if (valid) {
    self.bank = newBankBalance;
    return true;
  } else {
    return false;
  }
};

/**
 * Report the state of the game board:
 * - Card Tiers
 * - Bank
 * - Nobles
 */
Board.prototype.print = function (players) {
  var self = this;
  var cardsInPlay = self.getCardsInPlay();
  cardsInPlay.forEach(function (tier, index) {
    console.log(printer.stringifyTier(tier, index) + '\n');
  });
  var bankString = printer.stringifyBank(self.bank);
  var playersString = printer.stringifyPlayers(players);
  console.log(bankString);
  console.log(playersString);
  // to do: nobles
};

module.exports = Board;
