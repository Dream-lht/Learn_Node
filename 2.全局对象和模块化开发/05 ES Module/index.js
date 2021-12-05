// 这里对foo模块进行导入
import {name,age,info}from "./module/foo.js";

// 更改foo模块当中的变量
console.log(name);
setTimeout( () => {
    name = "777";
},1000)