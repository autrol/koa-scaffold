var webpack    = require('webpack');
var get_entry  = require('./get_entry');

var config = {
    entry: get_entry.entries,
    output: {
        path: __dirname + '/../assets/', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: 'js/[name].js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/                
        }]
    },
    devServer: {
        proxy: {
            '/': 'http://127.0.0.1:8080'
        },
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
};

module.exports = config;
