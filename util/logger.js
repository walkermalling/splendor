var format  = require('util').format;
var chalk   = require('chalk');
var DEBUG   = process.env.SPLENDOR_DEBUG || false;

function log () {
  if (DEBUG) {
    console.log(format.apply(null, arguments));
  }
}

log.err = function () {
  console.error(format.apply(null, arguments));
};

log.warn = function () {
  console.error(chalk.red(format.apply(null, arguments)));
};

log.announce = function () {
  console.log(chalk.green(format.apply(null, arguments)));
};

log.debug = function () {
  if (DEBUG) {
    console.log(format.apply(null, arguments));
  }
};

module.exports = log;
