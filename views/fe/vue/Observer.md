---
title: Vue的双向数据绑定原理
date: 2020-02-10
sidebar: 'auto'
categories:
 - 前端
tags:
 - Vue
 - 原理
publish: true
---
# Vue的双向数据绑定原理

# 实现代码

```javascript
let arrayProto = Array.prototype; // 数组原型上的方法
let proto = Object.create(arrayProto);
['push','unshift','splice','reverse','sort','shift','pop'].forEach(method=>{
    proto[method] = function (...args) { // 这个数组应该也被监控 注意这里不能用箭头函数 否则this会错误
        // Array.prototype.push.call([1,2,3],4,5,6);
        let inserted; // 默认没有插入新的数据
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // 数组的splice 只有传递三个参数 才有追加效果
                inserted = args.slice(2);
            default:
                break;
        }
        console.log('视图更新');
        ArrayObserver(inserted)
        arrayProto[method].call(this, ...args)
    }
});
function ArrayObserver(obj) {
    for (let i = 0; i < obj.length; i++) {
        let item = obj[i];
        // 如果是普通值 就不监控了
        observer(item); // 如果是对象会被 defineReactive
    }
}
function observer(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        //  上面处理的是数组格式 push shift splice (如果调用这三个方法)应该把这个值判断一下是否是对象
        Object.setPrototypeOf(obj,proto); // 实现一个对数组的方法进行重写
        ArrayObserver(obj)
    } else {
        // 下面的是处理对象的
        for (let key in obj) {
            // 默认只循环第一层
            defineReactive(obj, key, obj[key]);
        }
    }
}

function defineReactive(obj, key, value) {
    observer(value); // 递归创建 响应式数据，性能不好
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(newValue) { // 给某个key设置值的时候 可能也是一个对象
            if (value !== newValue) {
                observer(newValue);
                value = newValue
                console.log('视图更新');
            }
        }
    })
}
let data = {
    d: [1, 2, 3,{name:'zf'}]
};
observer(data);
data.d = [1,2,3]
```

# 总结

+ 原理

  + 初始化时**递归**监听对象里每个属性的get和set
  + 但是由于监听不到数组长度的变化，需要针对数组改变长度的一些方法做劫持，若是插入的方法，例如push，unshift等则需要把插入的数据进行监听

+ 注意

  + 数组里的常量属性不能进行监听，所以可以把每个数组项变成对象

    

    ```javascript
    data:{
    	list: [{value:1}, {value:2}]
    }
    ```
