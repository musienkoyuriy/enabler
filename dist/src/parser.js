"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require('cheerio');
var rules_1 = require("./rules");
function _flattenWarnings(warnings) {
    var messages = [];
    warnings.forEach(function (ruleWarnings) {
        ruleWarnings.forEach(function (warn) {
            if (warn.message) {
                messages.push(warn);
            }
        });
    });
    return messages;
}
function getContentFromVueFile(templateContent) {
    var templateLines = templateContent.split('\n');
    var templateOpenTag = templateLines.indexOf('<template>');
    var templateCloseTag = templateLines.indexOf('</template>');
    var vueTemplate = templateLines
        .slice(templateOpenTag + 1, templateCloseTag)
        .join('\n');
    return vueTemplate;
}
exports.getContentFromVueFile = getContentFromVueFile;
function getTemplateFromComponentDecorator(fileContent) {
    var fileAsArray = fileContent.split('\n');
    var decoratorLine = fileAsArray.find(function (line) { return line.includes('@Component'); });
    if (!decoratorLine) {
        return '';
    }
    var decoratorLineNumber = fileAsArray.indexOf(decoratorLine) + 1;
    var templatePropPattern = /template\s{0,}:\s{0,}`/;
    var stringExceptComponentDecorator = fileAsArray.slice(decoratorLineNumber);
    var templateStartLine = stringExceptComponentDecorator.find(function (line) {
        return templatePropPattern.test(line);
    });
    if (!templateStartLine) {
        return '';
    }
    var templateStartLineNumber = stringExceptComponentDecorator.indexOf(templateStartLine);
    var joinedTemplateString = stringExceptComponentDecorator
        .slice(templateStartLineNumber)
        .join('\n');
    var templateMatches = templatePropPattern.exec(joinedTemplateString);
    var matchedString = templateMatches ? templateMatches[0] : '';
    var stringExceptTemplateLiteral = joinedTemplateString.replace(matchedString, '');
    var angularTemplate = stringExceptTemplateLiteral.slice(0, stringExceptTemplateLiteral.indexOf('`'));
    return angularTemplate;
}
exports.getTemplateFromComponentDecorator = getTemplateFromComponentDecorator;
function getA11yWarnings(template, options) {
    var parsed = cheerio.load(template, {
        xmlMode: true,
        withStartIndices: true,
        withEndIndices: true
    });
    var warnings = [];
    Object.values(rules_1.default).forEach(function (r) {
        var rule = r(parsed, template, options);
        var warns = rule.getWarnings();
        if (rule.warnings.length) {
            warnings.push(rule.warnings);
        }
    });
    return _flattenWarnings(warnings);
}
exports.getA11yWarnings = getA11yWarnings;
//# sourceMappingURL=parser.js.map