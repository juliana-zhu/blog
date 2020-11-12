---
title: 柯里化和反柯里化
date: 2019-08-10
sidebar: 'auto'
categories:
 - 前端
tags:
 - 工具方法
 - 原理
publish: true
---
# 柯里化和反柯里化

## curry

```javascript
// 观察上诉柯里化调用发现，它其实就是把参数都搜集起来了，每次调用搜集几个参数
// 当搜集的参数足够时执行主方法
const curry = (fn) => {
    // 先记录主方法原始的参数个数，fn.length就是函数接收的参数个数
    const parmasLength = fn.length;
    return executeFun = (...args) => {
        console.log(args.length)
        // 如果接收参数够了，执行主方法
        if(args.length >= parmasLength) {
            return fn(...args);
        } else {
            // 如果参数不够，继续接收参数
            return (...args2) => {
                // 注意executeFun接收的参数是平铺的，需要将数组解构
                return executeFun(...args.concat(args2));
            }
        }
    }
}

const curriedFun = curry((a, b, c) => [a, b, c])
// 现在看下结果

console.log(curriedFun(1)(2)(3)) // [1, 2, 3]
console.log(curriedFun(1, 2)(3)) // [1, 2, 3]
console.log(curriedFun(1, 2, 3)) // [1, 2, 3]

```

## uncurry

```javascript
// 反柯里化
// 1)
const uncurrying = fn =>(...args)=>{
  return fn.call(...args)
}
let checkType = uncurrying(Object.prototype.toString);
let type = checkType(1);
// 2)-----------
Function.prototype.uncurrying = function(){
  return (...args)=>{
      return this.call(...args);
  }
}
let checkType = Object.prototype.toString.uncurrying();

// 展开方法
Array.prototype.myFlat = function(n=1){
    if(n == 0) { return this; }
    return this.reduce((a,b)=>{
        if(Array.isArray(b)){ // 只要是是数组就递归展开即可
            return a.concat(b.myFlat(--n));
        }else{
            return [...a,b];
        }
    },[]);
}
console.log([1,[1,2,[3,4,[5]]],3].myFlat(Infinity));

// reduce方法
Array.prototype.reduce = function(callback,prev){
  for(let i = 0; i < this.length;i++){
      if(typeof prev === 'undefined'){
          prev = callback(this[i],this[i+1],i+1,this);
          i++;
      }else{
          prev = callback(prev,this[i],i,this);
      }
  }
  return prev;
}
```

