#mock 可以拦截ajax请求 和 模拟数据

[官网](http://mockjs.com/)  文档一点都不清晰，主要体现在如何拦截ajax请求都没有

##拦截请求
mock.js

配置要拦截的接口 与 返回的数据
```javascript
import Mock from 'mockjs';
Mock.mock('/abc',{data:'abc'});
```

index.js
```javascript
import './mock';
import axios from 'axios';

axios.get('/abc').then(data=>{
    console.log(data); // 打印 {... data:{data:'abc'} ...}
});
``` 

##模拟请求

[直接看官方示例](http://mockjs.com/examples.html)



