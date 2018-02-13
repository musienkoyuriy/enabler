'use strict';

function printWarnings(templatesWithWarnings) {
  for (var template in templatesWithWarnings) {
    printForTemplate(template, templatesWithWarnings[template]);
    console.log();
    console.log();
  }
}

function printForTemplate(templateName, warnings) {
  if (!warnings.length) {
    return;
  }

  console.log(templateName);
  console.log();
  console.log('Potential accessibility issues:');
  console.log();

  warnings.forEach(function(warning) {
    console.log(warning);
  });
}

module.exports = {
  printWarnings: printWarnings
};