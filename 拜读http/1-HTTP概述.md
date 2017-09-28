Web浏览器，服务器和相关的Web应用程序都是通过HTTP相互通讯的，HTTP是现代全球因特网中使用的公共语言———开篇

# 1.1 HTTP---因特网的多媒体信使
- HTTP可以从遍布全世界的web服务器上奖各种资源迅速，便捷，可爱地搬移到人们的桌面上的web浏览器上。
- HTTP使用的是可靠的数据传输协议，能够确保数据再传输过程中不被损坏或产生混乱

# 1.2 web客户端和服务器
- web服务器使用的是http协议，因此也称未http服务器
- 最常见的客户端是web浏览器

浏览一个页面时（比如 xxx.com/index.html），浏览器会向服务器（xxx.com）发送一条http请求，服务器会去寻找所期望的对象（index.html）,如果成功，就将对象，对象类型，对象长度以及其他一些信息放在http响应中发送给客户端

# 1.3 资源
- web资源是web内容的源头
- 最简单的web资源就是web服务器上的静态文件，比如 文本文件，html文件，图片文件等等
- 资源还可以是根据需要生成内容的软件程序
- 所有能够提供web内容的东西都是web资源

# 1.3.1 媒体类型（MIME type）
- 因特网上有数千种数据类型，http给每种要通过web传输的对象都打上了名为MIME类型的数据格式标签
- MIME 类型是一种文本标记，表示主要的对象类型和一个特定的子类型，中间由一条斜杆来分隔
  - html格式的 为 text/html
  - ASCII文本文档  text/plain 
  - jpeg 图片  image/jpeg
  - gif 图片 image/gif
  - apple 的QuickTime电影为 video/quicktime
  
# 1.3.2 URI
服务器资源名 被称为统一资源标识符（Uniform Resource  Identifier ，URI）
- URI有两种形式，分别称为URL 和 URN

# 1.3.3 URL 统一资源定位符
URL描述了一台特定服务器上某资源的特定位置

- 大部分URL都遵循一种标准格式，包含三个部分
    - 第一部分被称为方案（scheme），说明了访问资源所使用的协议类型，这部分通常就是http协议（http：//）
    - 第二部分给出了服务器的因特网地址（比如：www.baidu.com）
    - 其余部分指定web服务器上的某个资源（比如：/xxx.jpg）

例如：
http：//www.xxx.com/index.html

http 是协议 ，www.xxx.com是服务器， index.html 是本地资源

# 1.3.4 URN



  
