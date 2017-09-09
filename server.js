var Koa          = require('koa');
var path         = require('path');
var staticServer = require('koa-static');
var cacheControl = require('koa-cache-control');
var Router       = require('koa-router');
var glob         = require('glob');
var xtpl         = require('xtpl/lib/koa');
var bodyParser   = require('koa-bodyparser');
var gzip         = require('koa-gzip');
var manifestConfig = require('./build/manifest.json');

var app = new Koa();

var node_env = process.env.NODE_ENV || 'development';
var port = process.env.NODE_ENV === 'production' ? 80 : 8888;
// 资源缓存，一定要在静态资源和路由之前执行
app.use(cacheControl ({
    maxAge: 365 * 24 * 60 * 60
}));

// 文件压缩，一定要在静态资源和路由之前执行
app.use(gzip());

// 静态资源JS／CSS，只有这个文件夹的内容，外部才能直接访问
app.use(staticServer(path.join(__dirname, '/build')));

// 参数解析
app.use(bodyParser());

// view 中的全局变量
app.use(function* (next) {
    this.state.env = node_env;
    this.state.addScript = function (src) {
        if (node_env === 'development') {
            return '<script src="http://127.0.0.1:8080/js/' + src + '"></script>';
        }
        return '<script src="/' + manifestConfig[src] + '"></script>';
    };
    this.state.addStyle = function (src) {
        if (node_env === 'development') {
            return '';
        }
        return '<link rel="stylesheet" href="/' + manifestConfig[src] + '"/>';
    };

    yield next;
});

// 使用xtemplate模版引擎
xtpl(app, {
    views: './app/views'
});

// controllers
var controllers = glob.sync('./app/controllers/**/**.js');
controllers.forEach(function (file) {
    var router = new Router({
        prefix: file.replace('./app/controllers', '').slice(0, -3)
    });
    try {
        require(file)(router);
        app.use(router.routes()).use(router.allowedMethods());
    } catch (e) {
        console.error(e);
    }
});

// 开启服务
app.listen(port, function () {
    console.log('Koa-scaffold is running in ' + node_env + '...\n' +
        'Listening on port: ' + port)
});

module.exports = app;
