#!/usr/bin/env node

import program = require('commander');
import { run } from '.';

program
  .version('2.8.0', '-v, --version')
  .option('-p, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .option('--vue', 'Support .vue files')
  .option('--watch', 'Whatch for templates')
  .parse(process.argv);

if (program.ng) {
  (global as any).framework = 'angular';
} else if (program.vue) {
  (global as any).framework = 'vue';
}

export default run(program);
