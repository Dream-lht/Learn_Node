const path = require('path');

// 获取路径信息
const filePath = "/User/why/abc.txt";

// 获取当前文件所在路径
console.log(path.dirname(filePath));    ///User/why

// 获取当前文件名称
console.log(path.basename(filePath));    //abc.txt

// 获取文件的扩展名
console.log(path.extname(filePath));    //.txt

// join 路径拼接
const basePath = "User/why";
const fileName = "abc.txt";

const joinPath = path.join(basePath,fileName);
console.log(joinPath);    //User\why\abc.txt

// resolve路径拼接
// resolce会判断我们路径当中使用有/ ./ ../开头的路径
//如果没有，会在路径前面加上当前文件所在的路径
const joinPath2 = path.resolve(basePath,fileName);
console.log(joinPath2);    //D:\Code\Node\3.Node常用内置模块\code\01_path\User\why\abc.txt