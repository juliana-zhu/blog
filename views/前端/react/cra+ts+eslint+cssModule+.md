---
title: cra+TS+eslint+cssModule最佳实践
date: 2020-07-15
sidebar: 'auto'
categories:
 - 前端
tags:
 - React
 - TypeScript
 - Eslint
 - CssModule
sticky: 1
---

::: tip
你是否还在为了搭建一个企业级的react框架而发愁，是否有如下问题：
+ eslint要怎么配置才能兼容ts？
+ react项目要怎么样才能实现样式隔离？
+ 怎么才能让团队成员统一提交代码的格式？
:::
<!-- more -->

# cra+TS+eslint+cssModule最佳实践

如果你有以上问题，那么这就是你需要的实践方案！我们将一步步实现。什么？太长了不想看？那么你可以直接使用cra模板来创建项目，开箱即用~

```sh
npx create-react-app my-app --template quickdva
```



## 创建cra项目

这里我们使用typescript模板

```sh
npx create-react-app my-app --template typescript
```

## 使用rewrited

因为我们之后要修改webpack的配置，所以我们需要重写官方的默认配置，在这里我使用的是`react-app-rewired`，你也可以使用`eject`命令，改命令会把webpack的配置暴露出来你可以随意修改。

```shell
yarn add react-app-rewired -D
```

```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

在根目录下新建一个`config-overrides.js`文件，我们暂时不写内容

```
module.exports = {

}
```

## 引入eslint

在根目录下创建`.eslintrc.js`文件

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['react-app','@typescript-eslint'],
  extends: [
    'plugin:react-app/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0
  }
};

```

在根目录创建`.env`文件，设置EXTEND_ESLINT=true来[扩展基本ESLint配置](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config)

```
EXTEND_ESLINT=true
```

要使`eslintrc`文件生效，你还需要删除`package.json`文件里的`eslintConfig`

```diff
-  "eslintConfig": {
-    "extends": "react-app"
-  },
```

此时再次启动项目会发现报如下错误，说明已经使用了我们自定义的eslint配置

```text
Failed to load plugin 'react-app' declared in '.eslintrc.js': Cannot find module 'eslint-plugin-react-app'
```

安装所需依赖

```shell
yarn add eslint-plugin-react-app typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D 
```

然鹅我发现事情并不那么简单，启动后发现eslint报了个警告。我们在rules里不是配置了`'@typescript-eslint/explicit-function-return-type': 0`么？我明明照着官网配置的~

```

./src/App.tsx
  Line 5:1:  Missing return type on function  @typescript-eslint/explicit-function-return-type

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.

```

一番搜索，发现是`create-react-app`的[issue](https://github.com/facebook/create-react-app/issues/9007)，issue的解决方案是修改`node_modules/react-scripts/config/webpack.config.js`文件下的`cache`改为`false`，试过之后的确可行，但是我不可能通知团队成员修改源码吧。一定还有其他的方案。

```diff
use: [
            {
              options: {
-                cache: true,
+                cache: false,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                // @remove-on-eject-begin
                ignore: isExtendingEslintConfig,
                baseConfig: isExtendingEslintConfig
                  ? undefined
                  : {
                      extends: [require.resolve('eslint-config-react-app')],
                    },
                useEslintrc: isExtendingEslintConfig,
                // @remove-on-eject-end
              },
```

想了一下，既然使用了`react-app-rewired`我们就能覆盖`webpack`的配置。于是第二种解决方案就是覆盖`webpack`的默认配置，我们使用[`customize-cra`](https://github.com/arackaf/customize-cra)来重写配置，暴力破解：

```shell
yarn add customize-cra -D
```

```javascript
/*config-overrides.js*/

const {
    override,
} = require('customize-cra');
const eslintConfig = require('./.eslintrc.js');

const useEslintConfig = configRules => config => {
  const updatedRules = config.module.rules.map(rule => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    if (rule.use && rule.use.some(use => use.options && use.options.useEslintrc !== void 0)) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules },
      };
      ruleUse.options = newOptions;
      return rule;

      // Rule not using eslint. Do not modify.
    } else {
      return rule;
    }
  });

  config.module.rules = updatedRules;
  return config;
};
module.exports = {
    webpack: override(
        useEslintConfig(eslintConfig),
    ),
}

```

这时候我们重启发现一切都是那么顺利☀️

## 加入prittier

团队协作少不了的代码格式化利器

在根目录加入`.prettierrc`文件

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "auto",
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    },
    {
      "files": ".less",
      "options": {
        "parser": "css"
      }
    }
  ]
}
```

让`eslint`能校验到`prettier`

安装依赖

```sh
yarn add eslint-config-prettier eslint-plugin-prettier prettier -D
```

修改`.eslintrc.js`添加`prettier`的配置

```diff
  plugins: [
    'react-app',
    '@typescript-eslint',
+   'prettier'
  ],
  extends: [
    'plugin:react-app/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
+    'prettier',
+    'prettier/@typescript-eslint',
+		 'prettier/react',
+    'plugin:prettier/recommended'
  ],
