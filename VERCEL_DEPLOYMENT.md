# 🚀 Guide de Déploiement sur Vercel

## Prérequis

1. Un compte **Vercel** (gratuit) : https://vercel.com
2. Votre repository GitHub connecté
3. Les variables d'environnement configurées

## 📋 Étapes de Déploiement

### 1. Poussez votre code sur GitHub

```bash
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

### 2. Accédez à Vercel Dashboard

- Allez sur https://vercel.com/dashboard
- Cliquez sur **"Add New..."** → **"Project"**
- Sélectionnez votre repository `amance-website`

### 3. Configuration du Projet

#### Paramètres de Build
- **Framework Preset** : Vite
- **Build Command** : `pnpm build` (Vercel devrait le détecter automatiquement)
- **Output Directory** : `dist/public`
- **Install Command** : `pnpm install`

#### Variables d'Environnement

Cliquez sur **"Environment Variables"** et ajoutez toutes les variables de votre fichier `.env` :

```
VITE_APP_ID=<votre_app_id>
JWT_SECRET=<votre_secret_jwt>
DATABASE_URL=<votre_database_url>
OAUTH_SERVER_URL=<votre_oauth_url>
OWNER_OPEN_ID=<votre_owner_id>
BUILT_IN_FORGE_API_URL=<votre_forge_url>
BUILT_IN_FORGE_API_KEY=<votre_forge_key>
NODE_ENV=production
```

⚠️ **Important** : Utilisez le même **JWT_SECRET** en production qu'en développement pour ne pas invalider les sessions existantes.

### 4. Déployez

Cliquez sur **"Deploy"** 

Vercel va :
1. ✅ Cloner votre repository
2. ✅ Installer les dépendances (`pnpm install`)
3. ✅ Builder le client Vite et le serveur (`pnpm build`)
4. ✅ Déployer les fichiers statiques sur le CDN
5. ✅ Créer les serverless functions pour `/api`

## 📊 Architecture de Déploiement

```
Vercel
├── Static Assets (CDN)
│   └── dist/public/ → Votre application React
├── Serverless Functions
│   ├── /api/trpc* → Vos routes tRPC
│   ├── /api/oauth* → Vos routes OAuth
│   └── Fallback → index.html (SPA routing)
└── Environment Variables
    └── Base de données, secrets, etc.
```

## 🔄 Déploiements Automatiques

Après le premier déploiement :
- Chaque `git push` sur la branche `main` déclenche un nouveau déploiement
- Vous pouvez aussi redéployer manuellement depuis le dashboard Vercel

## 🐛 Dépannage

### Les variables d'environnement ne sont pas chargées
→ Vérifiez que vous les avez ajoutées dans **Settings → Environment Variables**

### Erreur "Cannot find module"
→ Assurez-vous que le build local fonctionne : `pnpm build`

###  Problèmes de base de données
→ Vérifiez que votre `DATABASE_URL` est accessible depuis Vercel (pas d'IP whitelist restrictive)

### Les routes SPA ne fonctionnent pas
→ Le `vercel.json` redirige correctement. Videz le cache du navigateur.

## 📱 Domaine Personnalisé

1. Allez dans **Project Settings → Domains**
2. Cliquez **"Add Domain"**
3. Entrez votre domaine
4. Suivez les instructions DNS

## 🔐 Déploiements en Preview

Chaque **Pull Request** crée une Preview URL préservant votre déploiement production

## 📝 Monitoring

Vercel fournit :
- **Logs** : Consultez les logs en temps réel
- **Analytics** : Voir les performances
- **Metrics** : CPU, mémoire, durée des fonctions

Accédez aux logs via **Settings → Logs**

---

**Besoin d'aide?** Consultez la [documentation Vercel](https://vercel.com/docs)
