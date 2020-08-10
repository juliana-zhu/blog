# HTTP

## 构建请求

构建请求行

## 查找缓存

查找浏览器缓存

## 准备IP地址和端口

请求DNS返回域名对应的IP，若浏览器缓存了DNS，则不会再访问一次DNS服务器

默认端口是80

## 等待TCP队列

Chrome 有个机制，同一个域名同时最多只能建立 6 个连接，如果请求数据量大于6个则要进行等待，若小于6个则直接进行TCP连接

## 建立TCP连接

三次握手

## 发送HTTP请求

![](./img/HTTP_request_format.png)


## 服务端处理HTTP请求

### 返回请求

![](./img/service_response_format.png)

### 断开连接

通常一旦服务器向客户端返回了请求数据，它就要关闭TCP连接了，不过若在头部信息加入`Connection:Keep-Alive`,那么浏览器就可以继续通过同一个TCP连接发送请求，这样就可以省去了下次三次握手的时间

## 重定向

![](./img/redirect.png)

## Q&A

### 为什么很多站点第二次打开速度会很快

+ DNS缓存和页面资源缓存

+ [HTTP缓存]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ

  

+ ![](./img/browser_resource_cache.png)