```

修改`App.tsx`文件后重启我们可以看到`prettier`错误则代表配置成功了

## 加入[editorConfig](http://editorconfig.org)

加入editorConfig用于维护跨多个编辑器和IDE从事同一项目的多个团队成员的编码风格一致。

根目录加入`.editorconfig`文件：

```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

```

## 加入webpackAlias

```diff
/*config-overrides.js*/

const {
    override,
+    addWebpackAlias,
} = require('customize-cra');
+ const path = require('path');
...
module.exports = {
    webpack: override(
        useEslintConfig(),
+        addWebpackAlias({
+          ['@']: path.resolve(__dirname, 'src'),
+          ['assets']: path.resolve(__dirname, 'src/assets'),
+          ['components']: path.resolve(__dirname, 'src/components'),
+        })
    ),
}
```

## 关于样式

### 引入全局样式文件

样式我使用`less`作为预处理语言，我们之前如果想要在每个less文件里使用一些全局的常量，只能把文件通过`@import`的方式引入。现在我们可以通过`customize-cra`的`addLessLoader`来实现。

```shell
yarn add less-loader -D
```

```diff
/*config-overrides.js*/

const {
    override,
+    addLessLoader
} = require('customize-cra');
...
module.exports = {
    webpack: override(
        useEslintConfig(),
+        addLessLoader({
+        lessOptions: {
+           javascriptEnabled: true,
+           modifyVars: {
+             hack: `true; @import "~@/assets/styles/mixin.less";`,
+           },
+         },
+        }),
    ),
}


