const fs = require('fs');

const filePath = "./01_text.txt";
// 同步调用，会阻塞后续代码的执行
const infoSync = fs.statSync(filePath);
console.log("同步调用");
console.log(infoSync);

// 异步调用，不会阻塞后续代码实现，当文件读取I/O完毕会自动执行回调函数
// 回调函数接收两个参数 err 当err以值的时候，说明文件读取失败，当err没有值的时候，说明文件地区成功
const infoAsync = fs.stat(filePath,(err,info) => {
    if(err){
        // 对err进行处理
        console.log(err);
        return;
    }
    // 对读取到的文件进行处理
    console.log("异步调用");
    console.log(info);    
})


// 异步promise调用，避免回调函数调用的回调地狱的问题
// 要注意，并不是所以的API接口都支持Promise
fs.promises.stat(filePath).then( (infoPromise) => {
    console.log("异步Promise调用");
    console.log(infoPromise);
}).catch( (err) => {
    console.log(err);
})