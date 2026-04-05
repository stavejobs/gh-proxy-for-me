# 🚀 GitHub-Proxy für Cloudflare-Worker

Ein für Benutzer auf dem chinesischen Festland optimierter GitHub-Proxy-Dienst, der auf Cloudflare Workers bereitgestellt wird und den nahtlosen Wechsel inländischer Bildquellen unterstützt.

## ✨ Funktionen

- **🌍Offizieller + inländischer Mirror-Dual-Source-Support**
  - Offizielle GitHub-Quelle
  - Inländische beschleunigte Bilder (fgit, ghproxy, cnpmjs, fastgit)
  
- **⚡ Hochgeschwindigkeitszugang**
  - Nutzen Sie die globale CDN-Beschleunigung von Cloudflare
  - Automatisches Failover, automatische Umschaltung bei Ausfall der Spiegelquelle
  
- **🔄Flexible Routing-Regeln**
  - `/gh/*` → github.com
  - `/raw/*` → raw.githubusercontent.com
  - `/api/*` → api.github.com
  - `/dl/*` → codeload.github.com (Download)
  
- **🔒Sicher und zuverlässig**
  - Host-Überprüfung auf der Whitelist
  - Sensible Header automatisch bereinigen
  - Domänenübergreifende CORS-Unterstützung
  
- **📦 Funktioniert sofort**
  - Keine komplizierte Konfiguration erforderlich
  - Bereitstellung mit einem Klick für Cloudflare Workers
  -Unterstützung einer benutzerdefinierten Spiegelquelle

---

## 🚀 Schnellstart

### Voraussetzungen

- Cloudflare-Konto (kostenloses Konto reicht)
- Git-Umgebung
- Node.js 14+ mit npm

### Installation und Bereitstellung

„Bash
# 1. Projekt klonen
Git-Klon https://github.com/stavejobs/gh-proxy-for-me.git
cd gh-proxy-für-mich

# 2. Abhängigkeiten installieren
npm installieren

# 3. Melden Sie sich bei Cloudflare an
Wrangler-Login

# 4. Bereitstellung für Cloudflare-Mitarbeiter
Wrangler veröffentlichen
„

---

## 📖 Anwendungsbeispiel

### Grundlegende Verwendung

| Funktionen | Ursprüngliche URL | Proxy-URL |
|------|---------|---------|
| Besuchen Sie GitHub | `https://github.com/stavejobs/repo` | `https://your-worker.dev/gh/stavejobs/repo` |
| Holen Sie sich die Originaldatei | `https://raw.githubusercontent.com/stavejobs/repo/main/file.md` | `https://your-worker.dev/raw/stavejobs/repo/main/file.md` |
| Aufruf-API | `https://api.github.com/users/stavejobs` | `https://your-worker.dev/api/users/stavejobs` |
| Projekt herunterladen | `https://codeload.github.com/stavejobs/repo/zipball/main` | `https://your-worker.dev/dl/stavejobs/repo/zipball/main` |

### Tatsächlicher Fall

**Projektdateien herunterladen:**
„Bash
wget https://your-proxy.dev/raw/stavejobs/gh-proxy-for-me/main/worker.js
„

**GitHub-API aufrufen:**
„Bash
Curl https://your-proxy.dev/api/users/stavejobs
Curl https://your-proxy.dev/api/repos/stavejobs/gh-proxy-for-me
„

**Direkter Zugriff über den Browser:**
„
https://your-proxy.dev/gh/stavejobs/gh-proxy-for-me/issues
„