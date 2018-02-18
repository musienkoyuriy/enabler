'use strict';

var fs = require('fs');
var glob = require('glob');
var ProgressBar = require('progress');

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
  var progressTotal = 20;
  var progressStep = progressTotal / fileNames.length;
  var progressMessage;

  var bar = new ProgressBar(':progressMessage [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    total: progressTotal
  });

  fileNames.forEach(function(fileName) {
    bar.tick(progressStep, {
      progressMessage: 'Analyzing'
    });

    if (bar.complete) {
      bar.update(1, {
        progressMessage: 'Done'
      })
    }

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

  warnings = parser.parse(templateContent, templateUrl);

  linkWarningsWithTemplate(warnings, templateUrl);
}

module.exports = run;
