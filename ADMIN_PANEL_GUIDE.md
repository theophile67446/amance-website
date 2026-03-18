# 🔐 Panel d'Administration - AMANCE

## 📍 Accès au Panel Admin

### **En développement local:**
```
http://localhost:5173/admin
```

### **En production (après Vercel):**
```
https://amance-website.vercel.app/admin
```

---

## 🔑 Authentification

### Prerequis:
✅ Vous devez avoir une compte avec le rôle **`admin`**

### Comment obtenir le rôle admin ?

**Option 1: Développement (Mise en Favoris Manuellement)**
```typescript
// Dans votre base de données MySQL, exécutez:
UPDATE users SET role = 'admin' WHERE email = 'votre-email@example.com';
```

**Option 2: Via OAuth (En production)**
- Contactez l'équipe AMANCE pour être promu admin
- Vous recevrez un lien de connexion OAuth
- Après première connexion, le rôle admin sera assigné

---

## 📝 Fonctionnalités du Panel Admin

### **1️⃣ Créer un Article**

1. Allez sur le panel: `http://localhost:5173/admin`
2. Cliquez sur l'onglet **"Articles"**
3. Remplissez le formulaire:
   - **Titre** *: "Ma première actualité"*
   - **Slug** *: "premiere-actualite"* (URL-friendly, pas d'espaces)
   - **Catégorie**: Choisissez parmi:
     - Actualités
     - Terrain  
     - Rapport
     - Communiqué
   - **Résumé**: Courte description
   - **Contenu** *: Le texte complet de l'article*
   - **Image (URL)**: Lien vers votre image
4. Cliquez sur **"Créer Article"** ✓

L'article**s'affichera immédiatement** sur `/actualites` !

### **2️⃣ Créer un Projet**

1. Cliquez sur l'onglet **"Projets"**
2. Remplissez le formulaire:
   - **Titre** *: "Reboisement 2026"*
   - **Slug** *: "reboisement-2026"*
   - **Catégorie**: Choisissez parmi:
     - Humanitaire
     - Santé
     - Communautaire
     - Conservation
   - **Description** *: Description courte du projet*
   - **Localisation**: "Région du Sud-Ouest"
3. Cliquez sur **"Créer Projet"** ✓

Le projet **s'affichera immédiatement** sur `/projets` !

### **3️⃣ Supprimer un Article/Projet**

- Dans la liste, cliquez sur l'icône **🗑️ (Poubelle)**
- L'article/projet sera **supprimé immédiatement**

---

## 🚀 Workflow Typique

### **Avant la migration:**
```
1. Voir le panel vide
   ↓
2. Pousser le script de migration
   ↓
3. Exécuter: pnpm db:migrate-data
   ↓
4. Voir 6 articles + 6 projets chargés
```

### **Après la migration:**
```
1. Accéder au panel admin
   ↓
2. Voir vos 12 contenus existants
   ↓
3. Créer de nouveaux articles/projets
   ↓
4. Les voir immédiatement sur le site
```

---

## 🎯 Gestion du Contenu

### **Articles - Cycle de Vie**

```
┌─────────────────────────────┐
│   Créer via formulaire      │
│   (stocké en brouillon)     │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│   Visible dans la liste     │
│   et sur le site            │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│  Utilisateur peut lire      │
│  et partager le lien        │
└─────────────────────────────┘
```

### **Projets - Même chose**

Tous les projets sont **publics par défaut** une fois créés.

---

## 💡 Conseils Pratiques

### ✅ Bonnes pratiques:

1. **Slug (très important)**
   - ✅ Bon: `reboisement-buea`, `aide-alimentaire`
   - ❌ Mauvais: `Reboisement Buea`, `aide alimentaire 2025`
   - 📌 Doit être: minuscule, avec tirets, pas d'espaces

2. **Catégories**
   - Articles: Actualités, Terrain, Rapport, Communiqué
   - Projets: Humanitaire, Santé, Communautaire, Conservation

3. **Images**
   - Utilisez des URLs complètes (https://...)
   - Les images Unsplash fonctionnent bien:
     ```
     https://images.unsplash.com/photo-XXXXX?w=1920&q=80
     ```

4. **Contenu**
   - Gardez les articles < 2000 caractères
   - Utilisez des sauts de ligne pour la lisibilité
   - Les URLs se convertissent automatiquement

---

## 🔍 Vérification

### **Vérifier que l'admin fonctionne:**

```bash
# 1. Démarrer en dev
pnpm dev

# 2. Aller sur http://localhost:5173/admin

# 3. Vous devriez voir:
# - Formulaire pour créer un article
# - Liste de vos articles
# - Formulaire pour créer un projet
# - Liste de vos projets
```

### **Si erreur d'authentification:**
```
❌ "Accès refusé. Seuls les administrateurs peuvent accéder à cette page."

✓ Solution: Mettre à jour votre rôle dans la BDD
UPDATE users SET role = 'admin' WHERE email = 'votre-email';
```

---

## 📊 Base de Données

### **Tables concernées:**

```sql
-- Voir tous les articles publiés
SELECT * FROM articles WHERE published = 1;

-- Voir tous les projets
SELECT * FROM projects;

-- Voir tous les utilisateurs et leurs rôles
SELECT id, email, role FROM users;
```

---

## 🚨 Problèmes Courants

### **Q: Le formulaire dit "Erreur lors de la création"**
**R:** Vérifiez que:
- ✓ Vous êtes connecté
- ✓ Vous avez le rôle `admin`
- ✓ Le slug est unique
- ✓ Les champs obligatoires sont remplis

### **Q: L'article n'apparaît pas sur le site**
**R:** 
- Attendez quelques secondes (cache React Query)
- Actualisez la page
- Vérifiez les appels API dans l'onglet Network du navigateur

### **Q: Comment éditer un article créé ?**
**R:** Pour le moment, utilisez l'Admin pour supprimer et recréer. Édition en cours de développement.

### **Q: Peut-on donner accès admin à quelqu'un d'autre ?**
**R:** Dans la base de données:
```sql
UPDATE users SET role = 'admin' WHERE email = 'autre-admin@example.com';
```

---

## 📞 Support

- 🐛 Bug? Voir les logs: Ouvrez la console du navigateur (F12)
- 💬 Questions? Consultez DYNAMIC_CMS_SETUP.md
- 🔧 Configuration? Consultez MIGRATION_GUIDE.md

---

**Dernier update:** 18 March 2026
**Version Panel Admin:** v1.0
