#!/usr/bin/env node

import { Command } from 'commander';
import { UIFrameworkManager } from './ui-framework-manager';
import { run } from '.';
import { FrameworkName } from './models/common';
import { ANGULAR, VUE, REACT, NO_FRAMEWORK } from './constants';

const program = new Command();

program
  .version('2.10.0', '-v, --version')
  .option('-p, --path <s>', 'Path for your root components folder')
  .option('--react', 'Detect react components')
  .option('--ng, --angular', 'Detect angular abstractions')
  .option('--vue', 'Support .vue files')
  .parse(process.argv);

const options = program.opts();

const frameworkManager = UIFrameworkManager.Instance;
let frameworkName: FrameworkName = NO_FRAMEWORK;

if (options.angular) {
  frameworkName = ANGULAR;
} else if (options.vue) {
  frameworkName = VUE;
} else if (options.react) {
  frameworkName = REACT;
}

frameworkManager.setFrameworkName(frameworkName);

export default run(options);
