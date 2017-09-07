var webpack                = require('webpack');
var ExtractTextPlugin      = require('extract-text-webpack-plugin');
var WebpackMd5Hash         = require('webpack-md5-hash');
var get_entry              = require('./get_entry');
var UglifyJsPlugin         = require('uglifyjs-webpack-plugin');
var os                     = require('os');
var ManifestPlugin         = require('webpack-manifest-plugin');

const hashLen = 8;

var config = {
    entry: get_entry.entries,
    devtool: false,
    output: {
        path: __dirname + '/../assets/',
        filename: 'js/[name]-[chunkhash:' + hashLen + '].js',
        chunkFilename: 'js/[id]-[chunkhash:' + hashLen + '].js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract(['css-loader?minimize&-autoprefixer!postcss-loader', 'less-loader'])
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/                
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            console.log('当前进度: ' + parseInt(percentage * 100) + "%", msg);
        }),

        // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new ExtractTextPlugin({
            filename: 'css/[name]-[contenthash:' + hashLen + '].css'
        }),
        new UglifyJsPlugin(),
        new WebpackMd5Hash(),
        // 生成页面对应的文件URL，以规范的JSON格式打印出来
        new ManifestPlugin({
            fileName: 'manifest.json'
        })
    ]
};

module.exports = config;