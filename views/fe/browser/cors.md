---
title: 跨域的9种方式
date: 2021-01-23
sidebar: 'auto'
categories:
 - 前端
tags:
 - 浏览器
publish: true
---
# 跨域的9种方式

## 同源策略
协议 域名 端口 同域

## 为什么浏览器不支持跨域
+ cookie localStorage 跟着域名走的 如果支持跨域会不安全
+ DOM元素也有同源策略
+ ajax也不支持跨域

## 为什么要实现跨域
+ 前后端不是同域的

## 实现跨域
+ jsonp
    - 只能发送get
    - 不安全 xss攻击
```javascript
function jsonp({url, params, cb}){
    return new Promise((resolve, reject)=>{
        window[cb] = function (data){
            resolve(data);
            document.body.removeChild(script)
        }       
        params = {...params, cb};
        let arrs = [];
        for(let key in params){
            arrs.push(`${key}=${params[key]}`)
        }   
        let script = document.createElement('script');
        script.src = `${url}?${arrs.join('&')}`;
        document.body.appendChild(script);
    })
}
```
+ cors
    - 后端设置`Access-Control-Allow-Origin` 允许哪个源访问
```javascript
setHeader('Access-Control-Allow-Origin', origin)
```
+ postMessage
```javascript
document.getElementById('id').contentWindow.postMessage('hello')
window.onmessage = function (ev) { 
    console.log(ev.data);
    ev.source.send('word')
}
```
+ document.domain
    - 必须是一级域名和二级域名之间的 www.baidu.com musin.baidu.com
```javascript
document.domain = 'baidu.com'
```
+ window.name
    - a和b是同域的
    - c是独立的
    - a先创建一个iframe路径改为c
    - c加载成功之后把数据放在window.name里 返回执行onload方法
    - onload方法里把iframe的路径改为b的
    - 此时因为ab是同域的，可以直接获取b的window.name
+ location.hash
    - a 想访问 c
    - a给c传一个hash值
    - c收到hash值后 把hash值传递给b 
    - b将结果放到a的hash中
+ nginx
    - 反向代理
+ websocket
```javascript
    let socket = new WebSocket('ws://localhost:3000');
    socket.onopen = function (ev) { 
        socket.send('hello')
    }
    socket.onmessage = function (data) { 
        console.log(data)
    }
```
```javascript
    let WebSocket = require('ws');
    let wss = new WebSocket.Server({port:3000});
    wss.on('connection', function (ws) { 
        ws.on('message', function (data) { 
            console.log(data)
            ws.send('word')
        })
    })
```
