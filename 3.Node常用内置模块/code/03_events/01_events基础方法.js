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


