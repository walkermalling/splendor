/**
 * Examine a string for ansi escape codes,
 * return the real length of the string content, i.e., as read on the console
 * @param  {string} str
 * @return {integer}
 */
module.exports = function (str) {
  var ansiRe =  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  var result = str.match(ansiRe);
  
  if (!result) {
    return str.length;
  }

  var escapeCodesLength = result.reduce(function (a, b) {
    return a + b;
  }).length;

  return str.length - escapeCodesLength;
};
