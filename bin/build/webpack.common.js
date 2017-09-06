var webpack                       = require('webpack');
var path                          = require('path');
var get_entry                     = require('./get_entry');
var autoprefixer                  = require('autoprefixer');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    entry: get_entry.entries,
    output: {
        path: __dirname + '/../../assets/', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/',	//模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js'
    },
    externals: {
    },
    resolve: {
        alias: {
            "src": path.resolve('./src/js')
        },
        extensions: ['', '.js']
    },
    postcss: [
        autoprefixer({
            browsers: ['android >= 4.0','ios_saf >= 7.0'],
            remove: false
        })
    ],
    module: {
        //加载器，关于各个加载器的参数配置，可自行搜索之。
        loaders: [{
            test: /\.xtpl$/,
            loader: '@beibei/xtpl-loader'
        }, {
            test: /\.js$/,
            loader: 'babel',
            query: { cacheDirectory: false },
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new LodashModuleReplacementPlugin({
            'collections': true
        })
    ]
};
