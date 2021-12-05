## 一、Node常用内置模块

### 1. 内置模块path

1. **path.resolve()**

   1. path模块用于对路径的拼接和文件进行处理，

   2. window上会使用\或\\来作为问你件的路径分隔符，当然木器也支持/

   3. Linux和mac os的Unix操作系统山使用/来作为文件路径的分隔符

      ~~~js
      const path = require('path');
      const  basePath = "/user/module";
      
      const filePath = "abc.txt";
      
      /**
       * 使用path模块当中的resolve方法对文件进行拼接
       * 传递多个需要拼接的路径
       * */ 
      const fileName = path.resolve(basePath,filePath);
      console.log(fileName);    //D:\user\module\abc.txt
      
      
      ~~~

   4. path模块其他方法使用

      ~~~js
      const path = require('path');
      
      // 获取路径信息
      const filePath = "/User/why/abc.txt";
      
      // 获取当前文件所在路径
      console.log(path.dirname(filePath));    ///User/why
      
      // 获取当前文件名称
      console.log(path.basename(filePath));    //abc.txt
      
      // 获取文件的扩展名
      console.log(path.extname(filePath));    //.txt
      
      // join 路径拼接
      const basePath = "User/why";
      const fileName = "abc.txt";
      
      const joinPath = path.join(basePath,fileName);
      console.log(joinPath);    //User\why\abc.txt
      
      // resolve路径拼接
      // resolce会判断我们路径当中使用有/ ./ ../开头的路径
      //如果没有，会在路径前面加上当前文件所在的路径
      const joinPath2 = path.resolve(basePath,fileName);
      console.log(joinPath2);    //D:\Code\Node\3.Node常用内置模块\code\01_path\User\why\abc.txt
      ~~~

### 2. 内置模块fs

1. **fsAPI**介绍

   1. 同步操作文件：代码会被阻塞，不会继续执行

   2. 异步函数操作文件，代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行

   3. 异步Promise操作文件：代码不会被阻塞，通过fs.promise调用方法，会返回一个Promise，可以通过then、catch执行

      ~~~js
      const fs = require('fs');
      
      const filePath = "./01_text.txt";
      // 同步调用，会阻塞后续代码的执行
      const infoSync = fs.statSync(filePath);
      console.log("同步调用");
      console.log(infoSync);
      
      // 异步调用，不会阻塞后续代码实现，当文件读取I/O完毕会自动执行回调函数
      // 回调函数接收两个参数 err 当err以值的时候，说明文件读取失败，当err没有值的时候，说明文件地区成功
      const infoAsync = fs.stat(filePath,(err,info) => {
          if(err){
              // 对err进行处理
              console.log(err);
              return;
          }
          // 对读取到的文件进行处理
          console.log("异步调用");
          console.log(info);    
      })
      
      
      // 异步promise调用，避免回调函数调用的回调地狱的问题
      // 要注意，并不是所以的API接口都支持Promise
      fs.promises.stat(filePath).then( (infoPromise) => {
          console.log("异步Promise调用");
          console.log(infoPromise);
      }).catch( (err) => {
          console.log(err);
      })
      ~~~

2. 文件描述符（**fd**）

   1. 概念：在POSIX系统当中，对于每一个进程，内核都维护着一张当前打开着的文件和资源的表格
   2. 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符
   3. 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件
   4. Windows系统使用了一个虽然不同但概念上类似的机制来跟踪资源
   5. **open**获取文件标识符

   ~~~js
   const fs = require('fs');
   
   const filePath = "./01_text.txt";
   // 通过open来获取文件描述符
   
   fs.open(filePath,(err,info) => {
       if(err){
           console.log(err);
           return;
       }
       console.log(info);   //3
       // 通过标识符获取文件信息，一般通过标识符获取信息的API之前都由f开头
       fs.fstat(info,(err,content) => {
           if(err){
               console.log(err);
               return;
           }
           // 获取到的文件信息
           console.log(content);
       })
   })
   ~~~

