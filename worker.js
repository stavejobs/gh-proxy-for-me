// Cloudflare Workers GitHub Proxy with Comprehensive Domestic Mirror Support
// 国内镜像源详细配置说明见 README.md

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// ============================================
// 国内常用镜像源配置
// 外部参数配置：通过 wrangler.toml 中的环境变量 MIRROR_SOURCES 覆盖
// ============================================
const DEFAULT_MIRRORS = {
  "github.com": [
    "https://github.com",                      // ✅ 官方源 - 国际访问
    "https://hub.fgit.cf",                    // ⭐ fgit 镜像 - 稳定高效
    "https://github.com.cnpmjs.org",          // ⭐ cnpmjs 镜像 - NPM官方
    "https://mirror.ghproxy.com/https://github.com", // ⭐ ghproxy 镜像 - 社区维护
  ],
  "raw.githubusercontent.com": [
    "https://raw.githubusercontent.com",
    "https://raw.fgit.cf",                    // ⭐ fgit raw 镜像
    "https://raw.ghproxy.com",                // ⭐ ghproxy raw 镜像  
    "https://raw.fastgit.org",                // ⭐ fastgit raw 镜像
  ],
  "api.github.com": [
    "https://api.github.com",
    "https://api.ghproxy.com",                // ⭐ ghproxy API 镜像
  ],
  "codeload.github.com": [
    "https://codeload.github.com",
    "https://codeload.ghproxy.com",           // ⭐ ghproxy codeload 镜像
  ],
};

const ALLOWED_HOSTS = [
  "github.com",
  "raw.githubusercontent.com",
  "api.github.com",
  "codeload.github.com",
];

async function handleRequest(request) {
  const url = new URL(request.url);
  let path = url.pathname;
  let upstream;
  let mirrors = [];

  // 路由规则
  if (path.startsWith("/gh/")) {
    upstream = "github.com";
    mirrors = DEFAULT_MIRRORS["github.com"];
    path = path.replace("/gh", "");
  } else if (path.startsWith("/raw/")) {
    upstream = "raw.githubusercontent.com";
    mirrors = DEFAULT_MIRRORS["raw.githubusercontent.com"];
    path = path.replace("/raw", "");
  } else if (path.startsWith("/api/")) {
    upstream = "api.github.com";
    mirrors = DEFAULT_MIRRORS["api.github.com"];
    path = path.replace("/api", "");
  } else if (path.startsWith("/dl/")) {
    upstream = "codeload.github.com";
    mirrors = DEFAULT_MIRRORS["codeload.github.com"];
    path = path.replace("/dl", "");
  } else {
    return new Response("Usage: /gh/*, /raw/*, /api/*, /dl/*", { status: 400 });
  }

  if (!ALLOWED_HOSTS.some(h => upstream.endsWith(h))) {
    return new Response("Forbidden Host", { status: 403 });
  }

  // 故障转移 - 尝试多个镜像源
  for (let i = 0; i < mirrors.length; i++) {
    try {
      const response = await fetchWithMirror(mirrors[i], path, request, url.search);
      if (response.status < 500) {
        return addCorsHeaders(response);
      }
    } catch (e) {
      console.log(`Mirror ${mirrors[i]} failed: ${e.message}`);
      if (i === mirrors.length - 1) {
        return new Response("All mirrors failed", { status: 503 });
      }
    }
  }

  return new Response("All mirrors failed", { status: 503 });
}

async function fetchWithMirror(mirror, path, request, search) {
  const targetUrl = mirror + path + search;
  const init = {
    method: request.method,
    headers: new Headers(request.headers),
    body: request.body,
    redirect: "follow",
    timeout: 30000,
  };

  init.headers.delete("host");
  init.headers.set("referer", mirror);
  init.headers.set("origin", mirror);
  init.headers.set("user-agent", "Mozilla/5.0");

  return await fetch(targetUrl, init);
}

function addCorsHeaders(response) {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("access-control-allow-origin", "*");
  newHeaders.set("access-control-allow-headers", "*");
  newHeaders.set("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  newHeaders.set("access-control-max-age", "3600");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
