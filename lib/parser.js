var validators = require('./validators');

function parse($, templateUrl) {
  printWarnings($, templateUrl);
}

function printWarnings($, templateUrl) {
  var validator;

  for (var v in validators) {
    if (typeof validators[v] === 'function' ) {
      validator = validators[v]($);

      if (validator && validator.message) {
        console.log(templateUrl);
        console.log(validator.message);
      }
    } 
  }
}

module.exports = {
  parse: parse
};
