var fs = require('fs');
var envars = require('../config').envars;
var rootDir = process.env.SPLENDOR_ROOT || envars.SPLENDOR_ROOT.default;

module.exports.read = function (relativePath, options) {
  var opt = !!options ? options : {};
  var data = fs.readFileSync(rootDir + relativePath, 'utf8');
  return data.split(opt.split || '\n');
};
