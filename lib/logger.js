'use strict';

var colors = require('colors');

colors.setTheme({
  info: 'green'
});

function printWarnings(templatesWithWarnings) {
  if (isWarningsEmpty(templatesWithWarnings)) {
    return console.log('A11Y issues not found.'.info);
  }

  console.log();
  console.log('Potential accessibility issues: ');
  console.log();

  for (var template in templatesWithWarnings) {
    printForTemplate(template, templatesWithWarnings[template]);
    console.log();
  }
}

function isWarningsEmpty(templatesWithWarnings) {
  return Object.values(templatesWithWarnings)
    .every(function(warnings) {
      return warnings.length === 0;
    });
}

function printForTemplate(templateName, warnings) {
  if (!warnings.length) {
    return;
  }
  
  console.log(templateName);
  console.log();

  warnings.forEach(function(warning, index) {
    console.log(index + 1 + '.', warning.message + ' Line: ' + warning.line);
  });
}

module.exports = {
  printWarnings: printWarnings
};
