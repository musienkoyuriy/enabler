const cheerio = require('cheerio');
const rules = require('./rules');

function _flattenWarnings(warnings) {
  const messages = [];

  warnings.forEach((ruleWarnings) => {
    ruleWarnings.forEach((warn) => {
      if (warn.message) {
        messages.push(warn);
      }
    });
  });

  return messages;
}

function getA11yWarnings(content, options) {
  const parsed = cheerio.load(content, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true,
  });
  const warnings = [];
  let rule;

  Object.values(rules)
    .forEach((r) => {
      rule = r(parsed, content, options);

      if (rule.warnings.length) {
        warnings.push(rule.warnings);
      }
    });

  return _flattenWarnings(warnings);
}


module.exports = {
  getA11yWarnings,
};
