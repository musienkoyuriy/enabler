var validators = require('./validators');

function parse($, templateUrl) {
  collectWarnings($, templateUrl);
}

function collectWarnings($, templateUrl) {
  var validator;
  var warnings = [];
  var messages;

  for (var v in validators) {
    if (typeof validators[v] === 'function') {
      validator = validators[v]($);

      if (validator.warnings.length) {
        warnings.push(validator.warnings)
      }
    }
  }

  messages = flattenWarnings(warnings);

  printWarnings(messages, templateUrl);
}

function printWarnings(warningMessages, templateUrl) {
  for(var i=0; i < warningMessages.length; i++) {
    console.log(templateUrl);
    console.log(warningMessages);
    console.log();
  }
}

function flattenWarnings(warnings) {
  var messages = [];
  var validatorWarnings = [];
  var validatorWarning;

  for(var i=0; i < warnings.length; i++) {
    validatorWarnings = warnings[i];

    for(var j=0; j < validatorWarnings.length; j++) {
      validatorWarnings = validatorWarnings[j];

      validatorWarnings.message && messages.push(validatorWarnings.message);
    }
  }

  return messages;
}

module.exports = {
  parse: parse
};
