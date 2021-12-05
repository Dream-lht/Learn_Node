// 创建一
// const message = "Hello";
// const buffers = new Buffer(message);

// console.log(buffers);    //<Buffer 48 65 6c 6c 6f>


//创建二：推荐使用
const message = "Hello";

const buffers = Buffer.from(message);

console.log(buffers);