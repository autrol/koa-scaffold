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
4、配置host，scaffold.example.com指到本地
```c
127.0.0.1 koa.scaffold.com
```
5、访问[koa.scaffold.com:8080](http://koa.scaffold.com:8080)

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
npm run prod
```

## 测试
```c
# Mac、Linux
sudo npm run test

# Windows
npm run test
```

## 测试覆盖率
```c
# Mac、Linux
sudo npm run cover

# Windows
npm run cover
```

## 问题记录
1、如果测试的代码是ES6，则测试用例代码必须要用ES6，mocha命令需要带配置`--compilers js:babel-core/register`  
计算ES6代码覆盖率，需要使用特殊istanbul版本，最新版本是得不到的，否则得到测试覆盖率
```
No coverage information was collected, exit without writing coverage information
```