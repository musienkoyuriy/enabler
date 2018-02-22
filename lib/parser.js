'use strict';

const cheerio = require('cheerio');
const validators = require('./validators');

function getA11yWarnings(content, templateUrl) {
  const parsed = cheerio.load(content);
  const warnings = [];
  let validator;
  let messages;

  for (const v in validators) {
    if (typeof validators[v] === 'function') {
      validator = validators[v](parsed, content);

      if (validator.warnings.length) {
        warnings.push(validator.warnings);
      }
    }
  }

  return _flattenWarnings(warnings);
}

function _flattenWarnings(warnings) {
  const messages = [];
  let validatorWarnings = [];
  let validatorWarning;

  for(let i=0; i < warnings.length; i++) {
    validatorWarnings = warnings[i];

    for(let j=0; j < validatorWarnings.length; j++) {
      validatorWarning = validatorWarnings[j];

      validatorWarning.message && messages.push(validatorWarning);
    }
  }

  return messages;
}

module.exports = {
  getA11yWarnings: getA11yWarnings
};
