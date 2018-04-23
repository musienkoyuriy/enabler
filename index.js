#!/usr/bin/env node

const program = require('commander');

program
  .version('1.4.3')
  .option('-P, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .option('--vue', 'Support .vue files')
  .parse(process.argv);

if (program.ng) {
  global.framework = 'angular';
} else if (program.vue) {
  global.framework = 'vue';
}

module.exports = require('./lib')(program);
