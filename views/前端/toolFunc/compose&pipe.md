---
title:  compose & pipe
date: 2019-07-05
sidebar: 'auto'
categories:
 - 前端
tags:
 - 工具方法
 - 原理
publish: true
---
# compose & pipe

## compose

组合函数 a(b(c(d)))

```javascript
function add(x) {
    return x + 1
}
function multiply(x) {
    return x * 10
}
// 接收两个参数，先执行右边的函数
function compose() {
    const args = [...arguments]
    return function(x) {
        if(args.length < 1) return x
        return args.reduceRight((a, b) =>  b(a), x)
    }
}
const calculate = compose(add, multiply)
console.log(calculate(2)) // 21
```

## pipe

管道 a->b->c->d

```javascript
function add(x) {
    return x + 1
}
function multiply(x) {
    return x * 10
}
// 接收两个参数，先执行右边的函数
function compose() {
    const args = [...arguments]
    return function(x) {
        if(args.length < 1) return x
        return args.reduce((a, b) =>  b(a), x)
    }
}
const calculate = compose(add, multiply)
console.log(calculate(2)) // 30

```



