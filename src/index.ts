import chalk from 'chalk';
import { readFileSync } from 'fs';

const glob = require('glob');

import { printWarnings } from './logger';
import { Warning } from './models/warnings';
import {
  getA11yWarnings,
  getContentFromVueFile,
  getTemplateFromComponentDecorator
} from './parser';
import { getFrameworkName } from './utils';

const error = chalk.bold.red;

const templatesWithWarnings = Object.create(null);

function linkWarningsWithTemplate(warnings: Warning[], templateUrl: string): void {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = [
      ...templatesWithWarnings[templateUrl],
      ...warnings
    ];
  } else {
    templatesWithWarnings[templateUrl] = warnings;
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

function parseTemplate(templateUrl: string): void {
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

  const warnings = getA11yWarnings(template);

  linkWarningsWithTemplate(warnings, templateUrl);
}

function handleTemplates(fileNames: string[]): void {
  fileNames.forEach(fileName => parseTemplate(fileName));
  printWarnings(templatesWithWarnings);
}

function getExtensionPattern(): string {
  const framework = getFrameworkName();

  if (framework === 'vue') {
    return 'vue';
  } else if (framework === 'angular') {
    return '+(html|ts)';
  }

  return '+(html|htm)';
}

export function run(program: any): void {
  const { path } = program;

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

    handleTemplates(fileNames);

    if (program.watch) {
      process.stdin.resume();
    }
  });
}
