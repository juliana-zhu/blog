# Promise.all 和Promise.race



```javascript

const isPromise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}
// 全部完成才算完成 如果有一个失败 就失败
// Promise.all 是按照顺序执行的
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [] // 存放最终结果的
    let i = 0
    let processData = (index, data) => {
      arr[index] = data // 将数据放到数组中，成功的数量和传入的数量相等的时候 将结果抛出去即可
      if (++i === promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let current = promises[i] // 获取当前的每一项
      if (isPromise(current)) { // 如果是promise 。。..
        current.then(data => {
          processData(i, data)
        }, reject)
      } else {
        processData(i, current)
      }
    }
  })
}
// race 有一个成功就成功 有一个失败就失败
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      if (isPromise(promises[i])) {
        promises[i].then(resolve, reject) // 只要一个成功就成功
      } else {
        resolve(promises[i])
      }
    }
  })
}
```

### 如何实现`Promise.try`

```javascript
function fn(){
    // 可能函数中抛出了 同步错误 要通过try-catch 捕获异常
    // throw new Error('err');
   return new Promise((resolve,reject)=>{
       setTimeout(() => {
        reject('xxx');
       }, 3000);
   })
}
Promise.try = function(callback){
    return new Promise((resolve,reject)=>{
        // Promise.resolve 只能返回一个成功的promise
        return Promise.resolve(callback()).then(resolve,reject);
    })
}
Promise.try(fn).then((data)=>{
    console.log(data,'---');
},err=>{
    console.log('err:'+err);
});

```

