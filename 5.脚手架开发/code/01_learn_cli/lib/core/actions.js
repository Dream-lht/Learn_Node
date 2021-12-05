//使用node工具库当中的promisify，这个函数可以将非promise函数转为promise函数
const {promisify} = require('util');

//导入download-git-repo当中的download函数，并且将他转换为promise形式调用
const download = promisify(require('download-git-repo'));

//导入项目的git地址
const { vueRepo } = require('../config/repo-config');

//action函数
const createActions = async function(project,others){
    // 对createCommander进行操作
    //clone我们的项目
    await download(vueRepo,project);
    //执行npm install
    // 运行npm run serve
}

module.exports = {
    createActions,
}