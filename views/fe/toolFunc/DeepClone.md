---
title: 如何实现一个深拷贝
date: 2019-09-10
sidebar: 'auto'
categories:
 - 前端
tags:
 - 工具方法
 - 原理
publish: true
---
# 如何实现一个深拷贝

+ 对象和数组类型需要递归拷贝

+ `in` 会遍历自身属性及其原型链上的属性，前提是属性的`enumerable`为`true`

+ `hasOwnProperty` 会忽略掉那些从原型链上继承到的属性

+ 用`WeakMap`存储之前遍历过的值

  + 可以防止循环引用导致的死循环问题

  + 此处用`WeakMap`是因为`WeakMap`是弱引用，`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于*防止内存泄漏*。

  + 若使用`Map`会有内存泄漏风险，`Map`是强引用

    + ```javascript
      class My{
          constructor(){
              this.a = 1;
          }
      }
      let obj = new My();
      // 弱引用 key只能放对象
      let newMap  = new Map([[obj,2]]); // My不会被垃圾回收回收
      let newMap  = new WeakMap([[obj,2]]); // 可以回收
      obj = null;
      // v8 垃圾回收 标记
      ```

      

```javascript
const deepClone = (value, hash = new WeakMap) => {
  if (value == null) return value // 排除掉null 和undefine 的情况
  if (typeof value !== 'object') return value // 这里包含了函数类型
  if (value instanceof RegExp) return new RegExp(value)
  if (value instanceof Date) return new Date(value)
  // .....其他类型判断
  // 拷贝的人可能是一个对象 或者是一个数组 (循环)  for in 
  let instance = new value.constructor // 根据当前属性构造一个新的实例
  if (hash.has(value)) { // 先去hash中查看一下是否存在过 ，如果存在就把以前拷贝的返回去 
    return hash.get(value) // 返回已经拷贝的结果
  }
  hash.set(value, instance)// 没放过就放进去
  // 用一个对象来记忆
  for (let key in value) { // in 会遍历自身属性及其原型链上的属性
    if (value.hasOwnProperty(key)) { // hasOwnProperty 会忽略掉那些从原型链上继承到的属性
      // 将hash 继续向下传递 保证这次拷贝能拿到以前拷贝的结果
      instance[key] = deepClone(value[key], hash) // 产生的就是一个新的拷贝后的结果
    }
  }
  return instance
}
```

