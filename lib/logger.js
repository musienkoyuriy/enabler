const chalk = require('chalk');

const { log, warn } = console;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');
const yellow = chalk.keyword('yellow');
const { underline } = chalk;

function isWarningsEmpty(templatesWithWarnings) {
  return Object.values(templatesWithWarnings).every(
    warnings => warnings.length === 0
  );
}

function printForTemplate(templateName, warnings) {
  if (!warnings.length) {
    return;
  }

  log(underline(templateName));
  log();

  warnings.forEach(warnData => {
    const templateWarnInfo = `${yellow('Line: %s')} ${warnData.message}`;
    warn(error(templateWarnInfo), warnData.line);
  });
}

function printWarnings(templatesWithWarnings) {
  let totalWarns = 0;

  if (isWarningsEmpty(templatesWithWarnings)) {
    log();
    log(success('A11Y issues not found.'));
    return;
  }

  log();
  warn(warning('Potential accessibility issues: '));
  log();

  Object.entries(templatesWithWarnings).forEach(template => {
    const templateUrl = template[0];
    const warns = template[1];
    totalWarns += warns.length;

    printForTemplate(templateUrl, warns);
  });

  log();
  warn(error(`✖ ${totalWarns} problems.`));
}

module.exports = {
  printWarnings
};
