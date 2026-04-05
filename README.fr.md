# 🚀 Proxy GitHub pour les travailleurs Cloudflare

Un service proxy GitHub optimisé pour les utilisateurs de Chine continentale, déployé sur Cloudflare Workers, prenant en charge la commutation transparente des sources d'images nationales.

## ✨ Caractéristiques

- **🌍Support double source officiel + miroir domestique**
  - Source officielle GitHub
  - Images accélérées domestiques (fgit, ghproxy, cnpmjs, fastgit)
  
- **⚡ Accès haut débit**
  - Tirer parti de l'accélération CDN mondiale de Cloudflare
  - Basculement automatique, commutation automatique en cas de panne de la source miroir
  
- **🔄 Règles de routage flexibles**
  - `/gh/*` → github.com
  - `/raw/*` → raw.githubusercontent.com
  - `/api/*` → api.github.com
  - `/dl/*` → codeload.github.com (télécharger)
  
- **🔒 Sûr et fiable**
  - Vérification de l'hôte de la liste blanche
  - Nettoyer automatiquement les en-têtes sensibles
  - Prise en charge inter-domaines CORS
  
- **📦 Fonctionne immédiatement**
  - Aucune configuration compliquée requise
  - Déploiement en un clic sur Cloudflare Workers
  -Supporte la source de miroir personnalisée

---

## 🚀 Démarrage rapide

### Prérequis

- Compte Cloudflare (un compte gratuit suffit)
- Environnement Git
- Node.js 14+ avec npm

### Installation et déploiement

```bash
# 1. Cloner le projet
clone git https://github.com/stavejobs/gh-proxy-for-me.git
cd gh-proxy-pour-moi

# 2. Installer les dépendances
installation npm

# 3. Connectez-vous à Cloudflare
connexion Wrangler

# 4. Déployer sur Cloudflare Workers
wrangler publier
```

---

## 📖 Exemple d'utilisation

### Utilisation de base

| Caractéristiques | URL d'origine | URL du proxy |
|------|---------|---------|
| Visitez GitHub | `https://github.com/stavejobs/repo` | `https://your-worker.dev/gh/stavejobs/repo` |
| Obtenez le fichier original | `https://raw.githubusercontent.com/stavejobs/repo/main/file.md` | `https://your-worker.dev/raw/stavejobs/repo/main/file.md` |
| Appeler l'API | `https://api.github.com/users/stavejobs` | `https://your-worker.dev/api/users/stavejobs` |
| Télécharger le projet | `https://codeload.github.com/stavejobs/repo/zipball/main` | `https://your-worker.dev/dl/stavejobs/repo/zipball/main` |

### Cas réel

**Téléchargez les fichiers du projet :**
```bash
wget https://your-proxy.dev/raw/stavejobs/gh-proxy-for-me/main/worker.js
```

**Appelez l'API GitHub :**
```bash
boucle https://your-proxy.dev/api/users/stavejobs
boucle https://your-proxy.dev/api/repos/stavejobs/gh-proxy-for-me
```

**Accès direct depuis le navigateur :**
```
https://your-proxy.dev/gh/stavejobs/gh-proxy-for-me/issues
```