---
title: 手摸手带你撸Promise源码
date: 2020-02-15
sidebar: 'auto'
categories:
 - 前端
tags:
 - Promise
 - 原理
publish: true
---
# 手摸手带你撸Promise源码

如果要实现一个最简单的Promise，如下图所示，你有什么想法么？

```javascript
let p = new Promise(((resolve, reject) =>
    resolve('yes');
    //reject('no');
    //throw new Error('错误');
));
p.then(data=>{
    console.log('success', data)
}, err=>{
    console.log('err', err)
});

// 正确的打印
// success ok
```

我们可以观察到上面的Promise例子有如下特点：

+ Promise是一个类
+ 每次new一个Promise都需要传入一个执行器 执行器是立即执行的
+ 执行器函数有两个参数 resolve reject
+ 每个promise都有一个then方法

基于以上四点我们就开始来写一个最简单的Promise

```javascript
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    // 默认Promise有三个状态 pending fulfilled reject
    this.status = PENDING;
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
      }
    };
    try {
        // 执行器 创建promise executor会立即执行
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECT) {
      onRejected(this.reason);
    }
  }
}
```

然鹅我们会发现 如果在执行器里使用`setTimeout`就gg了，以下代码会什么都不打印，因为status还是`PENDING`状态

```javascript
let Promise = require('./promise')
let p = new Promise(((resolve, reject) =>{
    setTimeout(()=>{
        resolve('ok')
    })
}));
p.then(data=>{
    console.log('success', data)
}, err=>{
    console.log('err', err)
});
p.then(data=>{
    console.log('success', data)
}, err=>{
    console.log('err', err)
});

// 正确的打印
// success ok
// success ok
```

针对这一段代码的需求，我们观察到：

+ 必须要支持`setTimeout `等延时函数
+ `then`方法可以有多个
+ 要对状态是`PENDING`的时候进行处理，在状态还是`PENDING`时应该把回调函数存起来，等待resolve或reject执行后再执行回调

基于以上几点我们对上面的代码进行修改：

```javascript
const PENDING = "PENDING"; // 初始态或等待态
const FULFILLED = "FULFILLED"; // 成功态
const REJECT = "REJECT"; // 失败态
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    // 默认Promise有三个状态 pending fulfilled reject
    this.status = PENDING;
    // resolve回调数组
    this.onResolvedCallbacks = [];
    // reject回调数组
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        // 执行回调
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
        // 执行回调
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    };
    try {
      // 执行器 创建promise executor会立即执行
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECT) {
      onRejected(this.reason);
    }
    // 若进了PENDING则说明函数不会立即执行 
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
module.exports = Promise;

```

以上这段加了两个步骤

+ 在then函数里对状态是PENDING的时候把then的回调函数放入成功回调队列和失败回调队列里
+ 在resolve或reject执行完成后把队列里的回调函数取出来依次执行

然鹅仔细观察之后我们发现，上面的代码遇到下面的使用方式就又gg了：

```javascript
let Promise = require('./promise')
let p = new Promise(((resolve, reject) =>{
    setTimeout(()=>{
        resolve('ok')
    })
}));
p.then(data=>{
    console.log('success', data)
    return 'ok1';
}, err=>{
    console.log('err', err)
}).then(data=>{
    console.log('success', data)
}, err=>{
    console.log('err', err)
});
// 正确的打印
// success ok
// success ok1
```

通过上面的代码，我们可以观察到：

+ Promise 得支持链式调用
+ 后面一个then可以接收前面一个then返回的内容作为data

修改上面的代码后，我们得到如下：

```javascript
...
// 要实现链式调用 then方法调用后应该返还一个新的promise
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 将then中的方法执行
        let x = onFulfilled(this.value);
        // 传入下一个then中
        resolve(x);
      }
      if (this.status === REJECT) {
        let x = onRejected(this.reason);
        resolve(x);
      }
      // 异步的时候
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolve(x);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolve(x);
        });
      }
    });
    return promise2;
  }
...
```

