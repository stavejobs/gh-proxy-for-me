# 🚀 GitHub Proxy for Cloudflare Workers

一个为中国大陆用户优化的 GitHub 代理服务，部署在 Cloudflare Workers 上，支持国内镜像源无缝切换。

## ✨ 功能特性

- **🌍 官方 + 国内镜像双源支持**
  - GitHub 官方源
  - 国内加速镜像（fgit、ghproxy、cnpmjs、fastgit）
  
- **⚡ 高速访问**
  - 利用 Cloudflare 的全球 CDN 加速
  - 自动故障转移，镜像源失败自动切换
  
- **🔄 灵活的路由规则**
  - `/gh/*` → github.com
  - `/raw/*` → raw.githubusercontent.com
  - `/api/*` → api.github.com
  - `/dl/*` → codeload.github.com（下载）
  
- **🔒 安全可靠**
  - 白名单 host 验证
  - 自动清理敏感 headers
  - CORS 跨域支持
  
- **📦 开箱即用**
  - 无需复杂配置
  - 一键部署到 Cloudflare Workers
  - 支持自定义镜像源

---

## 🚀 快速开始

### 前置要求

- Cloudflare 账户（免费账户即可）
- Git 环境
- Node.js 14+ 与 npm

### 安装与部署

```bash
# 1. 克隆项目
git clone https://github.com/stavejobs/gh-proxy-for-me.git
cd gh-proxy-for-me

# 2. 安装依赖
npm install

# 3. 登录 Cloudflare
wrangler login

# 4. 部署到 Cloudflare Workers
wrangler publish
```

---

## 📖 使用示例

### 基础用法

| 功能 | 原始 URL | 代理 URL |
|------|---------|---------|
| 访问 GitHub | `https://github.com/stavejobs/repo` | `https://your-worker.dev/gh/stavejobs/repo` |
| 获取原始文件 | `https://raw.githubusercontent.com/stavejobs/repo/main/file.md` | `https://your-worker.dev/raw/stavejobs/repo/main/file.md` |
| 调用 API | `https://api.github.com/users/stavejobs` | `https://your-worker.dev/api/users/stavejobs` |
| 下载项目 | `https://codeload.github.com/stavejobs/repo/zipball/main` | `https://your-worker.dev/dl/stavejobs/repo/zipball/main` |

### 实际案例

**下载项目文件：**
```bash
wget https://your-proxy.dev/raw/stavejobs/gh-proxy-for-me/main/worker.js
```

**调用 GitHub API：**
```bash
curl https://your-proxy.dev/api/users/stavejobs
curl https://your-proxy.dev/api/repos/stavejobs/gh-proxy-for-me
```

**浏览器直接访问：**
```
https://your-proxy.dev/gh/stavejobs/gh-proxy-for-me/issues
```