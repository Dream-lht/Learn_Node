const fs = require('fs');

/**
 * 文件的写入
 * write 通过文件标识符来获取文件
 * writeFile 通过文件路径来获取文件
 * 传入四个参数
 * filePath:文件的路径
 * data：需要写入的内容
 * options：配置项（可选）,比如写入方式，是覆盖还是追加等
 * callback：执行完成的回调函数，只有一个err参数，当写入失败会打印err
 * */ 

const data = "你好啊，李应和";
fs.writeFile('01_text.txt',data,{flag:"a"},(err) => {
    console.log(err);       //null
});

/**
 * 文件的读取
 * 传入三个参数
 * filePath:文件的地址
 * options:读取的配置，比如读取出来使用说明编码，常用的以utf-8等
 * callback：回调函数，接收两个参数，第一个参数err，如果文件读取失败，者返回错误，否则为null，如果文件读取成功，则返回data
 * */ 
fs.readFile("01_text.txt",{encoding:'utf-8'},(err,data) => {
    if(err){
        console.log(err);
        return;
    }
    // 打印读取到的文件内容
    console.log(data);   //你好啊，李应和
});