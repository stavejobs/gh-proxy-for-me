# 🚀 GitHub Proxy for Cloudflare Workers

A GitHub proxy service optimized for users in mainland China, deployed on Cloudflare Workers, supporting seamless switching of domestic image sources.

## ✨ Features

- **🌍Official + Domestic mirror dual source support**
  - GitHub official source
  - Domestic accelerated images (fgit, ghproxy, cnpmjs, fastgit)
  
- **⚡ High-speed access**
  - Leverage Cloudflare’s global CDN acceleration
  - Automatic failover, automatic switching if the mirror source fails
  
- **🔄 Flexible routing rules**
  - `/gh/*` → github.com
  - `/raw/*` → raw.githubusercontent.com
  - `/api/*` → api.github.com
  - `/dl/*` → codeload.github.com (download)
  
- **🔒 Safe and reliable**
  - Whitelist host verification
  - Automatically clean sensitive headers
  - CORS cross-domain support
  
- **📦 Works out of the box**
  - No complicated configuration required
  - One-click deployment to Cloudflare Workers
  -Support custom mirror source

---

## 🚀 Quick Start

### Prerequisites

- Cloudflare account (free account is enough)
- Git environment
- Node.js 14+ with npm

### Installation and deployment

```bash
# 1. Clone project
git clone https://github.com/stavejobs/gh-proxy-for-me.git
cd gh-proxy-for-me

# 2. Install dependencies
npm install

# 3. Log in to Cloudflare
wrangler login

# 4. Deploy to Cloudflare Workers
wrangler publish
```

---

## 📖 Usage example

### Basic usage

| Features | Original URL | Proxy URL |
|------|---------|---------|
| Visit GitHub | `https://github.com/stavejobs/repo` | `https://your-worker.dev/gh/stavejobs/repo` |
| Get the original file | `https://raw.githubusercontent.com/stavejobs/repo/main/file.md` | `https://your-worker.dev/raw/stavejobs/repo/main/file.md` |
| Call API | `https://api.github.com/users/stavejobs` | `https://your-worker.dev/api/users/stavejobs` |
| Download project | `https://codeload.github.com/stavejobs/repo/zipball/main` | `https://your-worker.dev/dl/stavejobs/repo/zipball/main` |

### Actual case

**Download project files:**
```bash
wget https://your-proxy.dev/raw/stavejobs/gh-proxy-for-me/main/worker.js
```

**Call GitHub API:**
```bash
curl https://your-proxy.dev/api/users/stavejobs
curl https://your-proxy.dev/api/repos/stavejobs/gh-proxy-for-me
```

**Direct access from browser:**
```
https://your-proxy.dev/gh/stavejobs/gh-proxy-for-me/issues
```