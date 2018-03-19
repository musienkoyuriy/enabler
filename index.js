#!/usr/bin/env node

const program = require('commander');

program
  .version('1.1.3')
  .option('-P, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .parse(process.argv);

global.isNg = program.ng;

module.exports = require('./lib')(program);
