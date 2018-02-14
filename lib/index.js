'use strict';

var fs = require('fs');
var glob = require('glob');
var cherrio = require('cheerio');

var parser = require('./parser');
var logger = require('./logger');

var templatesWithWarnings = Object.create(null);

function run() {
  glob('./test/components/**/*.html', function(err, files) {
    if (err) {
      throw new Error('Files search error ' + err);
      return;
    }
    checkTemplates(files);
  });
}

function linkWarningsWithTemplate(messages, templateUrl) {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = templatesWithWarnings[templateUrl].concat(messages);
  } else {
    templatesWithWarnings[templateUrl] = messages;
  }
}

function checkTemplates(templates) {
  for(var i=0; i < templates.length; i++) {
    parseTemplate(templates[i]);
  }
}

function parseTemplate(templateUrl) {
  var parsed;
  var warnings;

  fs.readFile(templateUrl, {encoding: 'utf8'}, function(err, file) {
    if (err) {
      throw new Error('Error while read the file: ' + err);
      return;
    }

    parsed = cherrio.load(file);
    warnings = parser.parse(parsed, templateUrl);

    linkWarningsWithTemplate(warnings, templateUrl);

    logger.printWarnings(templatesWithWarnings);
  });
}

module.exports = run;