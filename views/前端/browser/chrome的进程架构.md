---
title: chrome的进程架构
date: 2019-12-08
sidebar: 'auto'
categories:
 - 前端
tags:
 - 浏览器
publish: true
---

# chrome的进程架构

## chrome的最新进程架构图

![chrome进程架构图](img/chrome_process_framework.png)

从图中可以看出，最新的 Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。

+ **浏览器进程。**主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
+ **渲染进程。**核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式（限制应用程序对系统资源的访问的运行环境）下。
+ <strong>GPU 进程</strong>。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。
+ <strong>网络进程</strong>。主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
+ <strong>插件进程</strong>。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

## 未来面向服务的架构

​	因为多进程的架构会有**更高的资源占用**和**更复杂的体系架构**等问题，chrome团队提出了面向服务的架构，今后，chrome会朝着面向服务的架构发展。

![面向服务的架构](img/face_to_service_framework.png)

在资源受限的设备上，chrome将会把很多服务整合到一个进程中，从而节省内存占用

![受限设备的服务架构](img/limit_divice_chrome_framework.png)
