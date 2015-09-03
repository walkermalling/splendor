var readline  = require('readline');

function Cli (callback) {
  var self = this;

  self.rl = readline.createInterface(
    process.stdin,
    process.stdout
  );

  self.rl.pause(); // don't interfere with stdout when required

  self.rl.on('line', function () {
    callback.apply(this, arguments);
  }); // inject this in contructor?

  self.rl.on('close', function () {
    console.log('Goodbye.');
    process.exit(0);
  });
}

Cli.prototype.promptForInput = function (playerName) {
  this.rl.setPrompt(playerName + ': ');
  this.rl.prompt();
};

Cli.prototype.pause = function () {
  this.rl.pause();
};

module.exports = Cli;
