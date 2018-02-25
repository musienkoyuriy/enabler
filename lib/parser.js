'use strict';

const cheerio = require('cheerio');
const rules = require('./rules');

function getA11yWarnings(content, templateUrl) {
  const parsed = cheerio.load(content);
  const warnings = [];
  let rule;
  let messages;

  for (let r in rules) {
    if (typeof rules[r] === 'function') {
      rule = rules[r](parsed, content);

      if (rule.warnings.length) {
        warnings.push(rule.warnings);
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
