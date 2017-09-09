var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash    = require('webpack-md5-hash');
var get_entry         = require('./get_entry');
var UglifyJsPlugin    = require('uglifyjs-webpack-plugin');
var os                = require('os');
var ManifestPlugin    = require('webpack-manifest-plugin');

const hashLen = 8;

var config = {
    entry: get_entry.entries,
    output: {
        path: __dirname + '/../build/',
        filename: 'js/[name]-[chunkhash:' + hashLen + '].js',
        chunkFilename: 'js/[id]-[chunkhash:' + hashLen + '].js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract(['css-loader?minimize&-autoprefixer!postcss-loader', 'less-loader'])
        }, {
            test: /\.xtpl$/,
            loader: 'xtpl-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                babelrc: false,
                plugins: [
                    "transform-es2015-template-literals",
                    "transform-es2015-literals",
                    "transform-es2015-function-name",
                    "transform-es2015-arrow-functions",
                    "transform-es2015-block-scoped-functions",
                    "transform-es2015-classes",
                    "transform-es2015-object-super",
                    "transform-es2015-shorthand-properties",
                    "transform-es2015-computed-properties",
                    "transform-es2015-for-of",
                    "transform-es2015-sticky-regex",
                    "transform-es2015-unicode-regex",
                    "check-es2015-constants",
                    "transform-es2015-spread",
                    "transform-es2015-parameters",
                    "transform-es2015-destructuring",
                    "transform-es2015-block-scoping",
                    "transform-es2015-typeof-symbol",
                    ["transform-regenerator", {
                        "async": false,
                        "asyncGenerators": false
                    }]
                ]
            },
            exclude: /node_modules/      
        }]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),     // 减少公用文件hash值变化
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
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