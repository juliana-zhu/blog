---
title: Generator 和 co
date: 2021-04-03
sidebar: 'auto'
categories:
 - 前端
tags:
 - ES6
publish: true
---

# Generator 和 co 库

```javascript
function* ge(){
  yield new Promise((resolve)=>{
    setTimeout(()=>resolve(11), 1000)
  });
  console.log('11');
  yield new Promise((resolve)=>{
    setTimeout(()=>resolve(22), 1000)
  });;
  console.log('22');
  yield 33;
  console.log('33');
  return;
}

const isPromise = (fn)=>{
  if(typeof fn ==='object' && fn !== null || (typeof fn ==='function')){
    if(fn.then && typeof fn.then ==='function'){
      return true
    }
  }
  return false
}
/**
 * 连续执行
 * 返回promise
 * @param geFn 
 */
const co = (fn)=>{
  const g = fn();
  const next = (data)=>{
    var result = g.next(data);
    const val = isPromise(result.value)?result.value:Promise.resolve(result.value)
    if (result.done) return val;
    val.then(function(d){
      next(d);
    });
  }
  next();
}

co(ge)

```


