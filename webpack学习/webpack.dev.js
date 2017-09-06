/**
 * Created by yiper on 2017/9/4.
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('xxx',common.entry);
module.exports = merge(common,{
    devtool: 'inline-source-map',

    output: {
        filename: '[name].dev.js',
        path: path.resolve(__dirname, 'dev'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dev']),
        new HtmlWebpackPlugin({
            template: 'html/index.html',
            //chunks:[]
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        })
    ],
    devServer:{
      //  contentBase: './dev'
    }
});