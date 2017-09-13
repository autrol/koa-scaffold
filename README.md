## 介绍
基于Koa、Webpack的脚手架，一键生成前端工程，给予良好的开发体验。

## 一键生成工程
```bash
# 全局安装
npm install -g server-scaffold

# 执行
scaffold --name=工程名(默认是server-scaffold)
```

## 启动
1、下载node工具包
```c
npm install --registry=https://registry.npm.taobao.org
```
2、启动后端服务器
```c
npm start
```
3、启动前端服务器
```c
npm run dev
```
4、访问[localhost:9999](http://localhost:9999)

## 代码eslint
```c
npm run lint
```

## 打包
```c
npm run build
```

## 线上环境
```c
# MAC / Linux
sudo npm run server
# Windows
npm run server
```

## 测试
```c
npm run test
```

## 测试覆盖率
```c
npm run cover
```

## 特色功能
```
1、tree shaking （减少未用到的代码）
2、autoprefixer（css兼容性处理）
3、代码覆盖率
4、测试
5、eslint
6、支持ES6、LESS、Xtemplate模版引擎
7、热更新
8、抽离公用模块文件vendor
9、提供controller中间层
...
```

## 问题记录
1、如果测试的代码是ES6，则测试用例代码必须要用ES6，mocha命令需要带配置`--compilers js:babel-core/register`  
计算ES6代码覆盖率，需要使用特殊istanbul版本，最新版本是得不到的

2、webpack tree-shaking不能添加配置
```json
"presets": [
    "es2015"
]
```
