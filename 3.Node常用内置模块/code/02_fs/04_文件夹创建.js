const fs = require('fs');

// 需要创建文件夹的路径
const dirname = "why";

/**
 * 创建文件夹
 * 接收三个参数
 * path:创建文件夹的路径
 * options：配置项
 * callback：回调函数，接收一个参数err，如果创建失败就会调用
 * */ 

// 判断文件夹是否已经存在
// if(fs.existsSync(dirname)){
//     fs.mkdir(dirname,(err) => {
//         console.log(err);
//     })
// }


/**
 * 读取文件夹的所有文件
 * 传入两个参数
 * path：需要读取文件夹路径
 * callback：回调函数，接收两个参数，err，files，当读取失败时err存储报错信息，files文件夹数组列表
 */

fs.readdir(dirname,(err,files) => {
   if(err){
       console.log(err);
       return;
   }
   console.log(files);
})

/**
 * 重命名文件夹
 * 传入参数
 * oldPath：旧文件的地址
 * newPath：新文件的地址
 * callback：传入err参数，如果重命名失败就给err参数赋值
 * */ 
fs.rename(dirname,"coder",(err) => {
    console.log(err);
})