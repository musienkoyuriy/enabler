const fs = require('fs');
const glob = require('glob');
const ProgressBar = require('progress');

const { getA11yWarnings } = require('./parser');
const { printWarnings } = require('./logger');

const templatesWithWarnings = Object.create(null);

function linkWarningsWithTemplate(messages, templateUrl) {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = templatesWithWarnings[templateUrl].concat(messages);
  } else {
    templatesWithWarnings[templateUrl] = messages;
  }
}

function parseTemplate(templateUrl, options) {
  let templateContent;

  try {
    templateContent = fs.readFileSync(templateUrl, { encoding: 'utf8' });
  } catch (err) {
    throw new Error(err);
  }

  const warnings = getA11yWarnings(templateContent, options);

  linkWarningsWithTemplate(warnings, templateUrl);
}

function handleTemplates(fileNames, options) {
  const progressTotal = 20;
  const progressStep = progressTotal / fileNames.length;

  const bar = new ProgressBar(':progressMessage [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    total: progressTotal,
  });

  fileNames.forEach((fileName) => {
    bar.tick(progressStep, {
      progressMessage: 'Analyzing',
    });

    if (bar.complete) {
      bar.update(1, {
        progressMessage: 'Done',
      });
    }

    parseTemplate(fileName, options);
  });

  printWarnings(templatesWithWarnings);
}

function run(program) {
  const { path, ng } = program;
  const options = {
    ng,
  };

  if (!path) {
    console.error('Path is not specified'.error);
    process.exit(0);
  }

  glob(`${path}/**/*.html`, (err, fileNames) => {
    if (err) {
      throw new Error(`Files search error ${err}`);
    }
    handleTemplates(fileNames, options);
  });
}

module.exports = run;
