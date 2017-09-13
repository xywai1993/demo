/**
 * Created by yiper on 2017/9/4.
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common,{
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://127.0.0.1:3000'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //生成对应入口的html文件
        new HtmlWebpackPlugin({
            template: 'html/index.html',
            filename:'index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template: 'html/two.html',
            filename:'two.html',
            chunks:['two']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console:true
            },
            sourceMap: true
        }),
        // 提取css
        new ExtractTextPlugin("css/styles.css")
       
    ]
});