var validators = require('./validators');

function parse($) {
  var headingValidated = validators.heading($);
  if (headingValidated.message) {
    console.log(headingValidated.message);
  }
}

module.exports = {
  parse: parse
};
