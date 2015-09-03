var _ = require('lodash');

function integerReduce (arr) {
  return arr.reduce(function (a, b) {
    return parseInt(a) + parseInt(b);
  });
}

function sumIntegerArrays (arrays) {
  return arrays.reduce(function (a, b) {
    if (a.length !== b.length) {
      throw new Error('Cannot reduce incongruent arrays');
    }
    for (var k = 0; k < a.length; k++) {
      a[k] += b[k];
    }
    return a;
  });
}

function shuffle (array) {
  var counter = array.length;
  var temp;
  var randomIndex;
  while (counter > 0) {
      randomIndex = Math.floor(Math.random() * counter);
      counter--;
      temp = array[counter];
      array[counter] = array[randomIndex];
      array[randomIndex] = temp;
  }
  return array;
}

module.exports.integerReduce    = integerReduce;
module.exports.shuffle          = shuffle;
module.exports.sumIntegerArrays = sumIntegerArrays;
