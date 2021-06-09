---
title: Promise其他知识点
date: 2020-01-15
sidebar: 'auto'
categories:
 - 前端
tags:
 - Promise
publish: true
---
# Promise其他知识点

- promise 中的链式调用如何中断?*（只中断链式调用，后续的then不执行）*

  - ```javascript
    let p = new Promise((resolve,reject)=>{
        resolve();
    })
    // 1).中断promise链 就是返回一个等待的promise
    let p1 = p.then(()=>{
        console.log('ok');
        return new Promise(()=>{})
    }).then(()=>{
        console.log(1);
    })
    ```
  
- 如何中断promise？*（中断正在执行的Promise）*


  - ```javascript
    // 主要的原理是通过Promise.race增加一个新的promise并暴露出reject方法给abort，外部在适当的时候调用abort实现reject，因为Promise.race就是一个失败全部失败的。但是该中断只是做了抛弃处理而已，程序依然执行。
    function wrap(p1) {
      let fail = null
      let p2 = new Promise((resolve, reject) => {
        fail = reject // 先将p2失败的方法暴露出来
      })
      let p = Promise.race([p2, p1]) // race方法返回的也是一个promise
      p.abort = fail
      return p
    }
    
    let p = wrap(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok')
      }, 3000)
    }))
    p.abort('error')
    p.then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    ```
    
- Promise.finally实现原理?  


  - ```javascript
    Promise.prototype.finally = function(callback){
        // callback 直接放到失败里 会导致无法继承上一次的失败
        // return this.then(callback,callback);
        return this.then((val)=>{
            // 等待finally中的函数执行完毕 继续执行 finally函数可能返还一个promise 用Promise.resolve等待返回的promise执行完
            return Promise.resolve(callback()).then(()=>val);
            //return val; // 如果上一个then是成功就将这个成功向下传递
        },(err)=>{
            return Promise.resolve(callback()).then(()=>{throw err});
            //throw err; // 如果上一个then是失败就将这个失败继续向下抛
        })
    }
    Promise.reject().finally(()=>{
        console.log(1);
        return new Promise((resovle,reject)=>{
            setTimeout(() => {
                resovle();
            }, 1000);
        })
    }).catch(e=>{
        console.log(e);
    })
    ```

    

- promise有哪些缺点？     
	
	- 优点 可以解决异步并发问题`Promise.all` 链式调用     
  - 缺点 还是基于回调 `promise`无法终止 `new Promise` 只能说抛弃这次的结果而已 fetch 无法中断的 xhr.abort(）


