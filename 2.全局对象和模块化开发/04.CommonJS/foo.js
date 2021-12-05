var name = "晓丽";
var age = 18;
var sayHello = (name) => {
    console.log(name+"hello");
}

// 在这里对模块内部的变量进行导出
exports.name = name;
exports.age = age;
exports.sayHello = sayHello;

setTimeout( () => {
    exports.name = "小瓦";
},1000)
