const fs = require('fs');

const filePath = "./01_text.txt";
// 通过open来获取文件描述符

fs.open(filePath,(err,info) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(info);   //3
    // 通过标识符获取文件信息
    fs.fstat(info,(err,content) => {
        if(err){
            console.log(err);
            return;
        }
        // 获取到的文件信息
        console.log(content);
    })
})


