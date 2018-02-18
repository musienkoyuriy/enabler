'use strict';

var cheerio = require('cheerio');
var validators = require('./validators');

function parse(content, templateUrl) {
  var parsed = cheerio.load(content);
  var warnings = [];
  var validator;
  var messages;

  for (var v in validators) {
    if (typeof validators[v] === 'function') {
      validator = validators[v](parsed);

      if (validator.warnings.length) {
        warnings.push(validator.warnings);
      }
    }
  }

  return flattenWarnings(warnings);
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
