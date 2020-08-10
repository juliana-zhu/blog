# http和缓存

## http

### 构建请求

构建请求行

### 查找缓存

查找浏览器缓存

### 准备IP地址和端口

请求DNS返回域名对应的IP，若浏览器缓存了DNS，则不会再访问一次DNS服务器

默认端口是80

### 等待TCP队列

Chrome 有个机制，同一个域名同时最多只能建立 6 个连接，如果请求数据量大于6个则要进行等待，若小于6个则直接进行TCP连接

### 建立TCP连接

三次握手

### 发送HTTP请求

![](/Users/zhulijie/Library/Mobile Documents/com~apple~CloudDocs/github/learningNote/docs/browser/img/HTTP_request_format.png)

### 服务端处理HTTP请求

#### 返回请求

![](/Users/zhulijie/Library/Mobile Documents/com~apple~CloudDocs/github/learningNote/docs/browser/img/service_response_format.png)

### 断开连接

通常一旦服务器向客户端返回了请求数据，它就要关闭TCP连接了，不过若在头部信息加入`Connection:Keep-Alive`,那么浏览器就可以继续通过同一个TCP连接发送请求，这样就可以省去了下次三次握手的时间

### 常见的http头部信息

+ 通用的头部
  + Connection    链接的管理 keep-alive close
  + Cache-Control	控制缓存行为
  + Date	报文日期

+ 请求头
  + Accept	可处理的媒体类型
  + Accept-Charset     优先的字符集
  + Accept-Encoding    优先的编码类型 gzip, deflate, br
  + Accept-Language   优先的语言
  + Authorization	Web认证信息
  + Host	请求资源所在的服务器
  + If-Match	比较实体标记
  + If-Modified-Since	比较资源的更新时间
  + If-None-Match	比较实体标记
  + If-Range	资源未更新时发送实体Byte的范围请求
  + If-Unmodified-Since	比较资源的更新时间(和If-Modified-Since相反)
+ 响应头
  + Accept-Ranges	是否接受字节范围
  + Age	资源的创建时间
  + ETag	资源的匹配信息
  + Location	客户端重定向至指定的URI
  + Proxy-Authenticate	代理服务器对客户端的认证信息
  + Retry-After	再次发送请求的时机
  + Server	服务器的信息
  + Vary	代理服务器缓存的管理信息
  + www-Authenticate	服务器对客户端的认证
+ 实体头
  + Allow	资源可支持的HTTP方法
  + Content-Encoding	实体的编码方式
  + Content-Language	实体的自然语言
  + Content-Length	实体的内容大小(字节为单位)
  + Content-Location	替代对应资源的URI
  + Content-MD5	实体的报文摘要
  + Content-Range	实体的位置范围
  + Content-Type	实体主体的媒体类型
  + Expires	实体过期时间
  + Last-Modified	资源的最后修改时间

## 缓存

![](./img/browser_resource_cache.png)

### 影响缓存的头部

+ Cache-Control
  + private 客户端可以缓存
  + public 客户端和代理服务器都可以缓存
  + max-age=60 缓存内容将在60秒后失效
  + no-cache 需要使用对比缓存验证数据,强制向源服务器再次验证
  + no-store 所有内容都不会缓存，强制缓存和对比缓存都不会触发
+ Expires 如果和`Cache-Control`共存 会采用`Cache-Control`
+ Last-Modified	资源的最后修改时间
  + response返回
+ If-Modified-Since
  + 和Last-Modified  配对
+ ETag   资源标记
  + response返回 和 If-None-Match匹配
+ If-None-Match  比较实体标记

### Q&A

+ 为什么跨域会有option请求？所有请求都要有option请求么？
  
  + option请求是用于校验服务器支持的method
  + 简单（header里没有用户附加的头部）的get请求是不需要发送option的
  
+ 为什么有时img的src里设置中文的图片名会提示找不到？
  
  + html页面没指定编码类型
  + Content-Type
  
+ 为什么很多站点第二次打开速度会很快?

  + DNS缓存和页面资源缓存

  + [http缓存]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ

+ 为什么需要`ctrl+f5`强制刷新才能获取到服务器最新的页面？
  + 服务器端没设置缓存策略
  + iframe缓存
  
+ 有哪些http优化策略？
  + 缓存
  + 减少资源请求数
  + 启用压缩
