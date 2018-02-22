'use strict';

const colors = require('colors');

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red'
});

function printWarnings(templatesWithWarnings) {
  if (isWarningsEmpty(templatesWithWarnings)) {
     console.log();
     console.log('A11Y issues not found.'.info);
     return;
  }

  console.log();
  console.warn('Potential accessibility issues: '.warn);
  console.log();

  for (var template in templatesWithWarnings) {
    printForTemplate(template, templatesWithWarnings[template]);
    console.log();
  }
}

function isWarningsEmpty(templatesWithWarnings) {
  return Object
    .values(templatesWithWarnings)
    .every(warnings => warnings.length === 0);
}

function printForTemplate(templateName, warnings) {
  if (!warnings.length) {
    return;
  }
  
  console.log(templateName);
  console.log();

  warnings.forEach((warning, index) => {
    const templateWarnInfo = `${index + 1}. ${warning.message} Line: ${warning.line}`;
    console.log(templateWarnInfo.error);
  });
}

module.exports = {
  printWarnings: printWarnings
};
