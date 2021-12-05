#!/usr/bin/env node

// 对commander进行导入
const program = require('commander');

// 导入命令模块
const {helpOptions} = require('./lib/core/help')

// 获取版本号
program.version(require('./package.json').version);

// 执行命令模块
helpOptions();

program.parse(process.argv);