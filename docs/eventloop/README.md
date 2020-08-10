

# 事件环

## 浏览器的事件环

![eventloop2](http://img.zhufengpeixun.cn/eventloop2.png)

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

+ ![img](http://img.zhufengpeixun.cn/nodelibuv2.jpg)
+ ![img](http://img.zhufengpeixun.cn/nodeeventloop.jpg)
+ 这里的**每一个阶段**都对应着一个**事件队列**
+ 每当event loop执行到某个阶段时，都会执行对应的事件队列中的事件，依次执行
+ 当该队列执行完毕或者执行数量超过上限，event loop就会执行下一个阶段
+ 每当event loop切换一个执行队列时，就会去清空microtasks queues，然后再切换到下个队列去执行，如此反复
+ nextTick独立于时间环，有自己的队列，优先级比微任务高

```javascript
setImmediate(()=>{
  console.log('setImmediate1')
  process.nextTick(()=>{console.log('nextTick2')})
  setTimeout(()=>{
    console.log('setTimeout1')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout2')
  process.nextTick(()=>{console.log('nextTick1')})
  setImmediate(()=>{
    console.log('setImmediate2')
  })
},0)

/**
 setTimeout2
 nextTick1
 setImmediate1
 nextTick2
 setImmediate2
 setTimeout1
 */

// setImmediate1执行, 把callback放入check事件队列
// 执行setTimeout2, 把callback放入timer事件队列
// 由于timer比check先执行，所以取出timer事件队列执行
// 输出setTimeout2
// 把process.nextTick的callback放入当前timer的微任务队列
// 把setImmediate2的callback放入check事件队列
// 清空timer事件队列的微任务队列
// 输出nextTick1
// 取出check事件队列的一个宏任务执行
// 输出setImmediate1
// 把setTimeout1推入timer事件队列的宏任务中
// 清空timer事件队列的微任务队列
// 输出nextTick2
// 取出check事件队列的一个宏任务执行
// 输出setImmediate2
// check事件队列完成，进入下一个事件循环
// 取出timer事件队列的宏任务
// 输出setTimeout1


```

