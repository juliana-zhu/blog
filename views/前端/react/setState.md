---
title: setState到底是同步还是异步的？
date: 2020-11-20
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
 - 面试题
publish: false
---

先看一个用遍了的栗子
```javascript
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }
  render() {
    return null;
  }
};
```
输出结果是 **0 0 2 3**

这里你可能想问如下几个问题：
+ 为什么前面两次输出都是0？
+ 为什么第三次输出的不是1而是2？
+ 为什么第四次输出的是3而不是2？
+ setTimeout为什么能让异步的setState变成同步的？

我们先看[官网](https://zh-hans.reactjs.org/docs/react-component.html#setstate) 的描述
>setState() 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式

因为性能原因，setState 并不会立即更新视图，而是把更改放入队列，最后执行了类似于如下代码的操作：
````javascript
Object.assign(
  previousState,
  {count: state.count + 1},
  {count: state.count + 1},
  ...
)
````
再看[大神的解析](https://zhuanlan.zhihu.com/p/39512941)
+ setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
+ setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
+ setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

钩子函数中的 setState 无法立马拿到更新后的值，所以前两次都是输出0，当执行到setTimeout里的时候，前面两个state的值已经被更新，由于 setState 批量更新的策略， this.state.val 只对最后一次的生效，为1，而在 setTimeout 中setState 是可以同步拿到更新结果，所以 setTimeout 中的两次输出2，3，最终结果就为0, 0, 2, 3。
