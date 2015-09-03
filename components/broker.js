var transformer = require('../util/transformer');
var parse = transformer.parse;

function broker (board, player, input) {
  var move = parse(input);

  if (!move || !move.parsed) {
    return false;
  }

  if ('take' === move.action) {
    var gemArray = move.parsed;
    var result = board.grantGems(gemArray);
    if (result) {
      player.take(gemArray);
      // to do:
      // if player has > 10 gems, ask for gems back
      return true;
    } else {
      return false;
    }
  }

  if ('buy' === move.action) {
    var cardId = move.parsed.id;
    var card = board.getCard(cardId);
    if (board.cardIsNotInPlay(card.id) || player.cannotAfford(card)) {
      return false;
    }
    player.purchase(card);
    board.sellCard(card.id);
    return true;
  }

  if ('reserve' === move.action) {
    log.announce('Reserve not yet implemented');
  }

  if ('return' === move.action) {
    log.announce('Return not yet implemented');
  }

  return false;
}

module.exports = broker;
