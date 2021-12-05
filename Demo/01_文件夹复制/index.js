const fs = require('fs');
const path = require('path');

// 先创建新文件夹
const newFilesPath = 'copyFile';
const oldDirPath = "test"

fs.mkdir(newFilesPath, (err) => {
    console.log(err);
})

// 读取旧文件夹当中的文件信息
fs.readdir(oldDirPath,{withFileTypes:true},(err,data) => {
    if(err){
        console.log(err);
        return;
    }
    // 对读取到的文件进行操作，把他从旧文件夹复制到新文件夹
    data.forEach((item,index) => {
        console.log(item);
        fs.readFile(path.resolve(oldDirPath,item.name),{encoding:'utf-8'},(err,info) => {
            console.log("读取文件信息"+item.name);
            if(err){
                console.log(err);
                return;
            }
            // 写入到新文件夹当中
            fs.writeFile(path.resolve(newFilesPath,item.name),info,{flag:'a'},(writeErr) => {
                console.log(writeErr);
            })
        })
    })
})