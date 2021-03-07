---
title: 防抖和节流
date: 2019-09-01
sidebar: 'auto'
categories:
 - 前端
tags:
 - 工具方法
 - 原理
publish: true
---
# 防抖和节流

## 防抖

```javascript
function debounce (fn, delay){
    let timer = null;
    return function (...args){
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this, args)
        }, delay)
    }
}
```

## 节流

```javascript
function throttle (fn, delay){
    let previous = +new Date();
    return function (...args){
        if(Date.now() - previous >=delay){
            previous = +new Date();
            fn.apply(this,args);
        }
    }
}
```

