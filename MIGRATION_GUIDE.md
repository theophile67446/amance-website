# 📊 Guide Complet de Migration des Données

Ce guide vous aide à migrer toutes les données hardcodées vers votre base de données MySQL.

## 📋 Sommaire

1. [Prérequis](#prérequis)
2. [Étape 1: Configuration de PlanetScale](#étape-1-configuration-de-planetscale)
3. [Étape 2: Migration des données](#étape-2-migration-des-données)
4. [Étape 3: Vérification](#étape-3-vérification)
5. [Dépannage](#dépannage)

---

## Prérequis

- ✅ Node.js 18+ et pnpm
- ✅ Un compte PlanetScale (gratuit) ou MySQL local
- ✅ Avoir exécuté les migrations de schéma : `pnpm db:push`

---

## Étape 1: Configuration de PlanetScale

### A. Créer une base de données sur PlanetScale

1. Allez sur https://app.planetscale.com
2. Cliquez sur **"Create"** pour créer une nouvelle base de données
3. Entrez le nom : `amance-website`
4. Choisissez votre région (ex: Europe - Frankfurt)
5. Cliquez sur **"Create Database"**

### B. Récupérer la chaîne de connexion

1. Une fois créée, cliquez sur votre base de données
2. Cliquez sur **"Connect"** 
3. Sélectionnez **"Node.js"** dans le dropdown
4. Copiez la chaîne de connexion (elle ressemble à :)
   ```
   mysql://[username]:[password]@[host]/amance-website
   ```

### C. Ajouter la chaîne de connexion au `.env`

Ouvrez `.env` et remplacez la ligne `DATABASE_URL`:

```
DATABASE_URL=mysql://[username]:[password]@[host]/amance-website
```

---

## Étape 2: Migration des données

### Option A: Migration automatique (Recommandé)

```bash
# Installer les dépendances
pnpm install

# Pousser le schéma
pnpm db:push

# Migrer les données
pnpm db:migrate-data
```

### Option B: Migration manuelle (Via Admin Panel)

Si vous préférez, vous pouvez utiliser le panneau Admin pour créer les articles et projets manuellement:

1. **Démarrer l'application** en développement:
   ```bash
   pnpm dev
   ```

2. **Accéder au panel Admin** (nécessite un compte admin):
   ```
   http://localhost:5173/admin
   ```

3. **Créer les articles** via le formulaire:
   - Titre: "Distribution alimentaire d'urgence..."
   - Slug: "distribution-alimentaire-nord-ouest"
   - Contenu: [Copier le contenu depuis MIGRATION_DATA.md]
   - Catégorie: "terrain"
   - Statut: Publié

4. **Créer les projets** de la même manière

---

## Étape 3: Vérification

### Vérifier les articles et projets migrés

1. **En développement** - Ouvrir l'inspecteur réseau et vérifier:
   ```bash
   # Terminal 1
   pnpm dev

   # Terminal 2 - Tester l'API
   curl http://localhost:5173/trpc/articles.list
   ```

2. **Vérifier sur PlanetScale**:
   ```bash
   # Se connecter à la base de données
   mysql -h [host] -u [username] -p[password] -D amance-website

   # Vérifier les articles
   SELECT COUNT(*) FROM articles;
   # Devrait retourner: 6

   # Vérifier les projets
   SELECT COUNT(*) FROM projects;
   # Devrait retourner: 6
   ```

3. **Vérifier sur l'interface web**:
   - Allez sur `/actualites` - Vous devez voir 6 articles
   - Allez sur `/projets` - Vous devez voir 6 projets
   - Cliquez sur un article/projet - Les détails s'affichent

---

## Données migrées

### Articles (6 articles)

| Titre | Slug | Catégorie | Publié |
|-------|------|-----------|--------|
| Distribution alimentaire d'urgence | distribution-alimentaire-nord-ouest | terrain | ✅ |
| Lancement du reboisement à Buea | reboisement-buea | terrain | ✅ |
| Formation en agroforesterie | formation-agroforesterie | terrain | ✅ |
| Journée Mondiale de l'Eau | journee-mondiale-eau | actualites | ✅ |
| Rapport d'Activités 2025 | rapport-annuel-2025 | rapport | ✅ |
| Nouveau partenariat ONG | partenariat-ong-internationale | communique | ✅ |

### Projets (6 projets)

| Titre | Slug | Catégorie | Statut | Vedette |
|-------|------|-----------|--------|---------|
| La Forêt de Demain | la-foret-de-demain | conservation | En cours | ⭐ |
| Aide Alimentaire d'Urgence | aide-alimentaire-urgence | humanitaire | En cours | |
| Santé Communautaire Rurale | sante-communautaire-rurale | sante | En cours | |
| Écoles Vertes | ecoles-vertes | conservation | En cours | ⭐ |
| Agroforesterie Durable | agroforesterie-durable | communautaire | En cours | |
| Soutien aux Enfants Vulnérables | soutien-enfants-vulnerables | humanitaire | En cours | ⭐ |

---

## Dépannage

### Erreur: "Connection refused"

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution**: Vérifiez que votre `DATABASE_URL` est correcte dans `.env`

```bash
# Vérifier la connexion
mysql -h [host] -u [user] -p[password] -D amance-website -e "SELECT 1"
```

### Erreur: "Table doesn't exist"

```
Error: Table 'amance-website.articles' doesn't exist
```

**Solution**: Pousser le schéma d'abord:

```bash
pnpm db:push
```

### Erreur: "Duplicate entry"

```
Error: Duplicate entry 'distribution-alimentaire-nord-ouest' for key 'articles.slug'
```

**Solution**: Les articles existent déjà. Pour les réinsérer:

```bash
# Option 1: Supprimer les articles existants
mysql -h [host] -u [user] -p[password] -D amance-website -e "DELETE FROM articles; DELETE FROM projects;"

# Option 2: Relancer avec pnpm db:migrate-data
pnpm db:migrate-data
```

### Les articles ne s'affichent pas

1. Vérifier que les articles sont publiés (`published = 1`)
2. Vérifier que le slug est correct
3. Vérifier la console du serveur pour les erreurs

```bash
# Vérifier les articles en base
mysql -h [host] -u [user] -p[password] -D amance-website -e "SELECT id, title, slug, published FROM articles;"
```

---

## Prochaines étapes

✅ **Après la migration:**

1. **Tester en production locale**:
   ```bash
   pnpm build
   pnpm start
   ```

2. **Déployer sur Vercel**:
   - Configurer les variables d'environnement
   - Voir VERCEL_DEPLOYMENT.md

3. **Ajouter plus de contenu**:
   - Utiliser le panel Admin pour créer des contenus
   - Les données seront automatiquement persistées en base

4. **Configurer des backups**:
   - Sur PlanetScale, configurer les backups automatiques
   - Dans les paramètres de la base de données

---

## Support

Pour plus d'aide:

- Consultez DYNAMIC_CMS_SETUP.md pour le système CMS
- Consultez VERCEL_DEPLOYMENT.md pour le déploiement
- Vérifiez les logs du serveur: `pnpm dev`
