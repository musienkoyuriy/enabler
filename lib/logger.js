const { setTheme } = require('colors');

setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
});

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
    console.warn(templateWarnInfo.error);
  });
}

function printWarnings(templatesWithWarnings) {
  if (isWarningsEmpty(templatesWithWarnings)) {
    console.log();
    console.log('A11Y issues not found.'.info);
    return;
  }

  console.log();
  console.warn('Potential accessibility issues: '.warn);
  console.log();

  Object.entries(templatesWithWarnings)
    .forEach((template) => {
      const templateUrl = template[0];
      const warns = template[1];

      printForTemplate(templateUrl, warns);
    });
}

module.exports = {
  printWarnings,
};
