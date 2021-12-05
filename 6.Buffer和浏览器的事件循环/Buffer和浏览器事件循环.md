## Buffer和浏览器事件循环

### 一、Buffer

1. 数据的二进制
   1. 计算机当中所有的内容：文字、数字、图片、音频、视频最终都会使用二进制来表示
   
2. Buffer的创建方式

   ~~~js
   // 创建一
   // const message = "Hello";
   // const buffers = new Buffer(message);
   
   // console.log(buffers);    //<Buffer 48 65 6c 6c 6f>
   
   
   //创建二：推荐使用
   const message = "Hello";
   
   const buffers = Buffer.from(message);
   
   console.log(buffers);
   ~~~

3. 对中文字符的处理

   ~~~js
   const message = "你好啊";
   
   // 对中文进行编码
   // const buffers = Buffer.from(message);
   //console.log(buffers);       //<Buffer e4 bd a0 e5 a5 bd e5 95 8a>
   
   
   //默认使用utf8进行编码，我们这里还可以使用utf16或其他编码
   const buffers = Buffer.from(message,'utf16le');
   console.log(buffers);   //<Buffer 60 4f 7d 59 4a 55>
   //对字节进行解码 
   console.log(buffers.toString('utf-16le'));    //你好啊
   ~~~

4. 与文件的应用

   ~~~js
   const fs = require('fs');
   
   fs.readFile('04_test.txt',(err,data) => {
       if(err){
           console.log(err);
           return;
       }
       //可以通过buffer来解码文件流的二进制
       console.log(data.toString());
   
   });
   ~~~

5. Buffer当中的原理：当你在代码当中使用Buffer的时候，第一次使用会申请8KB的内存空间，接下来的其他Buffer会从第一次申请的空间当中获取空间，进行偏移操作(<<<)；

### 二、事件循环和异步IO

1. 什么是事件循环

   1. 事实上，我们把事件循环循环理解成我们编写的JavaScript和浏览器或者Node之间的一个桥梁
   2. 浏览器的事件循环是一个我们编写的JavaScript代码和浏览器API的一个桥梁，桥梁之间他们通过回调函数进行沟通
   3. Node的事件循环是一个我们编写的JavaScript代码和系统调用之间的桥梁，桥梁之间他们通过回调函数进行沟通的

2. 进程和线程

   1. 进程：计算机已经运行的程序
   2. 线程：操作系统能够运行运算调度的最小调度
   3. 简而言之：我们可以这样认为，启动一个程序，就会默认启动一个进程(也可以称为多进程)，线程：每个进程中都会启动一个线程来执行我们程序当中的代码，这个线程被称为主线程，所以我们也可以说进程是**线程的容器**

3. 多进程多线程开发

   1. 这是因为CPU的运算速度非常快，他可以快速的在多个进程之间快速切换
   2. 当我们的进程中的线程获取到时间片时，就可以快速执行我们编写的代码
   3. 对于用户来说是感受不到这种切换的

4. 浏览器和JavaScript

   1. 我们常说JavaScript是单线程，但是JavaScript的线程应该有自己的容器进程：浏览器或者Node
   2. 浏览器进程
      1. 目前多数的浏览器其实是多进程的，当我们打开一个tab页面时就会启动，这是为了防止一个页面卡死而造成所有的页面都无法响应，珍格格浏览器需要强制退出
      2. 每个进程当中又有很多线程，其中包括JavaScript代码的线程
   3. 但是JavaScript的代码执行是在一个单线程当中执行的，这意味着JavaScript的代码在同一时刻只能做一件事情，如歌这件事情非常耗时间，就意味着当前的线程会被阻塞

5. 浏览器的事件循环

   1. 如果在执行JavaScript的过程当中发生异步操作（**比如setTimeout**），这个函数会在执行结束后立即退出调用栈，不会阻塞后续代码的执行

   2. 传入的回调函数会被放入到事件队列当中，寻找合适的时机来调用

      ~~~js
      setTimeout( () => {
          console.log("setTimeout");
      })
      ~~~

      ![浏览器事件循环](D:\Code\Node\6.Buffer和浏览器的事件循环\image\浏览器事件循环.png)

      3.DOM监听，ajax请求，定时器等都会被放入到事件队列进行等待处理，当调用栈执行完成之后在对事件队列进行处理

6. 宏任务和微任务

   1. 事件循环当中并非维护一个队列，事实上有两个队列
      1. 宏认务队列(macrotask)：ajax、setTimeout、setInterval、DOM监听、UI Rendering等
      2. 微任务队列(macrotask)：Promise的then回调、Mutation Observer API、queueMicrotask等
   2. 两个队列的优先级
      1. 调用栈当中的代码最先被执行(顶层的script代码)
      2. 在执行任何一个宏任务之前，都必须保证微任务队列是空的
      3. 如果不为空，那么就优先执行微任务队列当中的任务(回调)
   3. async和await
      1. async和await是Promise的一个语法糖
      2. 我们可以将await关键字后面执行的代码，看似是包裹在（resolve,reject） =>{函数执行}当中的代码
      3. await的下一条语句，可以看做是then( res => {函数执行})当中的代码