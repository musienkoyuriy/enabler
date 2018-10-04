import chalk from 'chalk';
import { readFileSync } from 'fs';

const glob = require('glob');

import { printWarnings } from './logger';
import {
  getA11yWarnings,
  getContentFromVueFile,
  getTemplateFromComponentDecorator
} from './parser';
import { getFrameworkName } from './utils';
import { ProgramOptions } from './models';

const error = chalk.bold.red;

const templatesWithWarnings = Object.create(null);

function linkWarningsWithTemplate(messages: any, templateUrl: string): void {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = templatesWithWarnings[
      templateUrl
    ].concat(messages);
  } else {
    templatesWithWarnings[templateUrl] = messages;
  }
}

function getTemplate({ fileContent, isTSFile }: {fileContent: string; isTSFile: boolean;}): string {
  switch (getFrameworkName()) {
    case 'angular':
      return isTSFile
        ? getTemplateFromComponentDecorator(fileContent)
        : fileContent;
    case 'vue':
      return getContentFromVueFile(fileContent);
    default:
      return fileContent;
  }
}

function parseTemplate(templateUrl: string, options: ProgramOptions): void {
  const isTSFile = templateUrl.endsWith('.ts');

  let fileContent;

  try {
    fileContent = readFileSync(templateUrl, { encoding: 'utf8' });
  } catch (err) {
    throw new Error(err);
  }

  const template = getTemplate({
    isTSFile,
    fileContent
  });

  const warnings = getA11yWarnings(template, options);

  linkWarningsWithTemplate(warnings, templateUrl);
}

function handleTemplates(fileNames: string[], options: ProgramOptions): void {
  fileNames.forEach(fileName => {
    parseTemplate(fileName, options);
  });

  printWarnings(templatesWithWarnings);
}

function getExtensionPattern(): string {
  const framework = getFrameworkName();

  if (framework === 'vue') {
    return 'vue';
  } else if (framework === 'angular') {
    return '+(html|ts)';
  }

  return 'html';
}

export function run(program: any): void {
  const { path, ng, vue } = program;
  const options = { ng, vue };

  if (!path) {
    console.error(
      error(
        'Path is not specified. Use "--path" or "-p" options to specify a root folder.'
      )
    );
    process.exit(0);
  }

  const extension = getExtensionPattern();

  glob(`${path}/**/*.${extension}`, (err: Error, fileNames: string[]) => {
    if (err) {
      throw new Error(`Files search error ${err}`);
    }

    handleTemplates(fileNames, options);

    if (program.watch) {
      process.stdin.resume();
    }
  });
}
