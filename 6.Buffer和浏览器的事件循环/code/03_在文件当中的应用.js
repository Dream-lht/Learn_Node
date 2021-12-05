const fs = require('fs');

fs.readFile('04_test.txt',(err,data) => {
    if(err){
        console.log(err);
        return;
    }
    //可以通过buffer来解码文件流的二进制
    console.log(data.toString());
});

