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

function getContentFromVueFile(templateContent) {
  const templateLines = templateContent.split('\n');

  const start = templateLines.indexOf('<template>');
  const end = templateLines.indexOf('</template>');
  const vueTemplate = templateLines.slice(start + 1, end).join('\n');

  return vueTemplate;
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
  getContentFromVueFile,
};
