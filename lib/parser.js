'use strict';

const cheerio = require('cheerio');
const rules = require('./rules');

function getA11yWarnings(content, templateUrl) {
  const parsed = cheerio.load(content, {
    xmlMode: true,
    withStartIndices: true
  });
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

  warnings.forEach(ruleWarnings => {
    ruleWarnings.forEach(warn => {
      warn.message && messages.push(warn);
    })
  });

  return messages;
}

module.exports = {
  getA11yWarnings: getA11yWarnings
};
