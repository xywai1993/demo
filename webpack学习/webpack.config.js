/**
 * Created by yiper on 2017/9/4.
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const glob = require('glob');
const files = glob.sync('./src/page/**/*.js'); //动态获取入口文件  返回值类似[ './src/page/index.js', './src/page/two.js','./src/page/kb/xxx.js' ]



module.exports = {
    entry:{
        index:'./src/page/index.js',
        two:'./src/page/two.js',
        'liblib':['jquery','./src/lib/liblib.js']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'liblib',chunks:['liblib']}),
        new webpack.optimize.CommonsChunkPlugin({name:'index',chunks:['index']}),
        new webpack.optimize.CommonsChunkPlugin({name:'two',chunks:['two']})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
                use:['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 100,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }]
            }
        ]
    }
};