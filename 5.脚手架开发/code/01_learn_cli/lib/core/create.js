const program = require('commander');
const {createActions} = require('./actions');
// 封装create命令

const createCommand = function(){
    program
    .command('create <project> [others...]')
    .description('clone project for git')
    .action(createActions(project,others));
}

// 导出create命令
module.exports = {
    createCommand
}