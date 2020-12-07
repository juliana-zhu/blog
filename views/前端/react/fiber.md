---
title: React Fiber
date: 2020-11-18
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
 - Fiber
publish: false
---
::: tip

+ 为什么要有fiber？
+ fiber是什么？
+ fiber的运作模式

:::
<!-- more -->
## 为什么要有fiber？
在React16之前有如下问题：
+ React 会递归比对VirtualDOM树，找出需要变动的节点，然后同步更新它们。这个过程 React 称为Reconcilation(协调)
+ 在协调期间，React 会一直占用着浏览器资源，假如一个组件更新需要1毫秒，有300个组件需要更新，就需要300毫秒，那么在这300毫秒内用户点击了按钮或者敲了键盘都不会有任何响应，因为浏览器的主线程在做更新的操作，界面就卡顿了。

众所周知JavaScript是单线程的，每个同步任务不能耗时太长，否则就会出现浏览器未响应的状态。基于以上的问题，react团队用了两年的时间研究出了fiber，有了fiber之后，
我们可以通过某些调度策略合理分配CPU资源，从而提高用户的响应速度；让Reconcilation过程变成可被中断。 适时地让出CPU执行权，让浏览器及时地响应用户的交互
## fiber做了什么？
fiber把一个耗时很长的任务分成很多个执行单元，虽然总时间很长，但是每一个单元运行的时间很短，在每一个单元执行完之后，都给其他任务一个机会去执行。

每执行完一段更新过程，就把控制权交还给React负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。
## fiber影响了什么？

每次渲染有两个阶段：Reconciliation(协调\render阶段)和Commit(提交阶段)
+ 协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为副作用(Effect)
+ 提交阶段: 将上一个阶段计算出来的需要处理的副作用(Effects)一次性执行了。这个阶段必须同步执行，不能被打断

以render函数为界，第一阶段可能会调用下面这些生命周期函数：
+ componentWillMount
+ componentWillReceiveProps
+ shouldComponentUpdate
+ componentWillUpdate

第二阶段调用下面的这些生命周期函数：
+ componentDidMount
+ componentDidUpdate
+ componentWillUnmount

如果有一个组件需要更新，但是这个组件更新到第一阶段的一半的时候发现有一个更高优先级的任务需要优先处理，那么这个组件的更新过程就会被搁置，等待任务执行完后有机会再重头再执行这次更新任务。所以重头执行这次更新就会导致第一阶段的生命周期函数被重复执行。所以React15之后的生命周期做了变化。

## 什么是fiber
+ Fiber是一个执行单元
    Fiber是一个执行单元,每次执行完一个执行单元, React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去
+ Fiber是一种数据结构
    React目前的做法是使用链表, 每个 VirtualDOM 节点内部表示为一个Fiber
