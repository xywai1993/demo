/**
 * Created by yiper on 2017/9/4.
 */

process.env.NODE_ENV = 'dev';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common,{
    devtool: 'inline-source-map',

    output: {
        filename: 'js/[name].dev.js',
        path: path.resolve(__dirname, 'dev'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dev']),
        new HtmlWebpackPlugin({
            template: 'html/index.html',
            filename:'index.html',
            chunks:['liblib','index'],
            chunksSortMode:'dependency'
        }),
        new HtmlWebpackPlugin({
            template: 'html/two.html',
            filename:'two.html',
            chunks:['two']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({name:'liblib',chunks:['liblib']}),
        new webpack.optimize.CommonsChunkPlugin({name:'index',chunks:['index']}),
        new webpack.optimize.CommonsChunkPlugin({name:'two',chunks:['two']}) ,
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css")
    ],
    devServer:{
        index: 'index.html',
        contentBase: './dev',
        hot:true,  //热更新
        hotOnly:true, //刷新页面
        proxy: { // proxy URLs to backend development server
            '/sdf.txt': 'http://127.0.0.1:3000'
        },
        watchContentBase: true,
        compress: true,
        open:true
    }
});