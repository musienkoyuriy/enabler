const cheerio = require('cheerio');
const rules = require('./rules');

function _flattenWarnings(warnings) {
  const messages = [];

  warnings.forEach(ruleWarnings => {
    ruleWarnings.forEach(warn => {
      if (warn.message) {
        messages.push(warn);
      }
    });
  });

  return messages;
}

function getContentFromVueFile(templateContent) {
  const templateLines = templateContent.split('\n');

  const templateOpenTag = templateLines.indexOf('<template>');
  const templateCloseTag = templateLines.indexOf('</template>');
  const vueTemplate = templateLines
    .slice(templateOpenTag + 1, templateCloseTag)
    .join('\n');

  return vueTemplate;
}

function getTemplateFromComponentDecorator(fileContent) {
  const fileAsArray = fileContent.split('\n');

  const decoratorLine = fileAsArray.find(line => line.includes('@Component'));

  if (!decoratorLine) {
    return '';
  }

  const decoratorLineNumber = fileAsArray.indexOf(decoratorLine) + 1;
  const templatePropPattern = /template\s{0,}:\s{0,}`/;

  const stringExceptComponentDecorator = fileAsArray.slice(decoratorLineNumber);
  const templateStartLine = stringExceptComponentDecorator.find(line =>
    templatePropPattern.test(line)
  );

  if (!templateStartLine) {
    return '';
  }

  const templateStartLineNumber = stringExceptComponentDecorator.indexOf(
    templateStartLine
  );

  const joinedTemplateString = stringExceptComponentDecorator
    .slice(templateStartLineNumber)
    .join('\n');

  const matchedString = templatePropPattern.exec(joinedTemplateString)[0];
  const stringExceptTemplateLiteral = joinedTemplateString.replace(
    matchedString,
    ''
  );

  const angularTemplate = stringExceptTemplateLiteral.slice(
    0,
    stringExceptTemplateLiteral.indexOf('`')
  );

  return angularTemplate;
}

function getA11yWarnings(template, options) {
  const parsed = cheerio.load(template, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true
  });

  const warnings = [];
  let rule;

  Object.values(rules).forEach(r => {
    rule = r(parsed, template, options);

    if (rule.warnings.length) {
      warnings.push(rule.warnings);
    }
  });

  return _flattenWarnings(warnings);
}

module.exports = {
  getA11yWarnings,
  getContentFromVueFile,
  getTemplateFromComponentDecorator
};