```

### 加入`cssModule`支持

```diff
/*config-overrides.js*/
module.exports = {
    webpack: override(
        useEslintConfig(),
        addLessLoader({
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import "~@/assets/styles/mixin.less";`,
          },
+         localIdentName: '[local]_[hash:base64:5]',
+      		cssModules: true,
        }),
    ),
}
```

加入之后我们在`App.tsx`的同级新建一个文件`App.module.less`，注意的是，`module`文件必须要以`module.less`结尾

```less
.app{
  background: red;
}
```

修改App.tsx文件

```tsx
import React from 'react';
import styles from './App.module.less';

function App() {
  return <div className={styles.app}></div>;
}

export default App;

```
然后我们就可以看到样式名后面加了一个hash值，说明cssModule生效了

![](./img/cra-1.jpg)

### 加入stylelint校验

对于样式的格式，我们也可以使用stylelint来校验

在根目录添加`.stylelintrc.json`文件

```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
  }
}
```

安装依赖

```shell
yarn add -D stylelint-config-standard
```

修改config-overrides.js文件加入StyleLintPlugin

```diff
/*config-overrides.js*/
const { 
	override, 
	addWebpackAlias, 
	addLessLoader, 
+	addWebpackPlugin 
} = require('customize-cra');
+ const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    webpack: override(
        useEslintConfig(),
+        addWebpackPlugin(
+          new StyleLintPlugin({
+            context: 'src',
+            configFile: path.resolve(__dirname, './.stylelintrc.json'),
+            files: '**/*.less',
+            failOnError: false,
+            quiet: true,
+            fix: true, // 修复不规范的样式代码
+          })
+        )
    ),
}
```

重启之后我们发现已经自动把less文件里的错误修复了，说明配置成功~

### 加入postcss

在这里，我们使用了`customize-cra`的`addPostcssPlugins，修改`config-overrides`文件，加入如下代码：

```diff
/*config-overrides.js*/
const { 
	override, 
	addWebpackAlias, 
	addLessLoader, 
+	addPostcssPlugins, 
} = require('customize-cra');

module.exports = {
    webpack: override(
        useEslintConfig(),
+        addPostcssPlugins([
+          require('postcss-px-to-viewport')({
+            unitToConvert: 'px',
+            viewportWidth: 1920,
+            unitPrecision: 3,
+            propList: ['*', '!letter-spacing', '!font-size'],
+            viewportUnit: 'vw',
+            fontViewportUnit: 'vw',
+            selectorBlackList: [],
+            minPixelValue: 2,
+            mediaQuery: false,
+            replace: true,
+            exclude: [],
+            landscape: false,
+          }),
+        ])
    ),
}

```

```shell
yarn add postcss-px-to-viewport -S
```

这里我使用了`postcss-px-to-viewport`插件，`px`单位直接转换为`vw`，但是字号不转换。

## 加入`BundleAnalyzerPlugin`

```diff
/*config-overrides.js*/
+ const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    webpack: override(
        useEslintConfig(),
+        addWebpackPlugin(new BundleAnalyzerPlugin()),
    ),
}

```

当然，这东西仅在分析的时候开启就好了。

## 加入`SplitChunk` 对模块进行分割

```diff
/*config-overrides.js*/
const { 
	override, 
	addWebpackAlias, 
	addLessLoader, 
+	setWebpackOptimizationSplitChunks, 
} = require('customize-cra');

module.exports = {
    webpack: override(
       useEslintConfig(),
+       setWebpackOptimizationSplitChunks({
+          chunks: 'all', //默认作用于异步chunk，值为all/initial/async
+          minSize: 30000, //默认值是30kb,代码块的最小尺寸
+          minChunks: 1, //被多少模块共享,在分割之前模块的被引用次数
+          maxAsyncRequests: 5, //按需加载最大并行请求数量
+          maxInitialRequests: 5, //一个入口的最大并行请求数量
+          name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
+          automaticNameDelimiter: '~', //默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
+          cacheGroups: {
+            //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
+            vendors: {
+              test: /node_modules/, //条件
+              priority: -10, //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
+            },
+            commons: {
+              minSize: 0, //最小提取字节数
+              minChunks: 2, //最少被几个chunk引用
+              priority: -20,
+              reuseExistingChunk: true, //    如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
+            },
+          },
+        })
    ),
}
```

## 对commit操作做拦截

在前面我们已经使用了`eslint`对代码进行了统一的校验，保证了开发人员在开发的时候规范代码。但是却无法保证错误的`eslint`校验代码提交到仓库中，那么我们就需要针对`git`提交之前做一些事情。这个时候`husky`就发挥作用了。作者的原话就是它就是看门狗形式的存在。

> Husky can prevent bad `git commit`, `git push` and more 🐶 *woof!*

```shell
yarn add husky -D
```

```diff
/*package.json*/
+"husky": {
+  "hooks": {
+    "pre-commit": "npm run lint-staged",
+  }
+},
```

可以看到，上面的pre-commit运行了一个命令，那么lint-staged是什么呢，它主要的工作是对git暂存的文件执行一些linner。

```shell
yarn add lint-staged -D
```

```diff
/*package.json*/
+"lint-staged": {
+  "**/*.{ts,tsx}": [
+    "prettier --write",
+    "npm run eslint",
+    "git add"
+  ],
+  "**/*.less": "npm run stylelint"
+},
```

如上述代码，它会对`git`暂存的`ts`和`tsx`文件按顺序执行`prettier`格式化和`eslint`校验后才能进行`add`。

有时候我们会发现，团队成员们提交的commit message千奇百怪，根本无法很好地定位到底哪次提交是修复bug，哪次提交是新功能，哪次提交修改了配置，所以这个时候我们需要一个统一的提交message的格式，那么commitlint就来了。

新增commitlint.config.js文件

```javascript
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            "feat", "fix", "docs", "style", "refactor", "test", "chore"
        ]],
    }
};
```

修改package.json文件

```diff
/*package.json*/
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged",
+      "commit-msg": "commitlint -E  HUSKY_GIT_PARAMS"
    }
  },
```

此时你会发现，如果不按config的规则提交，那么就提交不上去。

以上，文章开始时提的问题都已经解决。点击阅读原文可以获取源码。
