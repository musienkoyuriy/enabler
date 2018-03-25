const fs = require('fs');
const glob = require('glob');

const { getA11yWarnings, getContentFromVueFile } = require('./parser');
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

  templateContent = options.vue ? getContentFromVueFile(templateContent) : templateContent;

  const warnings = getA11yWarnings(templateContent, options);

  linkWarningsWithTemplate(warnings, templateUrl);
}

function handleTemplates(fileNames, options) {
  fileNames.forEach((fileName) => {
    parseTemplate(fileName, options);
  });

  printWarnings(templatesWithWarnings);
}

function getExtension(options) {
  const { vue } = options;

  return vue ? 'vue' : 'html';
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

  const extension = getExtension(options);

  glob(`${path}/**/*.${extension}`, (err, fileNames) => {
    if (err) {
      throw new Error(`Files search error ${err}`);
    }
    handleTemplates(fileNames, options);
  });
}

module.exports = run;
