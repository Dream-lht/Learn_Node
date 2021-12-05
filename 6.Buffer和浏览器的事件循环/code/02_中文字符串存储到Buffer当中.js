const message = "你好啊";

// 对中文进行编码
// const buffers = Buffer.from(message);
//console.log(buffers);       //<Buffer e4 bd a0 e5 a5 bd e5 95 8a>


//默认使用utf8进行编码，我们这里还可以使用utf16或其他编码
const buffers = Buffer.from(message,'utf16le');
console.log(buffers);   //<Buffer 60 4f 7d 59 4a 55>
//对字节进行解码 
console.log(buffers.toString('utf-16le'));    //你好啊