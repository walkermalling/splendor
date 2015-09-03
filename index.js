var Game     = require('./components/game');
var envars   = require('./config').envars;
var log      = require('./util/logger');

for (var envar in envars) {
  if(!process.env[envar]) {
    log.warn(envar + ' is not set');
    if (envars[envar].required && !envars[envar].default) {
      log.warn('Exiting...');
      process.exit(0);
    }
  } else {
    log.announce(envar + ' = ' + process.env[envar]);
  }
}

var players = process.argv.slice(2);

var game = new Game(players);
