var Board     = require('./board');
var Player    = require('./player');
var broker    = require('./broker');
var readline  = require('readline');
var log       = require('../util/logger');
var printer   = require('../util/printer');
var fn        = require('../util/fn');
var Cli       = require('./cli');
var _         = require('lodash');

function Game (playerNamesArr) {
  var self = this;
  if (playerNamesArr.length > 4 || playerNamesArr < 2) {
    log.warn('Invalid number of players');
    process.exit(0);
  }
  self.board = new Board(playerNamesArr.length);
  // to do: conditionally load an AI to play against
  self.players = generatePlayerRoster(playerNamesArr);
  self.turn = 0;
  self.winner = null;

  function processTurn (playerInput) {
    self.interface.pause();

    var player = self.currentPlayer();
    var result = broker(self.board, player, playerInput);

    if (!result) {
      log.warn('\tInvalid move! Try again...');
      getInput();
    } else {
      self.checkForWinner();
      next();
    }
  }

  // to do: conditionally load an interface
  //          cli, tcp, http ...
  self.interface = new Cli(processTurn);

  function getInput () {
    var player = self.currentPlayer();
    self.interface.promptForInput(player.name);
  }

  function next () {
    self.turn++;
    self.board.print(self.players);
    self.checkForWinner();
    getInput();
  }

  next(); // start
}

Game.prototype.currentPlayer = function () {
  var self = this;
  var mod = self.turn % self.players.length;
  if (mod === 0) {
    return self.players[self.players.length - 1];
  }
  return self.players[mod - 1];
};

Game.prototype.reportPlayers = function () {
  var self = this;
  console.log(printer.stringifyPlayers(self.players));
};

Game.prototype.checkForWinner = function () {
  var self = this;
  if (self.currentPlayer().number === 0) {
    var leader = _.max(self.players, 'points');
    if (leader.points >= 15) {
      console.log('At least one player has reached 15 points, ' +
      'the player with the most points at the end of the round wins.');
    }
    // self.reportPlayers();
  }
};

function generatePlayerRoster (arr) {
  var defaultNames = ['Ahran', 'Zed'];
  var names;
  var playersArr = [];

  if (Array.isArray(arr) && arr.length > 0) {
    names = arr;
  } else {
    names = defaultNames;
  }
  names.forEach(function (name) {
    playersArr.push(new Player(name));
  });

  playersArr = fn.shuffle(playersArr);
  return playersArr.map(function (player, index) {
    player.number = index;
    return player;
  });
}


module.exports = Game;