3. 文件的读写

   1. 文件的写入

      ~~~js
      const fs = require('fs');
      
      /**
       * 文件的写入
       * write 通过文件标识符来获取文件
       * writeFile 通过文件路径来获取文件
       * 传入四个参数
       * filePath:文件的路径
       * data：需要写入的内容
       * options：配置项（可选）,比如写入方式，是覆盖还是追加等
       * callback：执行完成的回调函数，只有一个err参数，当写入失败会打印err
       * */ 
      
      const data = "你好啊，李应和";
      fs.writeFile('01_text.txt',data,{flag:"a"},(err) => {
          console.log(err);       //null
      });
      ~~~

   2.文件的读取

   ~~~js
   const fs = require('fs');
   
   /**
    * 文件的读取
    * 传入三个参数
    * filePath:文件的地址
    * options:读取的配置，比如读取出来使用说明编码，常用的以utf-8等
    * callback：回调函数，接收两个参数，第一个参数err，如果文件读取失败，者返回错误，否则为null，如果文件读取成功，则返回data
    * */ 
   fs.readFile("01_text.txt",{encoding:'utf-8'},(err,data) => {
       if(err){
           console.log(err);
           return;
       }
       // 打印读取到的文件内容
       console.log(data);   //你好啊，李应和
   });
   ~~~

   1. 关于options配置——**flag**

      ![01_文件读取flag配置](D:\Code\Node\3.Node常用内置模块\image\01_文件读取flag配置.png)

   1. 关于options配置——**encoding**

      ![02_encoding编码](D:\Code\Node\3.Node常用内置模块\image\02_encoding编码.png)

4. 文件夹的操作

   1. 创建文件夹

      ~~~js
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
      
      判断文件夹是否已经存在
      if(fs.existsSync(dirname)){
          fs.mkdir(dirname,(err) => {
              console.log(err);
          })
      }
      ~~~

      

   2. 读取文件夹

      ~~~js
      const fs = require('fs');
      
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
      ~~~

   3. 重命名文件夹

      ~~~js
      const fs = require('fs');
      
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
      ~~~

### 3.内置模块events

1. Node当中的核心API都是基于异步事件驱动的，在这个体系当中，某些对象(发射器**Emitters**)发出某一个事件，我们可以监听这个事件(监听器**Listeners**),并且传入回调函数，这个回调函数会在监听到事件时调用

2. 发出事件和监听事件都是通过**EventEmitter**类来完成的，他们都属于events对象

   1. **emitter.on(eventName,listener)**:监听事件，也可以使用addListener；
   2. emitter.off（eventName,Listener）:移除事件监听，也可以使用removeListener；
   3. emitter.emot(eventName[...args])：发出事件，可以携带一些参数

3. 基本方法

   ~~~js
   const EventEmitter = require('events');
   const { emit } = require('process');
   
   // 实例化一个事件实例
   const emitter = new EventEmitter();
   
   /**
    * addListener as on   这两个API都是一样的，addListener是on的别名
    * 设置监听器
    * @params eventName 监听事件的名字
    * @params listener 需要执行的函数 
    * */ 
   emitter.on('click',(args) => {
       console.log("监听1监听成功",args);
   })
   
   const listener = (args) => {
       console.log("监听2监听成功",args)
   }
   
   emitter.on('click',listener);
   
   // 发送事件
   setTimeout( () => {
       emitter.emit('click',"anni");
       // 取消事件
       emitter.off('click',listener);
       emitter.emit('click',"anni");
   },2000);
   ~~~

4. 获取事件注册表信息

   ~~~js
   const EventEmitter = require('events');
   const { emit } = require('process');
   
   // 实例化一个事件实例
   const emitter = new EventEmitter();
   
   /**
    * addListener as on   这两个API都是一样的，addListener是on的别名
    * 设置监听器
    * @params eventName 监听事件的名字
    * @params listener 需要执行的函数 
    * */ 
   emitter.on('click',(args) => {
       console.log("监听1监听成功",args);
   })
   
   const listener = (args) => {
       console.log("监听2监听成功",args)
   }
   
   emitter.on('click',listener);
   emitter.on('tap',(args) => {
       console.log("监听Tap事件");
   })
   
   // 获取监听事件表的信息
   console.log(emitter.eventNames());      //  [ 'click', 'tap' ]
   //获取某一个事件有多少个监听
   console.log(emitter.listenerCount('click'));        //2
   // 获取事件监听函数
   console.log(emitter.listeners('click'));  //[ [Function (anonymous)], [Function: listener] ]
   ~~~

5. 不常用API

   1. **emitter.once** 只监听最后一次调用
   2. **emitter.prependListener **将本次监听放到最前面
   3. **emitter.removeAllListeners** 移除所有的监听器，可以参数，移除特定监听器

6. 