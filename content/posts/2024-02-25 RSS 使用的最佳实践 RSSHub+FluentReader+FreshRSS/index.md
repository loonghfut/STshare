---
title: 2024-02-25 RSS 使用的最佳实践 RSSHub+FluentReader+FreshRSS
date: 2024-10-17T21:32:33Z
lastmod: 2024-10-17T21:32:33Z
tags: [工具,部署,资源]
---

# 2024-02-25 RSS 使用的最佳实践 RSSHub+FluentReader+FreshRSS

---

- 2024-02-25 RSS 使用的最佳实践 RSSHub+FluentReader+FreshRSS - 知乎专栏
- [https://zhuanlan.zhihu.com/p/683851138](https://zhuanlan.zhihu.com/p/683851138)
- 参考链接： RSS 简介：https://www.runoob.com/rss/rss-intro.html RSSHub：https://docs.rsshub.app/ Fluent Reader：https://github.com/yang991178/fluent-reader FreshRSS：https://github.com/FreshRSS/Fresh…
- 2024-10-17 21:32:35

---

> 参考链接：  
> RSS 简介：[https://www.runoob.com/rss/rss-intro.html](https://link.zhihu.com/?target=https%3A//www.runoob.com/rss/rss-intro.html)  
> RSSHub：[https://docs.rsshub.app/](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/)  
> Fluent Reader：[https://github.com/yang991178/fluent-reader](https://link.zhihu.com/?target=https%3A//github.com/yang991178/fluent-reader)  
> FreshRSS：[https://github.com/FreshRSS/FreshRSS](https://link.zhihu.com/?target=https%3A//github.com/FreshRSS/FreshRSS)  
> 重新捡起 RSS：RSSHub + FreshRSS 建立我的信息流：[https://blog.l3zc.com/2023/07/rsshub-freshrss-information-flow/](https://link.zhihu.com/?target=https%3A//blog.l3zc.com/2023/07/rsshub-freshrss-information-flow/)

### 前言

最近一段时间研究了下 RSS 的最佳实践，经过一番探究，得出了 RSSHub + Fluent Reader + FreshRSS 的最佳组合，现记录一下使用流程。

> 本文应该是全网最全面的 RSS 使用实践了，如果给你带来了一些收获，不甚荣幸。

### 你真的需要 RSS 吗？

或许，你在某些文章中会看到，文章作者对 RSS 夸的天花乱坠，似乎 RSS 就是无所不能，RSS 就是银弹。

但实质上，RSS 也就是种信息传播格式，未必适合每个人，RSS 不是万能的银弹。

来做个简单的小测验，这是`RSSHub`​的官网：[https://docs.rsshub.app/](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/)

- 如果你可以正常访问 RSSHub，那么你可能会需要 RSS
- 如果你无法（通过一些方式）访问 RSSHub，那么你多半不需要 RSS。
- 如果你实在搞不清楚的话，那么你必然不需要 RSS。

在搞明白你是否需要 RSS 之后，再接着往下看吧。

### RSS 是什么

在开始使用 RSS 之前，先需要知道 RSS 是什么。

RSS，全称 Really Simple Syndication，即“简易信息聚合”，是一种 XML 的内容格式。

一个标准的 RSS 例子如下：

```xml
<rss version="2.0">
    <channel>
        <title>网站标题</title>
        <link>网站首页地址</link>
        <description>描述</description>
        <copyright>授权信息</copyright>
        <language>使用的语言（zh-cn表示简体中文）</language>
        <pubDate>发布的时间</pubDate>
        <lastBuildDate>最后更新的时间</lastBuildDate>
        <generator>生成器</generator>
        <item>
            <title>标题</title>
            <link>链接地址</link>
            <description>内容简要描述</description>
            <pubDate>发布时间</pubDate>
            <category>所属目录</category>
            <author>作者</author>
        </item>
    </channel>
</rss>
```

### RSS 有什么用

这是个好问题，也是你在开始折腾 RSS 前需要搞清楚的事情。

以一言盖之，RSS 订阅的本质就是种​**信息获取渠道**，与微信公众号、博客、微博等一样，都是让你来获取信息的。

​**只是**​，RSS 订阅 允许你自己来**主动**获取你想要的信息，而排除一切你不想要的信息。

在这个充满了大数据推送的时代，RSS 订阅是化被动为主动的信息获取方式，让你的信息接收完全被自己掌控！

> BitTorrent 资源网站大多也提供 RSS 订阅，可以添加到 BT 下载软件中订阅，实现自动下载资源。

### RSS 如何订阅

在知道了 RSS 有什么用之后，接下来就得找 RSS 订阅源了。

### 1.网站自行提供

有些网站会自己提供 RSS 订阅源，例如 [GitHub](https://link.zhihu.com/?target=https%3A//github.com/)、[少数派](https://link.zhihu.com/?target=https%3A//sspai.com/)等，大部分自建的博客也会提供 RSS 订阅源，例如 [阮一峰的网络日志](https://link.zhihu.com/?target=https%3A//www.ruanyifeng.com/blog/)、[草梅友仁的博客](https://link.zhihu.com/?target=https%3A//blog.cmyr.ltd/)等。

### 2.RSSHub 订阅

但对于大部分（国内的）网站来说，提供 RSS 订阅服务是没有必要的，所以基本上不提供 RSS 订阅服务。

在这里，就需要靠 RSSHub 来实现 RSS 订阅了。

> RSSHub：[https://docs.rsshub.app/](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/)  
> RSSHub 是一个开源、简单易用、易于扩展的 RSS 生成器，可以给任何奇奇怪怪的内容生成 RSS 订阅源。

![](https://picx.zhimg.com/v2-b601787b69b816fc5a3513e922538d95_r.jpg "image-20240225002244974")

以 B 站为例。

例如我希望订阅 bilibili 上一个名为 `草梅友仁`的 up 主的动态。

根据 [UP 主动态](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/zh/routes/social-media%23bilibili-up-zhu-dong-tai) 的文档，路由为 `/bilibili/user/dynamic/:uid/:routeParams?`。

把`:uid`​替换为  `草梅友仁`​的 uid： `10822025`​，得到路径为 `/bilibili/user/dynamic/10822025`

再加上域名 `https://rsshub.app`​，于是就获得了一个订阅源：`https://rsshub.app/bilibili/user/dynamic/10822025`

> 基于相同的方法，你还可以得到以下 RSS 订阅源。

- GitHub：[https://rsshub.app/github/repos/CaoMeiYouRen](https://link.zhihu.com/?target=https%3A//rsshub.app/github/repos/CaoMeiYouRen)
- 掘金：[https://rsshub.app/juejin/posts/3043088413495815](https://link.zhihu.com/?target=https%3A//rsshub.app/juejin/posts/3043088413495815)
- 知乎：[https://rsshub.app/zhihu/people/activities/CaoMeiYouRen](https://link.zhihu.com/?target=https%3A//rsshub.app/zhihu/people/activities/CaoMeiYouRen)
- 简书：[https://rsshub.app/jianshu/user/c111d2a51026](https://link.zhihu.com/?target=https%3A//rsshub.app/jianshu/user/c111d2a51026)

由于官方提供的域名仅供 demo，可用性不高，会因为反爬虫等原因失效，所以一般考虑自建来增强可用性（也增加了可自定义的部分），下面来讲一下这部分内容。

### RSSHub 部署

在 RSSHub 的官方文档中，就已经对如何部署进行了详细描述：[https://docs.rsshub.app/zh/install](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/zh/install)

我个人最推荐的是通过 Docker Compose 部署。

### 1.通过 Docker Compose 部署

首先确保服务器上安装了 Docker 和 Docker Compose。

然后在合适的位置创建`docker-compose.yml`文件，内容参考如下：

```yaml
version: '3.9'

services:
    rsshub:
        image: diygod/rsshub
        restart: always
        ports:
            - '1200:1200'
        environment:
            NODE_ENV: production
            CACHE_TYPE: redis
            REDIS_URL: 'redis://redis:6379/'
        depends_on:
            - redis

    redis:
        image: redis:alpine
        restart: always
        volumes:
            - redis-data:/data

volumes:
    redis-data:
```

然后就可以使用以下命令启动了：

```text
docker-compose up -d
```

然后可以通过访问 `http://[服务器IP]:1200`来判断启动是否成功。（在此之前，记得开放服务器的 1200 端口）

如果是在本地部署的话则访问 `http://127.0.0.1:1200` 即可。

停止

```text
docker-compose down
```

> 如何同步最新的 Docker 镜像？  
> 可以考虑通过增加镜像 Tag 来指定具体的镜像版本，例如：diygod/rsshub:2024-02-22。  
> 也可以考虑使用同步更新的 Docker 源，例如：[https://dockerproxy.com](https://link.zhihu.com/?target=https%3A//dockerproxy.com) 等

### 2.通过 npm 包使用

也许你还想过通过云函数（阿里云/腾讯云等）来调用，可以考虑将 RSSHub 作为 npm 包来使用，参考代码如下：

```js
const RSSHub = require('rsshub');

RSSHub.init({
    // config
});

RSSHub.request('/bilibili/user/dynamic/10822025')
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
```

这种使用方法比较冷门，在更新上也有些不便。但如果你需要的话，这也是一种选择。

### 3.解决图片代理问题

**提示：你可以在安装完 RSS 阅读器后再来处理这个问题**

在使用 RSS 阅读器的过程中，你可能会遇到图片加载不出来的问题，例如来自微博的图片就会因为跨域而被禁止加载。

![](https://pica.zhimg.com/v2-b1007d95c1237a6340d075ecf2cddc74_r.jpg "image-20240225012054331")

此时就需要添加图片代理。

有关图片外链的解决方案可参考该文章：[2023-10-14-免费图床之微博外链图片解决方案](https://link.zhihu.com/?target=https%3A//blog.axiaoxin.com/post/2023-10-14-%25E5%2585%258D%25E8%25B4%25B9%25E5%259B%25BE%25E5%25BA%258A%25E4%25B9%258B%25E5%25BE%25AE%25E5%258D%259A%25E5%25A4%2596%25E9%2593%25BE%25E5%259B%25BE%25E7%2589%2587%25E8%25A7%25A3%25E5%2586%25B3%25E6%2596%25B9%25E6%25A1%2588/)

这里以`image.baidu.com`为例。

以 RSSHub 为例，参考[图片处理](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/zh/install/config%23%25E5%259B%25BE%25E7%2589%2587%25E5%25A4%2584%25E7%2590%2586)一栏中的方法，可以在 `docker-compose.yml` 进行如下配置。

```text
HOTLINK_TEMPLATE: 'https://image.baidu.com/search/down?url=$${href_ue}'
HOTLINK_INCLUDE_PATHS: /weibo
```

这样就可以正常加载了。

> 实际的图片地址会变成：`https://image.baidu.com/search/down?url=https%3A%2F%2Ftvax1.sinaimg.cn%2Flarge%2F008dLuZOgy1hn4knw0yq4j31c82141kx.jpg`，从而规避微博图片的跨域限制

此时的 `docker-compose.yml` 完整配置参考如下：

```yaml
version: '3.9'

services:
    rsshub:
        image: diygod/rsshub
        restart: always
        ports:
            - '1200:1200'
        environment:
            NODE_ENV: production
            CACHE_TYPE: redis
            REDIS_URL: 'redis://redis:6379/'
            HOTLINK_TEMPLATE: 'https://image.baidu.com/search/down?url=$${href_ue}'
            HOTLINK_INCLUDE_PATHS: /weibo
        depends_on:
            - redis
          
    redis:
        image: redis:alpine
        restart: always
        volumes:
            - redis-data:/data
          
volumes:
    redis-data:
```

![](https://picx.zhimg.com/v2-fe48805245c77ce8cc254b43238a4baf_r.jpg)

### 4.解决 Cookie 问题

在使用 RSSHub 的过程中，你可能会遇到一些需要自建并提供 Cookie 的路由，例如 [用户关注动态](https://link.zhihu.com/?target=https%3A//docs.rsshub.app/zh/routes/social-media%23bilibili-yong-hu-guan-zhu-dong-tai)。

![](https://pica.zhimg.com/v2-db62d541103bb2a4076686cff8c93664_r.jpg "image-20240225172518519")

查阅文档可了解相关配置。

![](https://pic4.zhimg.com/v2-1e082f0586247fbd3fee4ab172e48baf_r.jpg "image-20240225172547861")

不过这时往往也会遇到个问题，那就是 Cookie 失效问题。

B 站的 Cookie 每隔一段时间会自动刷新，此时就失效了。

下面以 B 站为例介绍两个方法

​**方法一**：在浏览器无痕模式（隐身模式）下登录后获取相应的 Cookie。因为用户通过浏览器访问才会触发 Cookie 刷新，所以可以用该方法规避。

​**方法二**​：使用 [CookieCloud](https://link.zhihu.com/?target=https%3A//github.com/easychen/CookieCloud) 同步 Cookie。

受限于篇幅原因，此处就不再赘述如何部署 CookieCloud 了，主要来说下怎么用。

在浏览器端设置了要同步的域名后，就可以通过 CookieCloud 的接口来获取到 Cookie 了。

![](https://picx.zhimg.com/v2-e7eeb1d92b20e9c10cce8eb4f1300b33_b.jpg "image-20240225173224592")

以下是一个简单的 python 脚本，会在根目录生成 `.env` 文件，此时就可以被 Docker 读取到环境变量，也就解决了 Cookie 问题 。

> 不过在实际使用中也会遇到 Cookie 更新了，但 RSSHub 这边没有同步更新 Cookie 的问题。  
> 因为 RSSHub 只在启动的时候读取环境变量，所以需要定期重启以同步 Cookie 。

```python
import urllib
import requests
import json
import urllib.parse

# 环境变量；域名
cookie_map = {
    "BILIBILI_COOKIE_114514": "bilibili.com",
    "WEIBO_COOKIES": "weibo.cn"
}

def get_cloud_cookie():
    url = "https://localhost:8088/get/aaaaaaaaaaaaaa"
    payload = json.dumps(
        {"password": "xxxxxxxxxxxxxxx"}
    )
    headers = {"Content-Type": "application/json"}
    response = requests.request("POST", url, headers=headers, data=payload)
    return json.loads(response.text)

def encode_cookie(text):
    return urllib.parse.quote_plus(text)

def serialize_cookie(cookie):
    str = f"{encode_cookie(cookie['name'])}={encode_cookie(cookie['value'])}"
    return str

if __name__ == "__main__":
    data = get_cloud_cookie()
    env = ""
    for key, value in cookie_map.items():
        cookies = data["cookie_data"][value]
        cookie_str = "; ".join([serialize_cookie(c) for c in cookies])
        env_str = f'{key}="{cookie_str}"\n'
        env += env_str

    env = env.strip()
    with open(".env", "w", encoding="utf-8") as f:
        f.write(env)
```

### **5.访问控制配置**

如果你的 RSSHub 实例部署在公网上，那么你可能并不希望任何人都能访问你的 RSSHub 实例，尤其是你还配置了自己的 Cookie 的时候。

由于 RSSHub 官方已删除 `允许清单`​ 与 `拒绝清单`，故之前的配置方法已失效。

如果你还想实现之前的效果的话，下面提供一个用 Nginx 实现的版本。

具体的细节请参考这篇博客：[在 Nginx 的 if 条件中使用“与”、“或”](https://link.zhihu.com/?target=https%3A//www.eaimty.com/2018/nginx-if-multiple-conditions/)

```nginx
location / {
        proxy_set_header Access-Control-Allow-Origin $http_origin;
        set $deny_access 0;
        # 检查是否为禁止 url
        if ($request_uri ~* "(/bilibili/user/followers|/bilibili/user/followings)") {
            set $deny_access 1;
        }
        # 检查查询字符串中是否包含key
        if ($arg_key = "123456") {
            # 如果包含,则允许访问
            set $deny_access 0;
        }

        if ($deny_access = 1) {
            # 如果不允许，返回403 Forbidden
            return 403;
        }
        proxy_pass http://127.0.0.1:1200;
    }
```

### RSS 如何阅读

在解决了 RSS 订阅源的问题之后，我们将面临下一个问题：如何阅读 RSS？

很显然的是，原始的 xml 格式的文本，并不适合人类阅读，所以需要一个阅读器来美化内容。

### 桌面端

幸运的是，市面上已经有很多 RSS 阅读器了，在这里我推荐的是 [Fluent Reader](https://link.zhihu.com/?target=https%3A//github.com/yang991178/fluent-reader)，一个开源的、美观的 RSS 阅读器（也支持中文）。

![](https://pic2.zhimg.com/v2-73866d8ccb43cda271bcb8a51e9760a5_r.jpg "image-20240225005621620")

前往 [releases](https://link.zhihu.com/?target=https%3A//github.com/yang991178/fluent-reader/releases) 页面下载最新版本的安装包即可，按自己的操作系统来下载，Windows 用户下载 `.exe`后缀的安装包。

![](https://pica.zhimg.com/v2-e603547aef807a5fd864445fbc2a23c4_r.jpg "image-20240225005745346")

在安装完成后，即可进入软件查看。

默认情况下，Fluent Reader 里面什么都没有，需要自己手动添加 RSS 订阅源。

点击右上角的设置按钮

![](https://pica.zhimg.com/v2-ec649c514230b85ed6acd4fabf448400_r.jpg "image-20240225010604284")

然后输入一个 RSS 订阅源，例如：[https://blog.cmyr.ltd/atom.xml](https://link.zhihu.com/?target=https%3A//blog.cmyr.ltd/atom.xml)

![](https://picx.zhimg.com/v2-542e9e79f22efbbde6599a836bae8bad_r.jpg "image-20240225010706988")

然后再回到主页面，就可以看到订阅的内容了。

![](https://pic2.zhimg.com/v2-52eed546b524a5f3a84447f8b03cffc7_r.jpg "image-20240225010830611")

基于同样的方式，可以将之前 RSSHub 的那些订阅源都添加进去。

### 手机端

手机端这里推荐的是同个作者的 [Fluent Reader Lite](https://link.zhihu.com/?target=https%3A//github.com/yang991178/fluent-reader-lite)。

同样前往 [releases](https://link.zhihu.com/?target=https%3A//github.com/yang991178/fluent-reader-lite/releases) 页面下载最新版本的安装包即可。

![](https://pic3.zhimg.com/v2-f7a5a7a5e9839c1862380976e173073a_r.jpg "image-20240225011511695")

如果想支持下作者的话也可以通过 [Google Play](https://link.zhihu.com/?target=https%3A//play.google.com/store/apps/details%3Fid%3Dme.hyliu.fluent_reader_lite) 和 [App Store](https://link.zhihu.com/?target=https%3A//apps.apple.com/app/id1549611796) 安装，需要支付 1.99 美元作为费用。

![](https://pic3.zhimg.com/v2-bbf33a0514dbd8056e0ea82202c01580_r.jpg "image-20240225011641999")

在进入软件后，默认也是没有任何 RSS 订阅源的，需要自己手动添加。

![](https://pic2.zhimg.com/v2-2def1060e864a386c0037efb5b01b95b_r.jpg "image-20240225011911167")

并且和电脑端不同的是，甚至没有给你一个手动添加订阅源的地方，因此，需要一个 RSS 订阅服务。

> 如果你不想部署 FreshRSS 的话，也可以选择 [Read You](https://link.zhihu.com/?target=https%3A//github.com/Ashinch/ReadYou)、[Folio Reader](https://link.zhihu.com/?target=https%3A//foliorss.com/) 等其他手机端 RSS 阅读器。

### FreshRSS 部署

如果说 RSSHub 提供了 RSS 源的话，那么 [FreshRSS](https://link.zhihu.com/?target=https%3A//github.com/FreshRSS/FreshRSS) 就是负责订阅这些 RSS 源的。

### 1.通过 Docker Compose 部署

关于部署方式，推荐通过 Docker Compose 部署

```text
version: '3'
services:
  freshrss:
    image: freshrss/freshrss
    container_name: freshrss
    restart:  always
    ports:
      - "8080:80"
    environment:
      TZ: 'Asia/Shanghai'
      CRON_MIN: 1,31
    volumes:
      - freshrss_data:/var/www/FreshRSS/data
      - freshrss_extensions:/var/www/FreshRSS/extensions
volumes:
  freshrss_data:
  freshrss_extensions:
```

然后就可以通过 8080 端口来访问了，建议改成自己喜欢的端口。

进去之后的第一步就是选择语言了，这里选择简体中文即可。

![](https://pica.zhimg.com/v2-48428528fa07bf831da6e6f541cdf3de_r.jpg "image-20240225014348892")

步骤二是检查环境，通过 Docker Compose 部署的一般不存在环境问题，直接点击下一步即可。

![](https://pic3.zhimg.com/v2-8934911c5d58a8b3c039fdcc8243cc08_r.jpg "image-20240225014432617")

第三步是数据库配置，选默认的 SQLite 即可，如有需要可以选其他数据库。

![](https://pic3.zhimg.com/v2-cb09737fc39f28c374dec4fbf6ec5a74_r.jpg "image-20240225014512247")

第四步就是配置管理员账号了，自己配置即可。

![](https://pica.zhimg.com/v2-098dbf3b26d474458d29a4ddc01a6bf4_r.jpg "image-20240225014613536")

然后就大功告成了！

![](https://pic2.zhimg.com/v2-071ab32e0efe5bad2818b3835ffeee61_r.jpg "image-20240225014632634")

之后就会跳转到登录页面，登录即可。

![](https://pic2.zhimg.com/v2-c5ee0e095d0b272cb902e6c2f80e23b1_r.jpg "image-20240225014703994")

在首页里，默认只有 `FreshRSS releases` 这一个订阅源，可以考虑删除。

之后就可以自己添加 RSS 订阅源了！

![](https://pic4.zhimg.com/v2-c3bf57847952bf0dd3f0a02c41396027_r.jpg "image-20240225014723352")

### 2.启用 API 访问

点击右上角进入配置页面

![](https://pic1.zhimg.com/v2-16cd61b345d55dd3bec27f5920d030a2_r.jpg "image-20240225175329143")

在`认证`​页面中启用`允许 API 访问 （用于手机应用）`

![](https://pic4.zhimg.com/v2-67afe503da301504b7befd0b7091cda9_r.jpg "image-20240225175511317")

然后再回到`账户`​页面，设置`API 密码`

![](https://picx.zhimg.com/v2-39f4c36f35e2396c5724a0753b5bb367_r.jpg "image-20240225175626355")

然后就可以点击下方的`http://localhost:40201/api/`​来检测 API 状态，两个都为 `PASS` 即为成功。

![](https://pic3.zhimg.com/v2-4606b5c3075b71efeb1271a688c539cc_r.jpg "image-20240225175741094")

### 3.配置 Google Reader compatible API

在这里要说明下为什么不配置`Fever compatible API`​，原因是经过实测，Fluent Reader 和 Fluent Reader Lite 都无法正常配置`Fever compatible API`​（虽然提供了相关的配置项），所以这里就选择经过实测可行的 `Google Reader compatible API`。

### Fluent Reader 配置

在 `Google Reader API`​中，端点就设置为上文中的`http://localhost:40201/api/greader.php`，注意，域名（或 IP）和端口需要根据你自己的配置改动。

用户名则是你的账号名称。

密码是​**API 密码**，不是账号的密码！！

同步数量自行选择。

![](https://pic3.zhimg.com/v2-3692fc1817127921d205217ffd748fb6_r.jpg "image-20240225180232076")

随后可以在 `分组与排序`中导入分组，这样就可以和服务端同步订阅源与分组（默认情况下分组不会同步）

![](https://pic4.zhimg.com/v2-77d435a8d88a8e343bdd9aa8f934d16f_r.jpg "image-20240225180543045")

至此就完成了桌面端的配置

### Fluent Reader Lite

手机端也是类似的配置，此处不再赘述。

![](https://pic3.zhimg.com/v2-8c69f14051f656ba7bf85224593719fc_r.jpg "image-20240225181116973")

### **4.抓取全文**

你可能偶尔会遇到像 [少数派](https://link.zhihu.com/?target=https%3A//sspai.com/feed) 这样的 RSS 订阅源，只提供了一个简介，而没有正文，这时你就需要`抓取全文`功能。

![](https://pica.zhimg.com/v2-0ed4bd39eba1d1aa8cddfff2494cf2b6_r.jpg)

有两种解决方案。

### **在阅读器端配置**

在 Fluent Reader 和 Fluent Reader Lite 中都提供了抓取全文。

临时切换，可在右上角点击按钮切换。

![](https://pic1.zhimg.com/v2-2b4a5f9e9ebd6d100f96d55eb0762130_r.jpg)

永久配置，在打开方式中配置。

![](https://picx.zhimg.com/v2-25fe14b64eaec3108e76d341ceabeeb3_r.jpg)

手机端配置

![](https://pic1.zhimg.com/v2-0854fb6b748338dbc327b47b88b9e742_r.jpg)

### **在 FreshRSS 端配置**

FreshRSS 中当然也提供了`抓取全文`功能，只是要自己配置一下。

在 `原文的 CSS 选择器`​ 一项中填入 `body`​ 或 `p`，即可抓取全文。点击左边的小眼睛预览下结果即可，选择效果更好的那个选择器。

> 经过测试，单独一个 `p`​ 选择器会把图片给排除了，因此建议写成 `img,p,h1,h2,h3,h4,h5,h6`​。  
> 仅针对少数派的话，可以写成 `.article-body p, .article-body img, .article-body h1, .article-body h2, .article-body h3, .article-body h4, .article-body h5, .article-body h6`

![](https://pic3.zhimg.com/v2-209dd14766c0ccf3087d8dd51844a708_r.jpg)

然后点击最下方的`重载文章`，即可看到抓取后的全文。

![](https://pic4.zhimg.com/v2-d783516e30c15557957e4deae4194d7f_r.jpg)

### **5.订阅 FreshRSS**

实际上，FreshRSS 本身，也是可以被订阅的！

> 在 1.24 版本中，该功能有所变化，请参考官方文档。  
> [https://freshrss.github.io/FreshRSS/en/users/user_queries.html](https://link.zhihu.com/?target=https%3A//freshrss.github.io/FreshRSS/en/users/user_queries.html)

在 FreshRSS 1.24 以上版本，更推荐通过 `自定义查询` 来实现聚合订阅。

![](https://pic4.zhimg.com/v2-6c44bcffdfa6279c3f4f8e7a056650a9_r.jpg)

具体而言，就是点击分组后，再收藏当前查询即可。

此时再通过 就可以获取到聚合后的 RSS 订阅地址。

![](https://pic3.zhimg.com/v2-63e5809a1e4397e9fcb80a21410fd9ca_r.jpg)

相较于之前的方式，这种方式减少了 token 泄漏带来的影响，因为每一个查询的 token 都是不一样的。

另外提一下[搜索参数](https://link.zhihu.com/?target=https%3A//freshrss.github.io/FreshRSS/en/users/10_filter.html%23with-the-search-field)。

![](https://pic1.zhimg.com/v2-84fa3b6c2d07587b997e200214e7f1ee_r.jpg)

通过搜索参数可以非常方便的筛选出需要的 RSS 文章，这对于源站未提供筛选功能的 RSS 订阅源是一个极大的加强。

可以通过在 FreshRSS 这边筛选来曲线救国。

> 使用的最多的应该是基于 pubdate 筛选，例如 `pubdate:2024-04-11/`​ 就是只保留 2024-04-11 之后的。注意 `/`不能丢。更具体的可以参考官方文档

至此，我们就实现了 RSS 从订阅源、到同步、到阅读的全流程，尽情的体验 RSS 带来的全新信息流吧！

### 发现 RSS

好像还有一个问题，那就是我要怎么知道一个网站是否提供了 RSS 呢？或者说，我要怎么知道 RSSHub 是否提供了某个网站的 RSS 呢？

答案是通过 [RSSHub Radar](https://link.zhihu.com/?target=https%3A//github.com/DIYgod/RSSHub-Radar)。

![](https://pic4.zhimg.com/v2-8c8c7dc2f857304093866685c7e67a91_r.jpg "image-20240225181629402")

通过在设置中配置 `自定义 RSSHub 域名`​和 `一键订阅`，就可以实现这样的效果，这样一来，订阅 RSS 就方便很多了。

![](https://picx.zhimg.com/v2-c8d4b056400e47c2c73fa32769942bb1_r.jpg)

### RSS 下载

对于支持 `BitTorrent／磁力链接`的 RSS 订阅源，只要使用支持 BitTorrent／磁力订阅源的 BitTorrent 客户端即可，例如 qBittorrent 等。

> 建议使用**迅雷**以外的任何主流的开源 BitTorrent 客户端，反吸血人人有责。

![](https://pic2.zhimg.com/v2-d0db5f3424b4941cd76c43168549d105_r.jpg "image-20240225182435697")

### RSS 推送

> TODO

实际上，在目前的 RSS 相关应用中，还缺少一类应用，那就是 RSS 推送，即把更新的 RSS 消息推送到某个消息渠道，例如微信、钉钉、邮件等。

> 虽然已经有 [rsspush](https://link.zhihu.com/?target=https%3A//github.com/easychen/rsspush) 在前了，但该软件和 [Server 酱](https://link.zhihu.com/?target=https%3A//sct.ftqq.com/%3Ffr%3Drsshub) 强绑定，也没有和 `FreshRSS` 等 RSS 订阅服务联动。虽然能用，但没有达到笔者理想中的程度。

如果对 RSS 推送有需求的，可以尝试一下 rsspush。

> 如果结合 FreshRSS 提供的聚合 RSS 功能使用的话，可以实现比较神奇的效果。  
> 简而言之，首先在 FreshRSS 中创建一个 `订阅`​ 分组，然后将需要订阅的 RSS 加进去，然后再订阅这个 `订阅分组` 的 RSS，就可以实现在一个 RSS 链接中订阅所有信息来源

### 总结

使用 RSS 是件麻烦事，只有少数愿意折腾的人才会去干这件事。

如果你也愿意为之折腾，那就说明你也有颗不安分的心。

愿你在这充满大数据推送的时代，能有受自己掌控自己的信息流。

本文作者：草梅友仁

本文地址： [2024-02-25 RSS 使用的最佳实践 RSSHub+FluentReader+FreshRSS](https://link.zhihu.com/?target=https%3A//blog.cmyr.ltd/archives/499d4cee.html)

版权声明：转载请注明出处！
