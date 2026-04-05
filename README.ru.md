# 🚀 Прокси GitHub для работников Cloudflare

Прокси-сервис GitHub, оптимизированный для пользователей в материковом Китае, развернутый на Cloudflare Workers и поддерживающий плавное переключение внутренних источников изображений.

## ✨ Особенности

- **🌍Официально + поддержка двойного источника внутреннего зеркала**
  - Официальный источник GitHub
  - Внутренние ускоренные образы (fgit, ghproxy, cnpmjs, fastgit)
  
- **⚡ Высокоскоростной доступ**
  - Используйте глобальное ускорение CDN Cloudflare.
  - Автоматическое переключение при сбое, автоматическое переключение в случае сбоя источника зеркала.
  
- **🔄 Гибкие правила маршрутизации**
  — `/gh/*` → github.com
  - `/raw/*` → raw.githubusercontent.com
  — `/api/*` → api.github.com
  - `/dl/*` → codeload.github.com (скачать)
  
- **🔒 Безопасно и надежно**
  - Проверка хоста в белом списке
  - Автоматическая очистка чувствительных заголовков
  - Междоменная поддержка CORS
  
- **📦 Работает «из коробки»**
  - Не требуется сложной настройки
  - Развертывание в один клик для рабочих Cloudflare.
  -Поддержка пользовательского зеркального источника

---

## 🚀 Быстрый старт

### Предварительные условия

- Аккаунт Cloudflare (достаточно бесплатного аккаунта)
- Git-среда
— Node.js 14+ с npm

### Установка и развертывание

``` баш
#1. Клонировать проект
git-клон https://github.com/stavejobs/gh-proxy-for-me.git
компакт-диск gh-прокси-для меня

# 2. Установите зависимости
установка npm

# 3. Войдите в Cloudflare.
вход в Wrangler

# 4. Развертывание в рабочих средах Cloudflare
Wrangler опубликовать
```

---

## 📖 Пример использования

### Базовое использование

| Особенности | Исходный URL | URL-адрес прокси |
|------|---------|---------|
| Посетите GitHub | `https://github.com/stavejobs/repo` | `https://your-worker.dev/gh/stavejobs/repo` |
| Получить исходный файл | `https://raw.githubusercontent.com/stavejobs/repo/main/file.md` | `https://your-worker.dev/raw/stavejobs/repo/main/file.md` |
| API вызова | `https://api.github.com/users/stavejobs` | `https://your-worker.dev/api/users/stavejobs` |
| Скачать проект | `https://codeload.github.com/stavejobs/repo/zipball/main` | `https://your-worker.dev/dl/stavejobs/repo/zipball/main` |

### Реальный случай

**Скачать файлы проекта:**
``` баш
wget https://your-proxy.dev/raw/stavejobs/gh-proxy-for-me/main/worker.js
```

**Вызов API GitHub:**
``` баш
локон https://your-proxy.dev/api/users/stavejobs
локон https://your-proxy.dev/api/repos/stavejobs/gh-proxy-for-me
```

**Прямой доступ из браузера:**
```
https://your-proxy.dev/gh/stavejobs/gh-proxy-for-me/issues
```