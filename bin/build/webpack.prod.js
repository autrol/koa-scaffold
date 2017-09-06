var webpack                = require('webpack');
var merge                  = require('webpack-merge');
var baseConfig             = require('./webpack.base.conf');
var ExtractTextPlugin      = require('extract-text-webpack-plugin');
var WebpackMd5Hash         = require('webpack-md5-hash');
var get_entry              = require('./get_entry');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');
var os                     = require('os');
var AssetsPlugin           = require('assets-webpack-plugin');

// whether to generate source map for production files.
// disabling this can speed up the build.
const hashLen = 8;

var config = merge(baseConfig, {
    devtool: false,
    bail: true,
    output: {
        filename: 'js/[name]-[chunkhash:' + hashLen + '].js',
        chunkFilename: 'js/[id]-[chunkhash:' + hashLen + '].js'
    },
    module: {
        loaders: [{
            test: /\.css/,
            loader: ExtractTextPlugin.extract(["css!postcss"])
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(['css?minimize&-autoprefixer!postcss', 'less'])
        }]
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            var _perInt = parseInt(percentage * 100);
            if (_perInt % 10 === 0) {
                console.log('当前进度: ' + parseInt(percentage * 100) + "%", msg);
            }
        }),

        // new webpack.optimize.CommonsChunkPlugin("lib", 'static/lib.js?md5=[chunkhash:' + hashLen + ']'),
        new webpack.optimize.OccurenceOrderPlugin(),
        // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new ExtractTextPlugin('css/[name]-[contenthash:' + hashLen + '].css'),
        new UglifyJsParallelPlugin({
            // usually having as many workers as cpu cores gives good results
            workers: os.cpus().length,
            // other uglify options
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new WebpackMd5Hash(),
        // 生成页面对应的文件URL，以规范的JSON格式打印出来
        new AssetsPlugin({
            filename: 'assets.json',
            prettyPrint: true
        })
    ]
});

module.exports = config;