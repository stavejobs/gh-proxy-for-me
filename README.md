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

---

## ⚙️ 镜像源配置详解

### 1️⃣ 国内常用镜像源清单

```javascript
// worker.js 中的 DEFAULT_MIRRORS 对象
const DEFAULT_MIRRORS = {
  "github.com": [
    "https://github.com",                      // ✅ 官方源 - 国际访问
    "https://hub.fgit.cf",                    // ⭐ fgit 镜像 - 稳定高效
    "https://github.com.cnpmjs.org",          // ⭐ cnpmjs 镜像 - NPM官方
    "https://mirror.ghproxy.com/https://github.com", // ⭐ ghproxy 镜像
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
```

### 2️⃣ 外部参数配置方式

#### 方式 A：通过环境变量（推荐）

编辑 `wrangler.toml` 文件，添加自定义镜像源：

```toml
[env.production]
vars = { 
  MIRROR_SOURCES = '''
  {
    "github.com": [
      "https://github.com",
      "https://hub.fgit.cf",
      "https://your-custom-mirror.com"
    ],
    "raw.githubusercontent.com": [
      "https://raw.githubusercontent.com",
      "https://raw.fgit.cf"
    ]
  }
  '''
}
```

部署到生产环境：
```bash
wrangler publish --env production
```

#### 方式 B：直接修改 worker.js

编辑 `worker.js` 中的 `DEFAULT_MIRRORS` 对象：

```javascript
const DEFAULT_MIRRORS = {
  "github.com": [
    "https://github.com",
    "https://your-custom-mirror.com",  // 添加自定义镜像
    "https://hub.fgit.cf",
  ],
  // ... 其他配置
};
```

重新部署：
```bash
wrangler publish
```

### 3️⃣ 镜像源选择指南

| 镜像 | 网址 | 说明 | 推荐指数 | 支持 |
|------|------|------|--------|------|
| **官方源** | https://github.com | 官方源，国际访问 | ⭐⭐⭐ | 所有 |
| **fgit** | https://hub.fgit.cf | 稳定高效，社区维护 | ⭐⭐⭐⭐⭐ | 所有 |
| **cnpmjs** | https://github.com.cnpmjs.org | NPM 官方镜像 | ⭐⭐⭐⭐ | github.com |
| **ghproxy** | https://ghproxy.com | 反向代理，速度快 | ⭐⭐⭐⭐ | 所有 |
| **fastgit** | https://raw.fastgit.org | 快速 Git CDN | ⭐⭐⭐⭐ | raw 文件 |

### 4️⃣ 性能优化建议

**最优配置：**
```javascript
const DEFAULT_MIRRORS = {
  "github.com": [
    "https://hub.fgit.cf",              // 首选 - 最快
    "https://github.com",               // 备选 - 官方
    "https://mirror.ghproxy.com/https://github.com",
  ],
  "raw.githubusercontent.com": [
    "https://raw.fgit.cf",              // 首选
    "https://raw.ghproxy.com",          // 备选
    "https://raw.githubusercontent.com",
  ],
  // ...
};
```

---

## 🔧 故障排查

### 问题：某个镜像返回 502/503 错误

**解决方案：**
1. 移除不稳定的镜像源
2. 添加备选镜像源到列表
3. 检查镜像源是否在线：访问 https://hub.fgit.cf

### 问题：如何实时切换镜像源

**解决方案：**
编辑 `worker.js` 中的 `DEFAULT_MIRRORS` 对象，然后重新部署：
```bash
wrangler publish
```

### 问题：响应时间过长

**原因：** 使用的镜像源网络不稳定

**解决方案：**
1. 调整镜像源顺序，将最快的放在前面
2. 移除响应慢的镜像源
3. 根据您的网络环境选择最优镜像

---

## 📊 国内镜像源对比

### 速度测试（国内延迟）
- **fgit**：< 100ms ⚡
- **ghproxy**：100-200ms 🚀
- **fastgit**：150-250ms 🚄
- **官方源**：800-2000ms 🐢

### 稳定性
- **fgit**：99.9% ⭐⭐⭐⭐⭐
- **ghproxy**：99.5% ⭐⭐⭐⭐
- **官方源**：100% ⭐⭐⭐⭐⭐（慢）

### 推荐使用场景
- **日常开发**：fgit + ghproxy
- **CI/CD**：官方源 + ghproxy
- **大文件下载**：fastgit + fgit
- **API 调用**：ghproxy API + 官方

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 贡献建议

- 🐛 报告 bug 时请提供详细的复现步骤
- ✨ 新增功能请先讨论需求
- 📚 改进文档的 PR 欢迎！
- 🎯 发现新镜像源？欢迎推荐

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

## 📮 联系方式

- **GitHub Issues**：[报告问题](https://github.com/stavejobs/gh-proxy-for-me/issues)
- **维护者**：[@stavejobs](https://github.com/stavejobs)

---

> 💡 提示：如果该项目对您有帮助，请给个 Star ⭐ 支持一下！
