# 编写cli

阮老师有详细说明 [Node.js 命令行程序开发教程](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)

1. 编写一个带bin 参数的npm 包
package.json 
```javascript
{
  "name": "yiper-cli",
  "version": "0.0.1",
  "bin": {
    "yiper-cli": "./index.js"
  }
}
```
index.js 
```javascript
#! node  

console.log('刚才什么情况')
```
**注意** 第一行的"#! node"很重要，表示用node来执行这个文件。如果没有这句声明，就会在记事本中打开index.js文件。

2. 发布包到全局,方便使用
两种办法 
- npm install -g 
- npm link 

之后就可以在命令行下直接调用 **yiper-cli** 命令

3.发布到npm
npm publish
