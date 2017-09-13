/**
 * Created by yiper on 2017/9/4.
 */
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
        publicPath: 'http://localhost:8080/'
    },
    plugins: [
        new CleanWebpackPlugin(['dev']),
        new HtmlWebpackPlugin({
            template: 'html/index.html',
            filename:'index.html',
            chunks:['liblib','index']
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
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase: './dev',
        hot:true
    }
});