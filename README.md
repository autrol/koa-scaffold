## 启动
1、 全局安装nodemon命令：
```c
npm install -g nodemon
```
2、全局安装webpack-dev-server命令：
```c
npm install -g webpack-dev-server
```
3、下载node工具包
```c
npm install --registry http://10.2.223.167:7001/
```
4、启动后端服务器
```c
nodemon server.js
```
5、启动前端服务器
```c
// 默认端口是8080，如果想修改端口，可以添加配置参数'--port 端口号'，同时记得修改server.js中对应的端口号
npm run dev
```
6、配置host，scaffold.example.com指到本地
```c
127.0.0.1 koa.scaffold.com
```
7、访问[koa.scaffold.com:8888](http://koa.scaffold.com:8888)

## 与其他系统交互
1、使用koa-request模块
```javascript
var request = require("koa-request");
var options = {
    url: 'http://ttapi.beibei.com/mroute.html?method=beibei.toutiao.recom.hot.get&api_v=1',
    headers: { 'User-Agent': 'request' }
};
var response = yield request(options);
var info = JSON.parse(response.body);
```