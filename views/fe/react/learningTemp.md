---
title: React
date: 2021-1-15
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
publish: false
---

JSON.stringify(obj, replacer, space)
replacer 替换函数

render(vdom, container)

## 如何把虚拟dom变成真实dom render reac-dom
- 先判断是不是string或number createTextNode
- 判断儿子是对象 则递归render
- 判断儿子是数组 遍历调用render
- 使用虚拟dom的属性更新刚创建出来的真实dom的属性
- 如果类型是 function 说明是 自定义函数组件
- 处理属性
    + 普通属性
    + 事件 on开头的
- 批量更新
    + updater
    + isBatchingUpdate
- 合成事件
    + 为什么要做事件委托 
        + 做兼容处理
        + batchingUpdate
    + 都代理到document
    + 自己模拟的事件冒泡
    
