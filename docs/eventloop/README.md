

# 事件环

+ 执行顺序：主栈代码->清空微任务队列->取出一个宏任务执行->再清空微任务

```
// - 微任务： promise.then ，MutationObserver，
// - 宏任务：script ，ajax ， 事件，requestFrameAnimation， setTimeout ，setInterval ，setImmediate （ie下），MessageChannel ，UI rendering。
```

```javascript
async function async1(){
    console.log('async1 start')

    await async2();
    console.log('async1 end')

    // node11以前 环境解析是这样的
    // async2().then(()=>{
    //     return 
    // }).then(()=>{
    //     console.log('async1 end')
    // })
    // node11+和浏览器的解析是这个样子
    // Promise.resolve(async2()).then(data=>{
    //     console.log('async1 end')
    // })
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1(); // 执行完async 1 就结束了
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```
## node中的事件环
```

    ┌───────────────────────┐
┌─> │        timers         │ 本阶段执行setTimeout() 和 setInterval() 
│   └──────────┬────────────┘
│   ┌──────────┴────────────┐
│   │     I/O callbacks     │ 这个阶段执行一些诸如TCP错误之类的系统操作的回调
│   └──────────┬────────────┘
│   ┌──────────┴────────────┐
│   │     idle, prepare     │ 只内部使用
│   └──────────┬────────────┘      ┌───────────────┐
│   ┌──────────┴────────────┐      │   incoming:   │
│   │         poll          │  <───┤  connections, │ 获取新的 I/O 事件,查找已经到时的定时器
│   └──────────┬────────────┘      │   data, etc.  │
│   ┌──────────┴────────────┐      └───────────────┘
│   │        check          │ setImmediate()
│   └──────────┬────────────┘
│   ┌──────────┴────────────┐
└──-┤    close callbacks    │ 关闭事件的回调 socket.close事件
    └──────────────────────—┘
```