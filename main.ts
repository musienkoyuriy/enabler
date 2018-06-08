#!/usr/bin/env node

import program = require('commander');
import { run } from './src';

program
  .version('2.0.0', '-v, --version')
  .option('-p, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .option('--vue', 'Support .vue files')
  .parse(process.argv);

if (program.ng) {
  (global as any).framework = 'angular';
} else if (program.vue) {
  (global as any).framework = 'vue';
}

export default run(program);
