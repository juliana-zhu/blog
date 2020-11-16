(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{416:function(t,_,v){t.exports=v.p+"assets/img/HTTP_request_format.b8993c73.png"},417:function(t,_,v){t.exports=v.p+"assets/img/service_response_format.3e30476a.png"},418:function(t,_,v){t.exports=v.p+"assets/img/browser_resource_cache.5fc2f88a.png"},513:function(t,_,v){"use strict";v.r(_);var a=v(4),e=Object(a.a)({},(function(){var t=this,_=t.$createElement,a=t._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"http和缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http和缓存"}},[t._v("#")]),t._v(" http和缓存")]),t._v(" "),a("h2",{attrs:{id:"http"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[t._v("#")]),t._v(" http")]),t._v(" "),a("h3",{attrs:{id:"构建请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构建请求"}},[t._v("#")]),t._v(" 构建请求")]),t._v(" "),a("p",[t._v("构建请求行")]),t._v(" "),a("h3",{attrs:{id:"查找缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查找缓存"}},[t._v("#")]),t._v(" 查找缓存")]),t._v(" "),a("p",[t._v("查找浏览器缓存")]),t._v(" "),a("h3",{attrs:{id:"准备ip地址和端口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#准备ip地址和端口"}},[t._v("#")]),t._v(" 准备IP地址和端口")]),t._v(" "),a("p",[t._v("请求DNS返回域名对应的IP，若浏览器缓存了DNS，则不会再访问一次DNS服务器")]),t._v(" "),a("p",[t._v("默认端口是80")]),t._v(" "),a("h3",{attrs:{id:"等待tcp队列"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#等待tcp队列"}},[t._v("#")]),t._v(" 等待TCP队列")]),t._v(" "),a("p",[t._v("Chrome 有个机制，同一个域名同时最多只能建立 6 个连接，如果请求数据量大于6个则要进行等待，若小于6个则直接进行TCP连接")]),t._v(" "),a("h3",{attrs:{id:"建立tcp连接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#建立tcp连接"}},[t._v("#")]),t._v(" 建立TCP连接")]),t._v(" "),a("p",[t._v("三次握手")]),t._v(" "),a("h3",{attrs:{id:"发送http请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发送http请求"}},[t._v("#")]),t._v(" 发送HTTP请求")]),t._v(" "),a("p",[a("img",{attrs:{src:v(416),alt:""}})]),t._v(" "),a("h3",{attrs:{id:"服务端处理http请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#服务端处理http请求"}},[t._v("#")]),t._v(" 服务端处理HTTP请求")]),t._v(" "),a("h4",{attrs:{id:"返回请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#返回请求"}},[t._v("#")]),t._v(" 返回请求")]),t._v(" "),a("p",[a("img",{attrs:{src:v(417),alt:""}})]),t._v(" "),a("h3",{attrs:{id:"断开连接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#断开连接"}},[t._v("#")]),t._v(" 断开连接")]),t._v(" "),a("p",[t._v("通常一旦服务器向客户端返回了请求数据，它就要关闭TCP连接了，不过若在头部信息加入"),a("code",[t._v("Connection:Keep-Alive")]),t._v(",那么浏览器就可以继续通过同一个TCP连接发送请求，这样就可以省去了下次三次握手的时间")]),t._v(" "),a("h3",{attrs:{id:"常见的http头部信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见的http头部信息"}},[t._v("#")]),t._v(" 常见的http头部信息")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("通用的头部")]),t._v(" "),a("ul",[a("li",[t._v("Connection    链接的管理 keep-alive close")]),t._v(" "),a("li",[t._v("Cache-Control\t控制缓存行为")]),t._v(" "),a("li",[t._v("Date\t报文日期")])])]),t._v(" "),a("li",[a("p",[t._v("请求头")]),t._v(" "),a("ul",[a("li",[t._v("Accept\t可处理的媒体类型")]),t._v(" "),a("li",[t._v("Accept-Charset     优先的字符集")]),t._v(" "),a("li",[t._v("Accept-Encoding    优先的编码类型 gzip, deflate, br")]),t._v(" "),a("li",[t._v("Accept-Language   优先的语言")]),t._v(" "),a("li",[t._v("Authorization\tWeb认证信息")]),t._v(" "),a("li",[t._v("Host\t请求资源所在的服务器")]),t._v(" "),a("li",[t._v("If-Match\t比较实体标记")]),t._v(" "),a("li",[t._v("If-Modified-Since\t比较资源的更新时间")]),t._v(" "),a("li",[t._v("If-None-Match\t比较实体标记")]),t._v(" "),a("li",[t._v("If-Range\t资源未更新时发送实体Byte的范围请求")]),t._v(" "),a("li",[t._v("If-Unmodified-Since\t比较资源的更新时间(和If-Modified-Since相反)")])])]),t._v(" "),a("li",[a("p",[t._v("响应头")]),t._v(" "),a("ul",[a("li",[t._v("Accept-Ranges\t是否接受字节范围")]),t._v(" "),a("li",[t._v("Age\t资源的创建时间")]),t._v(" "),a("li",[t._v("ETag\t资源的匹配信息")]),t._v(" "),a("li",[t._v("Location\t客户端重定向至指定的URI")]),t._v(" "),a("li",[t._v("Proxy-Authenticate\t代理服务器对客户端的认证信息")]),t._v(" "),a("li",[t._v("Retry-After\t再次发送请求的时机")]),t._v(" "),a("li",[t._v("Server\t服务器的信息")]),t._v(" "),a("li",[t._v("Vary\t代理服务器缓存的管理信息")]),t._v(" "),a("li",[t._v("www-Authenticate\t服务器对客户端的认证")])])]),t._v(" "),a("li",[a("p",[t._v("实体头")]),t._v(" "),a("ul",[a("li",[t._v("Allow\t资源可支持的HTTP方法")]),t._v(" "),a("li",[t._v("Content-Encoding\t实体的编码方式")]),t._v(" "),a("li",[t._v("Content-Language\t实体的自然语言")]),t._v(" "),a("li",[t._v("Content-Length\t实体的内容大小(字节为单位)")]),t._v(" "),a("li",[t._v("Content-Location\t替代对应资源的URI")]),t._v(" "),a("li",[t._v("Content-MD5\t实体的报文摘要")]),t._v(" "),a("li",[t._v("Content-Range\t实体的位置范围")]),t._v(" "),a("li",[t._v("Content-Type\t实体主体的媒体类型")]),t._v(" "),a("li",[t._v("Expires\t实体过期时间")]),t._v(" "),a("li",[t._v("Last-Modified\t资源的最后修改时间")])])])]),t._v(" "),a("h2",{attrs:{id:"缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[t._v("#")]),t._v(" 缓存")]),t._v(" "),a("p",[a("img",{attrs:{src:v(418),alt:""}})]),t._v(" "),a("h3",{attrs:{id:"影响缓存的头部"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#影响缓存的头部"}},[t._v("#")]),t._v(" 影响缓存的头部")]),t._v(" "),a("ul",[a("li",[t._v("Cache-Control\n"),a("ul",[a("li",[t._v("private 客户端可以缓存")]),t._v(" "),a("li",[t._v("public 客户端和代理服务器都可以缓存")]),t._v(" "),a("li",[t._v("max-age=60 缓存内容将在60秒后失效")]),t._v(" "),a("li",[t._v("no-cache 需要使用对比缓存验证数据,强制向源服务器再次验证")]),t._v(" "),a("li",[t._v("no-store 所有内容都不会缓存，强制缓存和对比缓存都不会触发")])])]),t._v(" "),a("li",[t._v("Expires 如果和"),a("code",[t._v("Cache-Control")]),t._v("共存 会采用"),a("code",[t._v("Cache-Control")])]),t._v(" "),a("li",[t._v("Last-Modified\t资源的最后修改时间\n"),a("ul",[a("li",[t._v("response返回")])])]),t._v(" "),a("li",[t._v("If-Modified-Since\n"),a("ul",[a("li",[t._v("和Last-Modified  配对")])])]),t._v(" "),a("li",[t._v("ETag   资源标记\n"),a("ul",[a("li",[t._v("response返回 和 If-None-Match匹配")])])]),t._v(" "),a("li",[t._v("If-None-Match  比较实体标记")])]),t._v(" "),a("h3",{attrs:{id:"q-a"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#q-a"}},[t._v("#")]),t._v(" Q&A")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("为什么跨域会有option请求？所有请求都要有option请求么？")]),t._v(" "),a("ul",[a("li",[t._v("option请求是用于校验服务器支持的method")]),t._v(" "),a("li",[t._v("简单（header里没有用户附加的头部）的get请求是不需要发送option的")])])]),t._v(" "),a("li",[a("p",[t._v("为什么有时img的src里设置中文的图片名会提示找不到？")]),t._v(" "),a("ul",[a("li",[t._v("html页面没指定编码类型")]),t._v(" "),a("li",[t._v("Content-Type")])])]),t._v(" "),a("li",[a("p",[t._v("为什么很多站点第二次打开速度会很快?")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("DNS缓存和页面资源缓存")])]),t._v(" "),a("li")])]),t._v(" "),a("li",[a("p",[t._v("为什么需要"),a("code",[t._v("ctrl+f5")]),t._v("强制刷新才能获取到服务器最新的页面？")]),t._v(" "),a("ul",[a("li",[t._v("服务器端没设置缓存策略")]),t._v(" "),a("li",[t._v("iframe缓存")])])]),t._v(" "),a("li",[a("p",[t._v("有哪些http优化策略？")]),t._v(" "),a("ul",[a("li",[t._v("缓存")]),t._v(" "),a("li",[t._v("减少资源请求数")]),t._v(" "),a("li",[t._v("启用压缩")])])])])])}),[],!1,null,null,null);_.default=e.exports}}]);