var Card = require('../components/card');
var assert = require('assert');

describe('Card', function () {

  it('should instantiate a new Card from file data');

  it('should instantiate a new Card from an object literal', function () {
    var objLiteral = {
      'tier':  0,
      'points':1,
      'color': 2,
      'red':   1,
      'green': 1,
      'blue':  1,
      'white': 1,
      'black': 0,
      'id': 23
    };
    var card = new Card(objLiteral);
    assert(card instanceof Card);
  });

});
