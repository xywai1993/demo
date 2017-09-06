/**
 * Created by yiper on 2017/9/4.
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const glob = require('glob');
const files = glob.sync('./src/page/**/*.js'); //动态获取入口文件  返回值类似[ './src/page/index.js', './src/page/two.js','./src/page/kb/xxx.js' ]
console.log(files);

let entryList = {};
files.forEach(function(f){
    let name = path.basename(f,'.js');  //获取文件名
    console.log(f.replace(/\.\/src/, './js'));
    let url = f.replace(/\.\/src/, './js').replace(/\.js/,'');
    entryList[url] = f;
});

//公共库单独打包
entryList['./js/lib/'+'libjs'] = ['jquery','./src/lib/liblib.js'];

module.exports = {
    entry:entryList,
    // output: {
    //     filename: '[name].build.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'./js/lib/'+'libjs'})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
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
            }
        ]
    }
};