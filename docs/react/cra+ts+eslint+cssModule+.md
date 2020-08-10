# cra+TS+eslint+cssModule+gitHooks+dva最佳实践

你是否还在为了搭建一个企业级的react框架而发愁，是否有如下问题：

+ eslint要怎么配置才能兼容ts？
+ react项目要怎么样才能实现样式隔离？
+ 怎么才能让团队成员统一提交代码的格式？
+ 在history模式下react要怎么配置nginx？

如果你有以上问题，那么这就是你需要的实践方案！我们将一步步实现一个这样的框架。

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

在根目录下新建一个`config-overrides.js`文件，我们暂时写内容

```
module.exports = {

}
```

## 引入eslint

+ 在根目录下创建`.eslintrc.js`文件

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

+ 在根目录创建`.env`文件，设置EXTEND_ESLINT=true来[扩展基本ESLint配置](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config)

  ```
  EXTEND_ESLINT=true
  ```

+ 要使trc文件生效，你还需要删除`package.json`文件里的`eslintConfig`

  ```diff
  -  "eslintConfig": {
  -    "extends": "react-app"
  -  },
  ```

+ 此时再次启动项目会发现报如下错误，说明已经使用了我们自定义的eslint配置

  ```text
  Failed to load plugin 'react-app' declared in '.eslintrc.js': Cannot find module 'eslint-plugin-react-app'
  ```

+ 安装所需依赖

  ```shell
  yarn add eslint-plugin-react-app typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D 
  ```

+ 然鹅我发现事情并不那么简单，启动后发现eslint报了个警告。我们在rules里不是配置了`'@typescript-eslint/explicit-function-return-type': 0`么？我明明照着官网配置的~

  ```
  
  ./src/App.tsx
    Line 5:1:  Missing return type on function  @typescript-eslint/explicit-function-return-type
  
  Search for the keywords to learn more about each warning.
  To ignore, add // eslint-disable-next-line to the line before.
  
  ```

+ 一番搜索，发现是`create-react-app`的[issue](https://github.com/facebook/create-react-app/issues/9007)，issue的解决方案是修改`node_modules/react-scripts/config/webpack.config.js`文件下的`cache`改为`false`，试过之后的确可行，但是我不可能通知团队成员修改源码吧。一定还有其他的方案。

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

+ 想了一下，既然使用了`react-app-rewired`我们就能覆盖`webpack`的配置。于是第二种解决方案就是覆盖`webpack`的默认配置，我们使用[`customize-cra`](https://github.com/arackaf/customize-cra)来重写配置：

  ```shell
  yarn add customize-cra -D
  ```

  ```javascript
  /*config-overrides.js*/
  
  const {
      override,
  } = require('customize-cra');
  /**
   * 使用eslint
   * @param configRules
   * @returns {function(*): *}
   */
  const useEslintConfig = () => config => {
      const updatedRules = config.module.rules.map(rule => {
          // 查找有useEslintrc的配置
          if (rule.use && rule.use.some(use => use.options && use.options.useEslintrc !== void 0)) {
              const ruleUse = rule.use[0];
              const newOptions = {
                  cache: false,
              };
              ruleUse.options = { ...ruleUse.options, newOptions };
              return rule;
          } else {
              return rule;
          }
      });
  
      config.module.rules = updatedRules;
      return config;
  };
  module.exports = {
      webpack: override(
          useEslintConfig(),
      ),
  }
  
  ```

  这时候我们重启发现一切都是那么顺利☀️

## 加入prittier

团队协作少不了的代码格式化利器

+ 在根目录加入`.prettierrc`文件

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

+ 让`eslint`能校验到`prettier`

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

```

