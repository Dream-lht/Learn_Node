let name = "张三";
let age = 18;
const info = {
    color:"#fff",
}

/**
 * 导出变量的引用，相当于把变量的地址导出，然后在内存当中新开辟一块空间，创建一个模块环境记录，
 * 这个环境记录是实时的，就算foo当中的变量在之后发生变化，他也会重新对变量进行绑定
 * */ 
export{
    name,
    age,
    info,
}

setTimeout( () => {
    console.log(name);
})