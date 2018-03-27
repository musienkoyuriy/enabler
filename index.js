#!/usr/bin/env node

const program = require('commander');

program
  .version('1.3.2')
  .option('-P, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .option('--vue', 'Support vue.js files')
  .parse(process.argv);

global.framework = program.ng ? 'angular' : undefined;

if (program.ng) {
  global.framework = 'angular';
} else if (program.vue) {
  global.framework = 'vue';
}

module.exports = require('./lib')(program);
