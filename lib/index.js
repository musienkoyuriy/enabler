'use strict';

const fs = require('fs');
const glob = require('glob');
const ProgressBar = require('progress');

const { getA11yWarnings } = require('./parser');
const { printWarnings } = require('./logger');

const templatesWithWarnings = Object.create(null);

function run(path) {
  glob(`${path}/**/*.html`, (err, fileNames) => {
    if (err) {
      throw new Error(`Files search error ${err}`);
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
  const progressTotal = 20;
  const progressStep = progressTotal / fileNames.length;
  let progressMessage;

  const bar = new ProgressBar(':progressMessage [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    total: progressTotal
  });

  fileNames.forEach((fileName) => {
    bar.tick(progressStep, {
      progressMessage: 'Analyzing'
    });

    if (bar.complete) {
      bar.update(1, {
        progressMessage: 'Done'
      });
    }

    parseTemplate(fileName);
  });

  printWarnings(templatesWithWarnings);
}

function parseTemplate(templateUrl) {
  let parsed;
  let warnings;
  let templateContent;

  try {
    templateContent = fs.readFileSync(templateUrl, {encoding: 'utf8'});
  } catch(err) {
    throw new Error(err);
  }

  warnings = getA11yWarnings(templateContent, templateUrl);

  linkWarningsWithTemplate(warnings, templateUrl);

}

module.exports = run;
