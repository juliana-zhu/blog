---
title: React-router
date: 2020-04-20
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
 - ReactRouter
publish: true
---
# React-router

## 原理

### HashRouter

+ 利用hash实现路由切换
+ `hashchange`事件

### BrowserRouter

+ 利用h5的api实现路由切换
+ `history`
  + `history`对象提供操作浏览器会话历史的接口
  + `historylength`属性声明了浏览器历史列表中的元素个数
  + `history.pushState()`和`history.replaceState()`方法分别可以添加和修改历史记录条目，通常与`window.onpopstate`配合使用
  + `popstate`会在浏览器点击前进、后退、调用`history.back()`，`history.forward()`，`history.go()`时触发
+ pushState
  + `pushState`会往`history`写入一个对象，使得`historylength+1`
