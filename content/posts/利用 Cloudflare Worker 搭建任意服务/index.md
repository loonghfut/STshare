---
title: 利用 Cloudflare Worker 搭建任意服务
date: 2024-09-21T18:35:31Z
lastmod: 2024-09-21T18:35:31Z
---

# 利用 Cloudflare Worker 搭建任意服务

---

- 利用 Cloudflare Worker 搭建任意服务 - Starx's Home
- [https://www.starx.ink/archives/using_cloudflare_worker_to_build_api/](https://www.starx.ink/archives/using_cloudflare_worker_to_build_api/)
- Worker 是 Cloudflare 公司的产品，它可以运行 JS 等语言。并且，它提供免费计划。 虽然你可…
- 2024-09-21 18:35:32

---

**Worker** 是 **Cloudflare** 公司的产品，它可以运行 **JS** 等语言。并且，它提供免费计划。

虽然你可以通过它实现任何你想实现的服务，但请务必不要滥用。

以下是 “获取用户真实IP” 的示例脚本源码。

## 源码

由于 **Worker** 使用**Cloudflare CDN** 网络进行数据分发，**HTTP** 头部的真实IP键名将与传统不同。

```
addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

/**
 * Return user real ip as response in plain text.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const clientIP = request.headers.get("CF-Connecting-IP")
  return new Response(clientIP);
}Code language: PHP (php)
```

**提示:** 你可以在测试完毕后，选择进入指定域名控制面板，添加指定 **Worker** 路由，以绑定自定义域名。

## 本站开放的API地址

API: **[https://ip.starx.ink](https://ip.starx.ink/)**

请不要滥用该 API ，否则将限制使用条件。

## 注意

当总服务使用量超过免费计划的限额时，你的服务将无法使用。

以下是免费计划的描述：

- 包括 **100k 个请求/天** (UTC+0)<sup>1</sup>
- 每个请求最多占用 10 毫秒 CPU 时间
- 第一个请求后的延迟最低

---

### 了解 Starx's Home 的更多信息

Subscribe to get the latest posts sent to your email.

输入您的电子邮件…
