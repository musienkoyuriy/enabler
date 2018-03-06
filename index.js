#!/usr/bin/node

'use strict';

const path = process.argv[process.argv.length - 1];

exports = module.exports = require('./lib');

require('./lib')(path);