以上代码做了两个步骤：

+ then方法返回了一个新的Promise，把之前then方法的逻辑包裹在新的Promise里
+ 执行回调的返回值作为新Promise的data

but 杠精们总是无处不在的，如果返回结果是个Promise呢？

```javascript
let Promise = require('./promise')
let p = new Promise(((resolve, reject) =>{
    setTimeout(()=>{
        resolve('ok')
    })
}));
p.then(data=>{
    console.log('success', data)
    return new Promise((resolve, reject)=>{
        resolve('ok1')
    });
}, err=>{
    console.log('err', err)
    throw new Error('err1')
}).then(data=>{
    console.log('success', data)
}, err=>{
    console.log('err', err)
});
let Promise = require('./promise')
// 正确的打印
// success ok
// success ok1
// 用原来代码的打印
// success ok
// success Promise {
//   value: 'ok1',
//   reason: undefined,
//   status: 'FULFILLED',
//   onResolvedCallbacks: [],
//   onRejectedCallbacks: []
// }
```

所以我们要对返回Promise的情况做处理，如果返回的是一个Promise则我们应该返回该Promise的执行结果

```javascript
...
// 要实现链式调用 then方法调用后应该返还一个新的promise
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 此处加setTimeout是因为promise2不能在当前的上下文中取到 为了确保promise2能取到
        setTimeout(()=>{
          try {
            // 将then中的方法执行
            let x = onFulfilled(this.value);
            // 处理Promise的函数
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      }
      if (this.status === REJECT) {
        setTimeout(()=>{
          try {
            let x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      }
      // 异步的时候
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(()=>{
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(()=>{
            try {
              let x = onRejected(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        });
      }
    });
    return promise2;
  }
...
```

```javascript
// promise的处理函数
const resolvePromise = (promise2, x, resolve, reject)=>{
  // 处理x的类型 来决定调用resolve还是reject

  // 处理自己调用自己的情况 死循环
  if(promise2 === x){
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 可能是一个promise
  if((typeof x === 'object' && x!== null) || typeof x === 'function'){
    try {
      let then = x.then
      // 有then函数 确定是一个Promise
      if(typeof then === 'function'){
        then.call(x, (y)=>{
          resolve(y);
        }, (r)=>{
          reject(r)
        })
      }else{
        resolve(x)
      }
    } catch (error) {
      reject(error);
    }
  }else{
    // 不是promise
    resolve(x)
  }
}
```

但是又有同学要问了，如果y是一个promise呢？没错，如果y是promise那么我们应该返回执行这个promise的返回结果。所以我们修改resolve方法:

```javascript
constructor(executor) {
    ...
    let resolve = (value) => {
      // 如果value是一个Promise 那么返回promise的执行结果
      if(value instanceof Promise){
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        // 执行回调
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    ...
  }
```

至此，Promise已经基本实现了。接下来的内容都是一些优化或兼容性处理：

1.对then中没有传入onFulfilled和onRejected的处理

```javascript
then(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
  onRejected = typeof onRejected === 'function'?onRejected:err=>{throw err};
  ...
```

2.可能用户使用的并不是我们的Promise，因为Promise是只要成功就不允许失败，那我们执行的时候可以加个标识，让一个Promise的resolve或reject只执行一次

```javascript
const resolvePromise = (promise2, x, resolve, reject)=>{
 ...sg                                                                                                                                                                                                                                                                                                                                    xx) || typeof x === 'function'){
    let called = false; // 执行标识
    try {
      let then = x.then
      if(typeof then === 'function'){
        then.call(x, (y)=>{
          if(called) return
          called = true;
          resolvePromise(promise2,y, resolve, reject)
        }, (r)=>{
          if(called) return
          called = true;                                                              
        })
      }else{
        resolve(x)
      }
    } catch (error) {
      if(called) return
      called = true;
      reject(error);
    }
  }else{
    // 不是promise
    resolve(x)
  }
}
```



