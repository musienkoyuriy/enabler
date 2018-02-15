'use strict';

var fs = require('fs');
var glob = require('glob');
var cherrio = require('cheerio');

var parser = require('./parser');
var logger = require('./logger');

var templatesWithWarnings = Object.create(null);

function run() {
  glob('./test/components/**/*.html', function(err, fileNames) {
    if (err) {
      throw new Error('Files search error ' + err);
      return;
    }
    handleTemplates(fileNames);
  });
}

function linkWarningsWithTemplate(messages, templateUrl) {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = templatesWithWarnings[templateUrl].concat(messages);
  } else {
    templatesWithWarnings[templateUrl] = messages;
  }
}

function handleTemplates(fileNames) {
  fileNames.forEach(function(fileName) {
    parseTemplate(fileName);
  });

  logger.printWarnings(templatesWithWarnings);
}

function parseTemplate(templateUrl) {
  var parsed;
  var warnings;
  var templateContent;

  try {
    templateContent = fs.readFileSync(templateUrl, {encoding: 'utf8'});
  } catch(err) {
    throw new Error(err);
  }

  parsed = cherrio.load(templateContent);
  warnings = parser.parse(parsed, templateUrl);

  linkWarningsWithTemplate(warnings, templateUrl);
}

module.exports = run;
