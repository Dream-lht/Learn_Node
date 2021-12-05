const path = require('path');
const  basePath = "/user/module";

const filePath = "abc.txt";

/**
 * 使用path模块当中的resolve方法对文件进行拼接
 * 传递多个需要拼接的路径
 * */ 
const fileName = path.resolve(basePath,filePath);
console.log(fileName);

