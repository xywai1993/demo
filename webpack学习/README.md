# webpack
首选当然[官方文档](https://webpack.js.org/guides/getting-started/README.md) ，然后下面是一些使用历程

安装：
```
npm install webpack --save-dev
```

在项目根目录创建webpack.config.js 写个最简单的配置如下：

```javascript
const path = require('path');

module.exports = {
    entry: './src/page/index.js', //入口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

在命令行运行 webpack 命令即可 ,好吧，上面就这样了，下面记录点正经的 

**注意**
- 在window10 下 非全局安装可以直接在命令行运行 webpack命令
- 在window7 下 非全局安装需调用npm scripts命令
```javascript
{
  "scripts": {
    "start": "webpack"
  }
}
```


## 多入口配置

```javascript
module.exports = {
    entry: {
        index:'./src/page/index.js',
        two:'./src/page/two.js'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

## 动态多入口配置

```javascript
const path = require('path');

const glob = require('glob');
const files = glob.sync('./src/page/**/*.js'); //动态获取入口文件  返回值类似[ './src/page/index.js', './src/page/two.js','./src/page/kb/xxx.js' ]

let entryList = {};
files.forEach(function(f){
    let name = path.basename(f,'.js');  //获取文件名
    entryList['./js/page/'+name] = f;  // 构建后的文件 放在 dist/js/page 下 ，为什么不在output.filename 里写构建路径 是因为页面入口 和 公共文件入口这样可以分别写构建路径 
    
    //或者  直接原路径做一下操作，成为自己想要的目录结构
   // let url = f.replace(/\.\/src/, './js').replace(/\.js/,'');
   //       entryList[url] = f; 
    
    
});

module.exports = {
    entry:entryList,
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
       new CleanWebpackPlugin(['dist']),
    ]
};

```
使用glob模块 动态获取 对应目录下的所有入口文件 



## 公共库单独打包

[commons-chunk-plugin](https://webpack.js.org/plugins/commons-chunk-plugin/README.md#src/components/Sidebar/Sidebar.jsx) 插件用法

```javascript
const path = require('path');
const webpack = require('webpack');

const glob = require('glob');
const files = glob.sync('./src/page/*.js'); 

let entryList = {};
files.forEach(function(f){
    let name = path.basename(f,'.js');  
    entryList['./js/page/'+name] = f;
});

//公共库单独打包
entryList['./js/lib/'+'libjs'] = ['vue'];  // 构建后的公共文件 放在 dist/js/lib 下

module.exports = {
    entry:entryList,
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [    
        new webpack.optimize.CommonsChunkPlugin({name:'./js/lib/'+'libjs'})  //调用单独打包的插件,注意，这里name的值 一定要跟 entry 对应的值一样
    ]
};

``` 

在页面中调用公共库
```html

<script src="../dist/libjs.build.js"></script>
<script src="../dist/js/page/index.build.js"></script>
```


总结三步
1. 定义公共文件的入口以及公共文件列表 ,类似这样
```javascript
 {
   entry:{
       libjs:['vue','jquery','../lib/xx.js']
   }
}
```
2. 调用 webpack.optimize.CommonsChunkPlugin({name:'libjs'})  

3. 在页面中调用公共库，一定要调用，否则会报错



## 常用插件
- [清除构建目录内容](https://webpack.js.org/guides/output-management/README.md#cleaning-up-the-dist-folder) 这个可以在构建的时候把之前构建的内容清除掉

```javascript
npm install clean-webpack-plugin --save-dev
```
webpack.config.js
```javascript
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');  //看这里

module.exports = {
    entry: {
        index:'./src/page/index.js',
        two:'./src/page/two.js'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
       new CleanWebpackPlugin(['dist']) //看这里
    ]
};
```

- [commons-chunk-plugin](https://webpack.js.org/plugins/commons-chunk-plugin/README.md#src/components/Sidebar/Sidebar.jsx) 单独打包插件用法

- [webpack.optimize.UglifyJsPlugin]()  js压缩插件，webpack自带

```
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console:true
        },
        sourceMap: true
    })
```

**注意**：压缩之前要用babel-loader 转换，否者报错


## 开发环境 
1. 新建 webpack.dev.js 单独写开发环境的配置 ，开始devtool
```javascript
const merge = require('webpack-merge');  //需安装  npm install --save-dev webpack-merge
const common = require('./webpack.config.js');

module.exports = merge(common,{
    devtool: 'inline-source-map'
});
```

2.  开启文件监听 自动编译 
package.json
```javascript
{
    "scripts": {
        "start": "webpack --watch --config webpack.dev.js"
      }
}
```
3. 代理接口 
本地调试接口的时候会跨域，这个时候可以用到代理功能

webpack.dev.js
```javascript
{
    devServer:{
        contentBase: './dev',
        hot:true,
        proxy: { // 这里设置要代理的接口
            '/sdf.txt': 'http://127.0.0.1:3000' ,
            '/api':'http://127.0.0.1:3333'
        },
        compress: true
    }
}
```

项目中
```javascript
$.ajax('/sdf.txt');  //这个时候会请求 http://localhost:8080/sdf.txt ，但实际会代理到http://127.0.0.1:3000/sdf.txt

```





## 生成环境

webpack.prod.js
```javascript
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //提取css
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  //压缩css

module.exports = merge(common,{
    output: {
        filename: 'js/[name].build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://127.0.0.1:3000/'
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
            chunks:['liblib','index']
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
        new ExtractTextPlugin("css/[name].css"),   //如不需要按需加载css ,则可以打包成一个css new ExtractTextPlugin("css/style.css")
        new OptimizeCSSPlugin()
       
    ]
});
```

