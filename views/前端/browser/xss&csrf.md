---
title: xss&csrf
date: 2021-01-23
sidebar: 'auto'
categories:
 - 前端
tags:
 - 浏览器
publish: true
---
# xss&csrf
## xss
### 反射型
+ 路径上带script注入代码 可以获取cookie等敏感信息
    ```
        http://baidu.com?q=<script>alert("你完蛋了")</script>
    ```
+ 一般情况下不会让前端可以获取cookie httpOnly并不是解决xss的方法
+ 之所以叫它反射型, 是因为恶意脚本是通过作为网络请求的参数，经过服务器，然后再反射到HTML文档中，执行解析。和存储型不一样的是，服务器并不会存储这些恶意脚本。
#### 解决方案
- 服务器可以把参数 `encodeURIComponent` 转义
### 不基于后端 DOM-Based
+ 文档型的 XSS 攻击并不会经过服务端，而是作为中间人的角色，在数据传输过程劫持到网络数据包，然后修改里面的 html 文档
+ wifi路由和本地恶意软件
#### 解决方案
- 前端使用 `encodeURI` 把可跨越的`dom`的`src`包裹
### xss存储型
+ 恶意脚本被存储在服务器上
    - 客户端传递给服务端时 需要校验先过滤一下
    - 服务端再做一次过滤
    - 直接在输出的时候过滤
```javascript
function encodeHtml(src){
    return src.replace(/&/g, '&amp;').
        replace(/"/g, '&quot;').
        replace(/'/g, '&apos;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;')
}
```
    
## csrf
### 钓鱼网站
+ 只要原网站用户登录过 有cookie 让用户访问钓鱼网站 钓鱼网站便可以转发请求 此时浏览器会自动带上cookie 使用户钱财受到损失
    - 利用cookie的SameSite属性
    - 添加验证码
    - 判断来源 Referer 不靠谱 可以通过node自己发请求伪造
    - token

