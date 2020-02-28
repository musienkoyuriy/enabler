#!/usr/bin/env node

import program = require('commander');
import { run } from '.';

program
  .version('2.9.0', '-v, --version')
  .option('-p, --path <s>', 'Path for your root components folder')
  .option('--react', 'Detect react components')
  .option('--ng, --angular', 'Detect angular abstractions')
  .option('--vue', 'Support .vue files')
  .parse(process.argv);

if (program.angular) {
  (global as any).framework = 'angular';
} else if (program.vue) {
  (global as any).framework = 'vue';
} else if (program.react) {
  (global as any).framework = 'react';
}

export default run(program);
