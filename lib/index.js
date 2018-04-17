const fs = require('fs');
const glob = require('glob');

const { getA11yWarnings, getContentFromVueFile, getTemplateFromComponentDecorator } = require('./parser');
const { printWarnings } = require('./logger');
const { getFrameworkName } = require('./utils');

const templatesWithWarnings = Object.create(null);

function linkWarningsWithTemplate(messages, templateUrl) {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = templatesWithWarnings[templateUrl].concat(messages);
  } else {
    templatesWithWarnings[templateUrl] = messages;
  }
}

function parseTemplate(templateUrl, options) {
  const isTSFile = templateUrl.endsWith('.ts');

  let fileContent;
  let template;

  try {
    fileContent = fs.readFileSync(templateUrl, { encoding: 'utf8' });
  } catch (err) {
    throw new Error(err);
  }

  switch (getFrameworkName()) {
    case 'angular':
      template = isTSFile ? getTemplateFromComponentDecorator(fileContent) : fileContent;
      break;
    case 'vue':
      template = getContentFromVueFile(fileContent);
      break;
    default:
      template = fileContent;
  }


  const warnings = getA11yWarnings(template, options);

  linkWarningsWithTemplate(warnings, templateUrl);
}

function handleTemplates(fileNames, options) {
  fileNames.forEach((fileName) => {
    parseTemplate(fileName, options);
  });

  printWarnings(templatesWithWarnings);
}

function getExtensionPattern() {
  const framework = getFrameworkName();

  if (framework === 'vue') {
    return 'vue';
  } else if (framework === 'angular') {
    return '+(html|ts)';
  }

  return 'html';
}

function run(program) {
  const { path, ng, vue } = program;
  const options = {
    ng, vue,
  };

  if (!path) {
    console.error('Path is not specified'.error);
    process.exit(0);
  }

  const extension = getExtensionPattern();

  glob(`${path}/**/*.${extension}`, (err, fileNames) => {
    if (err) {
      throw new Error(`Files search error ${err}`);
    }
    handleTemplates(fileNames, options);
  });
}

module.exports = run;
