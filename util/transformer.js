var _ = require('lodash');

var COLOR_KEY = ['red','green','blue','white','black','yellow'];

function colorName (index) {
  return COLOR_KEY[parseInt(index)];
}

function colorIndex (colorName) {
  return COLOR_KEY.indexOf(colorName);
}

function getIndex (definition) {
  if (typeof definition === 'string' && !parseInt(definition)) {
    return colorIndex(definition);
  }
  if (Array.isArray(definition)) {
    for (var i = 0; i < defnition.length; i++) {
      if (parseInt(definition[i]) > 0) {
        return i; // expect single gem
      }
    }
  }
  return definition;
}

function getName (definition) {
  if (typeof definition === 'number') {
    return colorName(parseInt(definition));
  }
  if (Array.isArray(definition)) {
    for (var i = 0; i < defnition.length; i++) {
      if (parseInt(definition[i]) > 0) {
        return colorName(i); // expect single gem
      }
    }
  }
  return definition;
}

function getArray (definition) {
  var arr = [0,0,0,0,0,0];
  if (typeof definition === 'string' && !parseInt(definition)) {
    arr[colorIndex(definition)] = 1;
    return arr;
  }
  if (typeof definition === 'number') {
    arr[colorIndex(definition)] = 1;
    return arr;
  }
  return definition;
}

var get = {
  index: getIndex,
  name: getName,
  array: getArray
};

function takegems (bits) {
  var parsed = [0,0,0,0,0,0];
  if (bits.length === 3) {
    bits.forEach(function (colorName, index) {
      parsed[get.index(colorName)] = 1;
    });
  } else if (bits.length === 1) {
    parsed[get.index(bits[0])] = 2;
  } else {
    parsed = false;
  }
  return parsed;
}

function takeCard (bit) {
  var parsed = {};
  var cardDefinition = parseInt(bits[1]);
  if (bits[0] === 'id') {
    parsed.id = cardDefinition;
  }
  if (bits[0] === 'tier') {
    parsed.tier = cardDefinition;
  }
  return parsed;
}

function getgemArrayFromNames (bits) {
  var parsed = [0,0,0,0,0,0];
  bits.forEach(function (colorName, index) {
    parsed[get.index(colorName)]++;
  });
  return parsed;
}

function parseMove (moveDefinition) {
  var bits = _.compact(moveDefinition.split(' '));
  var action = bits.shift();
  var result = {
    action: action
  };

  switch (action) {
    case 'take': // take red, green, white || take red
      result.parsed = takegems(bits);
      break;
    case 'buy': // take id ##
    case 'reserve':
      result.parsed = takeCard(bits);
      break;
    case 'return':
      result.parsed = getgemArrayFromNames(bits);
      break;
    default:
      result = false;
  }
  return result;
}

module.exports.get   = get;
module.exports.parse = parseMove;
