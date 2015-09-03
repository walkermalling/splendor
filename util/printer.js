var ch    = require('chalk');
var log   = require('./logger');
var Card  = require('../components/card');
var calc  = require('./calc');
var get   = require('./transformer').get;
var _     = require('lodash');
var realLength = require('./real-length');

function printAsset (obj) {
  var str = '\t';
  obj.asset.forEach(function (count, index) {
    if (obj.modify) {
      var chunk = ch[get.name(index)][obj.modify](count);
      str += chunk;
    } else {
      str += ch[get.name(index)](count);
    }
  });
  str += obj.suffix || '';
  console.log(str);
}

function stringifyAsset (asset) {
  var modifiers = [];
  var availableStyles = Object.keys(ch.styles);
  var args = Array.prototype.slice.call(arguments);
  for (var i = 1; i < args.length; i++) {
    if (availableStyles.indexOf(arguments[i]) > -1) {
      modifiers.push(arguments[i]);
    }
  }

  var chalkAlias = ch;
  modifiers.forEach(function (modifier) {
    chalkAlias = chalkAlias[modifier];
  });

  var str = '';

  asset.forEach(function (count, index) {
    str += chalkAlias[get.name(index)](count);
  });

  return str;
}

function printMultipleAssets (cards, gems) {
  printAsset({
    asset: cards,
    modify: 'inverse'
  });
  printAsset({
    asset: gems,
    modify: 'underline'
  });
  var sum = cards.map(function (count, index) {
    return count + gems[index];
  });
  printAsset({
    asset: sum,
    modify: 'bgBlack'
  });
}

function assembleCostStr (costArray) {
  var str = '';
  costArray.forEach(function (count, index) {
    if (count === 0) {
      str += ch.grey.inverse(' ');
    } else {
      str += ch[get.name(index)].inverse(count);
    }
  });
  return str;
}

function stringifyCard (card) {
  var c = new Card(card);
  return assembleCostStr(c.getCostArray());
}

function getIdOffset (id) {
  var base = 4;
  var offset = base - (''+id).length;
  var offsetSpaces = '';
  for (var i = offset; i > 0; i--) {
    offsetSpaces += ' ';
  }
  return offsetSpaces + '#';
}

function stringifyTier (tierArray, tierNumber) {
  var tier = {
    label: '\t' + ch.yellow.underline('Tier ' + tierNumber + '                               '),
    lnOne: '',
    lnTwo: '',
    lnThree: '',
    lnFour: ''
  };
  tierArray.forEach(function (card) {
    tier.lnOne += ch[card.color].inverse(card.points + '    ');
    tier.lnTwo += stringifyCard(card);
    tier.lnThree += ch[card.color].inverse(card.totalCost + '    ');
    tier.lnFour += ch.black(getIdOffset(card.id) + card.id);
  });
  return tier.lnOne + '\n' + tier.lnTwo + '\n' + tier.lnThree + '\n' + tier.lnFour;
}

function stackStringifyBank (gemArray) {
  var str = '\t' + ch.underline('Bank        ') + '\n';
  var gems = gemArray;
  for (var amount = 7; amount > 0; amount--) {
    str += '\t';
    for (var gemIndex = 0; gemIndex < 6; gemIndex++) {
      if (gems[gemIndex] >= amount) {
        str += ch[get.name(gemIndex)]('()');
      } else if (amount === 1){
        str += ch[get.name(gemIndex)]('__');
      } else {
        str += '  ';
      }
    }
    str += '\n';
  }
  return str;
}

function stringifyPlayers (players) {
  var lines = {
    label: '\t',
    cards: '\t',
    gems: '\t',
    total: '\t',
    points: '\t'
  };

  players.forEach(function (player, index) {
    lines.label += player.name  + '\t';
    lines.cards += stringifyAsset(player.cards, 'inverse') + '\t';
    lines.gems += stringifyAsset(player.gems, 'underline') + '\t';
    lines.total += stringifyAsset(player.getPurchasePower(), 'bgBlack') + '\t';
    lines.points += player.points + 'pts\t';
  });

  var str = '';
  for (var key in lines) {
    str += '\n' + lines[key];
  }
  return str;
}

function spaces (n) {
  var s = '';
  for (; n > 0; n--) {
    s += ' ';
  }
  return s;
}

function padLineWithSpaces (chunk, maxWidth) {
  return chunk + spaces(maxWidth - chunk.length) + '     ';
}

function padItemLines (item, itemIndex) {
  var maxWidth = _.max(item, 'length').length;
  return item.map(function (line) {
    return padLineWithSpaces(line, maxWidth);
  });
}

/**
 * Combine multiple strings destined for stout by splitting them at newlines,
 * and recombining them
 * @param  {array}  arrayOfStrings
 * @return {str}
 */
function combine (arrayOfStrings) {

  var contentArraysByItem = arrayOfStrings.map(function (str) {
    return str.split('\n');
  });

  var uniformContent = contentArraysByItem.map(padItemLines);

  var output = [];
  var maxHeight = _.max(uniformContent, 'length').length;

  uniformContent.forEach(function (item, itemIndex) {
    for (var k = 0; k < maxHeight; k++) {
      if (item[k]) {
        output[k] += item[k];
      } else {
        output[k] += spaces(item[0].length);
      }
    }
  });

  return output.join('\n');

}



module.exports.printAsset           = printAsset;
module.exports.stringifyAsset       = stringifyAsset;

module.exports.printMultipleAssets  = printMultipleAssets;

module.exports.assembleCostStr      = assembleCostStr;

module.exports.stringifyCard        = stringifyCard;
module.exports.stringifyTier        = stringifyTier;
module.exports.stringifyBank        = stackStringifyBank;

module.exports.stringifyPlayers     = stringifyPlayers;

module.exports.combine              = combine;
