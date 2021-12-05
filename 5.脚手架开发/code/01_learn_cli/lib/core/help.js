const program = require('commander');

// 对help命令进行提取

const helpOptions = function(){
    // 增加自己的options
    program.option('-w --why','a why cli');
    program.option('-d --desc<desc>','get desc');

    // 监听命令，当终端输入--help的时候，执行下面的代码
    program.on('--help',() => {
        console.log("");
        console.log("Other:");
        console.log("       other optioons");
    })
}

// 导出help命令模块
module.exports = {
    helpOptions
}