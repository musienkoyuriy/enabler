'use strict';

function printWarnings(templatesWithWarnings) {
  console.log();
  console.log('Potential accessibility issues: ');
  console.log();
  
  for (var template in templatesWithWarnings) {
    printForTemplate(template, templatesWithWarnings[template]);
    console.log();
  }
}

function printForTemplate(templateName, warnings) {
  if (!warnings.length) {
    return;
  }
  
  console.log(templateName);
  console.log();

  warnings.forEach(function(warning, index) {
    console.log(index + 1 + '.', warning);
  });
}

module.exports = {
  printWarnings: printWarnings
};