/**
 * require 模块内部的全局变量，可以导入其他模块
 * @params path 模块路径
 */

/**
 * bar相当于 {name,age,sayHello}
 */
var {name,age,sayHello} = require('./foo');
console.log(name);
console.log(age);
sayHello("jack");

setTimeout( () => {
    console.log(name);
},2000)