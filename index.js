#!/usr/bin/env node

const program = require('commander');

program
  .version('1.0.8')
  .option('-P, --path <s>', 'Path for your root components folder')
  .option('--ng', 'Detect angular abstractions')
  .parse(process.argv);

module.exports = require('./lib')(program);
