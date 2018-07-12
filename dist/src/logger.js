"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var log = console.log, warn = console.warn;
var error = chalk_1.default.bold.red;
var warning = chalk_1.default.keyword('orange');
var success = chalk_1.default.keyword('green');
var yellow = chalk_1.default.keyword('yellow');
var underline = chalk_1.default.underline;
function isWarningsEmpty(templatesWithWarnings) {
    return Object.values(templatesWithWarnings).every(function (warnings) { return warnings.length === 0; });
}
function printForTemplate(templateName, warnings) {
    if (!warnings.length) {
        return;
    }
    log(underline(templateName));
    log();
    warnings.forEach(function (warnData) {
        var templateWarnInfo = yellow('Line: %s') + " " + warnData.message;
        warn(error(templateWarnInfo), warnData.line);
    });
}
function printWarnings(templatesWithWarnings) {
    var totalWarns = 0;
    if (isWarningsEmpty(templatesWithWarnings)) {
        log();
        log(success('A11Y issues not found.'));
        return;
    }
    log();
    warn(warning('Potential accessibility issues: '));
    log();
    Object.entries(templatesWithWarnings).forEach(function (template) {
        var templateUrl = template[0];
        var warns = template[1];
        totalWarns += warns.length;
        printForTemplate(templateUrl, warns);
    });
    log();
    warn(error("\u2716 " + totalWarns + " problems."));
}
exports.printWarnings = printWarnings;
//# sourceMappingURL=logger.js.map