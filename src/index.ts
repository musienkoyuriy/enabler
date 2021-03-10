import { bold } from 'chalk';
import { OptionValues } from 'commander';
import { readFileSync } from 'fs';
import { ANGULAR, REACT, VUE } from './constants';

const glob = require('glob');

import { printWarnings } from './logger';
import { FileMetadata } from './models/common';
import { Warning } from './models/warnings';
import {
  getA11yWarningsFromStringTemplate,
  // getA11yWarningsFromJSXTemplate,
  // getASTTreeFromJSXFile,
  getContentFromVueFile,
  getContentFromVueXTemplate,
  getTemplateFromAngularDecorator,
  getTemplateFromVueObject
} from './parser';
import { UIFrameworkManager } from './ui-framework-manager';
import { getExtension } from './utils';

const error = bold.red;

const templatesWithWarnings = Object.create(null);
const frameworkManager = UIFrameworkManager.Instance;

function linkWarningsWithTemplate(
  warnings: Warning[],
  templateUrl: string
): void {
  if (templateUrl in templatesWithWarnings) {
    templatesWithWarnings[templateUrl] = [
      ...templatesWithWarnings[templateUrl],
      ...warnings
    ];
  } else {
    templatesWithWarnings[templateUrl] = warnings;
  }
}

function getStringTemplate({
  fileContent,
  fileExtension
}: FileMetadata): string {
  switch (frameworkManager.getFrameworkName()) {
    case ANGULAR:
      if (fileExtension === 'ts') {
        return getTemplateFromAngularDecorator(fileContent, 'ts');
      } else if (fileExtension === 'dart') {
        return getTemplateFromAngularDecorator(fileContent, 'dart');
      } else {
        return fileContent;
      }
    case VUE:
      if (fileExtension === 'vue') {
        return getContentFromVueFile(fileContent);
      } else if (fileExtension === 'js' || fileExtension === 'ts') {
        return getTemplateFromVueObject(fileContent);
      } else {
        return getContentFromVueXTemplate(fileContent);
      }
    default:
      return fileContent;
  }
}

function parseTemplate(templateUrl: string): void {
  const fileExtension = getExtension(templateUrl);

  let fileContent;

  try {
    fileContent = readFileSync(templateUrl, { encoding: 'utf8' });
  } catch (err) {
    throw new Error(err);
  }

  if (frameworkManager.getFrameworkName() !== REACT) {
    const template = getStringTemplate({
      fileExtension,
      fileContent
    });

    const warnings = getA11yWarningsFromStringTemplate(template);

    linkWarningsWithTemplate(warnings, templateUrl);
  } else {
    // const ASTTree = getASTTreeFromJSXFile(fileContent);
    // const warnings = getA11yWarningsFromJSXTemplate(ASTTree);
    // linkWarningsWithTemplate(warnings, templateUrl);
  }
}

function handleTemplates(fileNames: string[]): void {
  fileNames.forEach(fileName => parseTemplate(fileName));
  printWarnings(templatesWithWarnings);
}

function getExtensionPattern(): string {
  const framework = frameworkManager.getFrameworkName();

  if (framework === 'vue') {
    return '+(vue|ts|js|html)';
  } else if (framework === 'angular') {
    return '+(html|ts|dart)';
  } else if (framework === 'react') {
    return '+(js|jsx)';
  }

  return '+(html|htm)';
}

export function run(programOptions: OptionValues): void {
  const { path, watch } = programOptions;

  if (!path) {
    console.error(
      error(
        'Path is not specified. Use "--path" or "-p" options to specify a root folder.'
      )
    );
    process.exit(0);
  }

  glob(
    `${path}/**/*.${getExtensionPattern()}`,
    (err: Error, fileNames: string[]) => {
      if (err) {
        throw new Error(`Files search error ${err}`);
      }

      handleTemplates(fileNames);

      if (watch) {
        process.stdin.resume();
      }
    }
  );
}
