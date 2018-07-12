#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var src_1 = require("./src");
program
    .version('2.0.3', '-v, --version')
    .option('-p, --path <s>', 'Path for your root components folder')
    .option('--ng', 'Detect angular abstractions')
    .option('--vue', 'Support .vue files')
    .parse(process.argv);
if (program.ng) {
    global.framework = 'angular';
}
else if (program.vue) {
    global.framework = 'vue';
}
exports.default = src_1.run(program);
//# sourceMappingURL=cli.js.map