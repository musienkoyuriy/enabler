#!/usr/bin/env node

const program = require('commander');

program
  .version('1.2.1')
  .option('-P, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .parse(process.argv);

global.framework = program.ng ? 'angular' : undefined;

module.exports = require('./lib')(program);
