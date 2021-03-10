#!/usr/bin/env node

import { Command } from 'commander'
import { run } from '.';

const program = new Command()

program
  .version('2.10.0', '-v, --version')
  .option('-p, --path <s>', 'Path for your root components folder')
  .option('--react', 'Detect react components')
  .option('--ng, --angular', 'Detect angular abstractions')
  .option('--vue', 'Support .vue files')
  .parse(process.argv);

const options = program.opts()

if (options.angular) {
  (global as any).framework = 'angular';
} else if (options.vue) {
  (global as any).framework = 'vue';
} else if (options.react) {
  (global as any).framework = 'react';
}

export default run(program);
