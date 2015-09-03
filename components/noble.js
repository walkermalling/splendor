function Noble (nobleData) {
  var self = this;
  self.cost = nobleData.map(function (datum) {
    return parseInt(datum);
  });
}

module.exports = Noble;
