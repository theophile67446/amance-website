# AMANCE Website - Master TODO

## 1) Stabilite Production (Priorite immediate)
- [x] Corriger crash admin React 19 (suppression dependance findDOMNode)
- [x] Corriger erreurs API sur actualites/projets (fallbacks DB + tRPC URL)
- [x] Rendre notifications optionnelles (ne plus casser les formulaires)
- [x] Mettre en place page maintenance professionnelle
- [ ] Ajouter page erreur 500 custom
- [ ] Ajouter monitoring erreurs (logs structurels + traceId)

## 2) Admin - Fondation Pro
- [x] Connexion admin locale securisee (email + mot de passe)
- [x] Afficher "Tableau de bord" + "Deconnexion" dans la navbar pour admin connecte
- [ ] Ajouter role "editor" (lecture/ecriture limitee)
- [ ] Ajouter journal d'audit (qui a cree/modifie/supprime)
- [ ] Ajouter recherche globale dans le dashboard admin
- [ ] Ajouter pagination sur listes lourdes (articles/projets/messages/inscriptions)

## 3) Gestion Equipe avec Photo (objectif demande)

### Backend / DB
- [ ] Creer table `team_members`
  - [ ] `id`
  - [ ] `name`
  - [ ] `role`
  - [ ] `title`
  - [ ] `location`
  - [ ] `photoUrl`
  - [ ] `bio` (optionnel)
  - [ ] `sortOrder`
  - [ ] `isActive`
  - [ ] `createdAt`, `updatedAt`
- [ ] Ajouter migration Drizzle pour `team_members`
- [ ] Ajouter seed initial avec membres actuels

### API (tRPC)
- [ ] `team.list` (public, trie par `sortOrder`)
- [ ] `team.adminList` (admin)
- [ ] `team.create` (admin)
- [ ] `team.update` (admin)
- [ ] `team.delete` (admin)
- [ ] `team.reorder` (admin, drag and drop)

### Admin UI
- [ ] Ajouter onglet "Equipe" dans l'admin
- [ ] Formulaire membre:
  - [ ] Nom
  - [ ] Poste
  - [ ] Fonction/titre
  - [ ] Localisation
  - [ ] Photo (URL + upload local)
  - [ ] Bio (optionnel)
- [ ] Preview photo en direct
- [ ] Boutons: publier/masquer membre
- [ ] Reordonner membres (drag/drop)

### Front public
- [ ] Page A Propos: remplacer liste hardcodee par `team.list`
- [ ] Fallback visuel si photo manquante
- [ ] Optimiser images equipe (format webp + lazy loading)

## 4) Editeur de Contenu Moderne (React 19 compatible)
- [ ] Integrer TipTap (articles/projets)
- [ ] Toolbar propre (H1/H2, gras, listes, liens, image)
- [ ] Mode FR/EN cote a cote
- [ ] Mode preview avant publication

## 5) Workflow Editorial
- [ ] Etats: brouillon -> relecture -> publie
- [ ] Publication planifiee (date/heure)
- [ ] Duplication article/projet
- [ ] Historique version simple (dernieres 5 versions)

## 6) Media Library
- [ ] Upload image securise (taille + type)
- [ ] Compression automatique
- [ ] Galerie media reutilisable
- [ ] Suppression media non utilises

## 7) Formulaires Entrants (CRM leger)
- [ ] Pipeline messages: nouveau / en cours / traite
- [ ] Pipeline inscriptions: nouveau / contacte / actif / inactif
- [ ] Notes internes admin
- [ ] Export CSV (messages + inscriptions)

## 8) SEO & Qualite Contenu
- [ ] Slug auto avec verification unicite
- [ ] Meta title / meta description par contenu
- [ ] Canonical URL
- [ ] Sitemap.xml auto
- [ ] Robots.txt dynamique (maintenance/prod)

## 9) Securite & Conformite
- [ ] Rate limiting sur login admin
- [ ] Helmet (headers securite)
- [ ] Cookie hardening final (sameSite/lax selon domaine)
- [ ] Validation stricte upload fichiers
- [ ] Rotation periodique secrets

## 10) Roadmap de livraison conseillee

### Sprint A (2-3 jours)
- [ ] Table `team_members` + API CRUD + onglet admin equipe
- [ ] Remplacement de l'equipe hardcodee sur A Propos
- [ ] Upload/photo URL + preview

### Sprint B (2-3 jours)
- [ ] Workflow editorial + filtres + recherche admin
- [ ] Pagination listes

### Sprint C (3-4 jours)
- [ ] TipTap + media library + SEO contenu

## 11) Definition de done - Gestion Equipe
- [ ] Un admin peut creer/modifier/supprimer un membre
- [ ] Un admin peut changer la photo d'un membre
- [ ] L'ordre des membres est editable
- [ ] Les changements apparaissent instantanement sur la page A Propos
- [ ] Pas de regression sur mobile/desktop
