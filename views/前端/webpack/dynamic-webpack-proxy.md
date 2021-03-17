---
title: 如何配置webpack的动态代理
date: 2021-03-17
sidebar: 'auto'
categories:
 - 前端
tags:
 - Webpack
publish: true
---

# 如何配置webpack的动态代理

我们都知道`webpack`的`devServer`可以配置`proxy`代理请求到某个服务器，以便开发环境测试。但是每次更改`proxy`都需要重启项目，有没有什么方法可以不重启动态修改`proxy`呢？

在项目里我是这样用的，如下代码当请求路径以`/app1`开头就代理到`3001`端口，当请求路径以`/app2`开头就代理到`3002`端口。可以通过 http://localhost:9000/changeProxyUrl?key=xxx&url=*** 修改或添加代理内容。

```javascript
const proxyMap = {
  "^/app1": "http://localhost:3001",
  "^/app2": "http://localhost:3002",
};

devServer: {
  port: 9000,
  open: false,
  before: function (app, server, compiler) {
    app.get("/changeProxyUrl", function (req, res) {
      if (!req.query.key || !req.query.url) {
        res.json({ message: "key and url is not allow empty." });
      } else {
        proxyMap[req.query.key] = req.query.url;
        res.json({ message: "success" });
      }
    });
  },
  proxy: {
    context: ["/"],
    target: "/",
    pathRewrite: { "^/app1": "", "^/app2": "" },
    router(req) {
      for (const [match, proxyUrl] of Object.entries(proxyMap)) {
        if (new RegExp(match).test(req.url)) {
          return proxyUrl;
        }
      }
      return "/";
    },
  },
},
```