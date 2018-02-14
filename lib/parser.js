'use strict';

var validators = require('./validators');

function parse($, templateUrl) {
  var validator;
  var warnings = [];
  var messages;

  for (var v in validators) {
    if (typeof validators[v] === 'function') {
      validator = validators[v]($);

      if (validator.warnings.length) {
        warnings.push(validator.warnings);
      }
    }
  }

  return flattenWarnings(warnings);
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
      validatorWarning = validatorWarnings[j];

      validatorWarning.message && messages.push(validatorWarning.message);
    }
  }

  return messages;
}

module.exports = {
  parse: parse
};
