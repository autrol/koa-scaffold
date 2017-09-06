var webpack    = require('webpack');
var merge      = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var get_entry  = require('./get_entry');

var config = merge(baseConfig, {
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js'
    },
    module: {
        loaders: [{
                test: /\.css/,
                loader: "vue-style!css!postcss"
            }, {
                test: /\.less$/, // style-loader 在sourceMap的情况下处理字体路径有问题,所以用vue-style来代替
                loader: 'vue-style!css?sourceMap!postcss!less?sourceMap'
            }
        ]
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
});

module.exports = config;
