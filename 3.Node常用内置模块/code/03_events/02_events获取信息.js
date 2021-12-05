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
