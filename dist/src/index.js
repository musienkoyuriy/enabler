"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var glob = require('glob');
var parser_1 = require("./parser");
var logger_1 = require("./logger");
var utils_1 = require("./utils");
var error = chalk_1.default.bold.red;
var templatesWithWarnings = Object.create(null);
function linkWarningsWithTemplate(messages, templateUrl) {
    if (templateUrl in templatesWithWarnings) {
        templatesWithWarnings[templateUrl] = templatesWithWarnings[templateUrl].concat(messages);
    }
    else {
        templatesWithWarnings[templateUrl] = messages;
    }
}
function getTemplate(_a) {
    var fileContent = _a.fileContent, isTSFile = _a.isTSFile;
    switch (utils_1.getFrameworkName()) {
        case 'angular':
            return isTSFile
                ? parser_1.getTemplateFromComponentDecorator(fileContent)
                : fileContent;
        case 'vue':
            return parser_1.getContentFromVueFile(fileContent);
        default:
            return fileContent;
    }
}
function parseTemplate(templateUrl, options) {
    var isTSFile = templateUrl.endsWith('.ts');
    var fileContent;
    try {
        fileContent = fs_1.readFileSync(templateUrl, { encoding: 'utf8' });
    }
    catch (err) {
        throw new Error(err);
    }
    var template = getTemplate({
        isTSFile: isTSFile,
        fileContent: fileContent
    });
    var warnings = parser_1.getA11yWarnings(template, options);
    linkWarningsWithTemplate(warnings, templateUrl);
}
function handleTemplates(fileNames, options) {
    fileNames.forEach(function (fileName) {
        parseTemplate(fileName, options);
    });
    logger_1.printWarnings(templatesWithWarnings);
}
function getExtensionPattern() {
    var framework = utils_1.getFrameworkName();
    if (framework === 'vue') {
        return 'vue';
    }
    else if (framework === 'angular') {
        return '+(html|ts)';
    }
    return 'html';
}
function run(program) {
    var path = program.path, ng = program.ng, vue = program.vue;
    var options = { ng: ng, vue: vue };
    if (!path) {
        console.error(error('Path is not specified. Use "--path" or "-p" options to specify a root folder.'));
        process.exit(0);
    }
    var extension = getExtensionPattern();
    glob(path + "/**/*." + extension, function (err, fileNames) {
        if (err) {
            throw new Error("Files search error " + err);
        }
        handleTemplates(fileNames, options);
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map