---
title: 什么是monorepo？lerna又是什么？
date: 2021-03-07
sidebar: 'auto'
categories:
 - 前端
tags:
 - monorepo
---

# 什么是monorepo？lerna又是什么？

## 描述
+ `monorepo` 是管理项目代码的一个方式，指在一个项目仓库(repo)中管理多个模块/包(package)
+ `monorepo` 最主要的好处是统一的工作流和代码共享
+ `lerna`是一个管理多个 npm 模块的工具,优化维护多包的工作流，解决多个包互相依赖，且发布需要手动维护多个包的问题
  
![](./img/diff-monorepo.png)

## 安装lerna
```shell
  npm install lerna -g
```
## 创建lerna项目
```shell
  lerna init
```
## 开启 yarn workspace
+ yarn workspace允许我们使用 monorepo 的形式来管理项目
+ 在安装 node_modules 的时候它不会安装到每个子项目的 node_modules 里面，而是直接安装到根目录下面，这样每个子项目都可以读取到根目录的 node_modules
+ 整个项目只有根目录下面会有一份 yarn.lock 文件。子项目也会被 link 到 node_modules 里面，这样就允许我们就可以直接用 import 导入对应的项目
+ yarn.lock文件是自动生成的,也完全Yarn来处理.yarn.lock锁定你安装的每个依赖项的版本，这可以确保你不会意外获得不良依赖
### 开启workspace
```diff
  "name": "root",
  "private": true, // 私有的,用来管理整个项目,不会被发布到npm
+  "workspaces": [
+    "packages/*"
+  ],
  "devDependencies": {
    "lerna": "^4.0.0"
  }
}
```
### 创建子项目
```shell
 lerna create create-react-app
```
### 命令列表
|作用	|命令|
|  ----  | ----  |
|查看工作空间信息|	yarn workspaces info |
|给根空间添加依赖|	yarn add chalk cross-spawn fs-extra --ignore-workspace-root-check|
|给某个项目添加依赖	|yarn workspace [子项目名] add commander |
|删除所有的 node_modules|	lerna clean 等于 yarn workspaces run clean |
|安装和link	|yarn install 等于 lerna bootstrap  |--npm-client yarn --use-workspaces |
|重新获取所有的 |node_modules	yarn install --force |
|查看缓存目录	|yarn cache dir |
|清除本地缓存	|yarn cache clean |

有些用`lerna`有些用`yarn`, `yarn` 侧重于包的管理、处理依赖、处理软链；`lerna`重点在于多个项目管理和发布.