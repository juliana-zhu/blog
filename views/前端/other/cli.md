---
title: cli
date: 2021-02-25
sidebar: 'auto'
categories:
 - 前端
tags:
 - cli
 - webpack
publish: false
---

# 自建一个cli

## 创建cli项目

### 初始化npm
```shell
  npm init -y
```
### 创建命令
进入项目根目录后创建`bin`文件夹，在`bin`文件夹下创建命令文件并写入内容
```javascript
#! /usr/bin/env node

console.log('super-cra');
```

### 链接命令
在`package.json`文件写入`bin`配置链接到刚才新建的文件
```diff
{
  "name": "super-cra",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "bin": "./bin/super-cra",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

在根目录执行link命令链接命令行指令到我们新建的文件
```shell
  npm link --force
```
此时我们在命令行里输入`super-cra`就可以看到输出

## 配置可执行的命令
### 安装`commander`
```shell
  npm install commander
```
### 配置可执行命令
```javascript
  commander
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if exit')
  .action((name, cmd)=>{
    require('../lib/create')(name, cmd)
  })
```
此时你运行`meow-cli -h`就可以看到熟悉的`help`界面
```text
  Usage: meow-cli <command> [option]

  Options:
    -V, --version                output the version number
    -h, --help                   display help for command

  Commands:
    create [options] <app-name>  create a new project
```
## 命令行交互
创建时如果文件夹存在则提示用户选择是否重写文件夹，如果有`--force`命令也直接重写，命令行提示选择插件这里用的是[inquirer](https://github.com/SBoudrias/Inquirer.js)
```javascript
module.exports = async function (projectName, options){
  const cwd = process.cwd(); //获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName); // 目标路径
  // 如果目标路径存在 且有force参数则删除
  if(fs.existsSync(targetDir)){
    if(options.force){
      await fs.remove(targetDir);
    }else{
      // 提示用户是否确定覆盖
      const {action} =await Inquirer.prompt([{
        name:'action',
        type:'list',
        message:'target directory already, please exists Pick an action.',
        choices:[
          {name:'Overwrite', value:'overwrite'},
          {name:'Cancel', value:false},
        ]
      }])
      if(!action){
        return;
      }else if(action === 'overwrite'){
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
        console.log(`\r\nremove ${targetDir} success!`);
      }
    }
  }
```
## 下载`git`模板
下载`git`模板可以使用[download-git-repo](https://www.npmjs.com/package/download-git-repo)
你可以使用`github`的[api](https://api.github.com/)获取要下载的`template`的`tag`让用户选择下载哪个版本的模板。
```javascript
  async download(repo, tag){
    let requestUrl = `meow-cli/${repo}${tag?'#'+tag:''}`;
    try{
      await wrapLoading(this.downloadGitRepo, 'downloading template...', requestUrl, path.resolve(process.cwd(),this.target));
    }catch(e){
      console.error(e);
    }
    return this.target;
  }

```
## 根据用户选择动态生成内容
这里我使用`ejs`替换`package.json`里的`packageName`
```javascript
  processTemplate(){
    const packagePath = path.join(this.target,'package.json');
    let templateData = fs.readFileSync(packagePath,{encoding: 'utf-8'});
    templateData = ejs.render(templateData, {packageName:this.name});
    fs.writeFileSync(packagePath, templateData);
  }
```

## gitHub链接 

[meow-cli](https://github.com/Juliazlj/meow-cli)