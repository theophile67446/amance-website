# AMANCE Website - TODO

## Design Système
- [x] Palette de couleurs (vert principal, bleu profond, blanc)
- [x] Typographie (Montserrat/Lato titres, Open Sans corps)
- [x] CSS global et variables
- [x] Upload logo officiel AMANCE

## Base de Données
- [x] Table articles (blog/actualités)
- [x] Table projets
- [x] Table contacts (formulaire contact)
- [x] Table bénévoles/partenaires (formulaire inscription)

## Composants Partagés
- [x] Navbar institutionnelle (logo gauche, menu droite, bouton don)
- [x] Footer complet avec liens et réseaux sociaux
- [x] Layout principal avec Navbar + Footer
- [x] Boutons CTA stylisés

## Pages
- [x] Page d'accueil (7 sections)
  - [x] Section Hero avec CTA donation
  - [x] Section Domaines d'intervention (4 cartes)
  - [x] Section Impact en chiffres (compteurs animés)
  - [x] Section Projet phare
  - [x] Section Moyens d'aider (3 cartes)
  - [x] Section Actualités
  - [x] Section Témoignage
- [x] Page À Propos
  - [x] Mission & Vision
  - [x] Histoire
  - [x] Équipe (board members)
  - [x] Partenaires
  - [x] Transparence/Rapports annuels
- [x] Page Nos Actions (4 domaines)
- [x] Page Projets
- [x] Page Blog/Actualités
- [x] Page Contact
- [x] Page S'impliquer (bénévoles/partenaires)
- [x] Page Faire un Don
- [x] Page Transparence (documents officiels)

## Fonctionnalités
- [x] Formulaire de contact avec validation (tRPC + Zod)
- [x] Formulaire inscription bénévoles/partenaires
- [x] Navigation responsive mobile-first
- [x] Animations et micro-interactions (compteurs, hover)
- [x] SEO (meta tags, titres dans index.html)

## Backend (tRPC)
- [x] Procedures articles (list, getById)
- [x] Procedures projets (list, getById)
- [x] Procedure contact (submit)
- [x] Procedure inscription (submit)
- [x] Notifications admin (nouvelles soumissions via notifyOwner)

## Tests
- [x] Tests vitest auth.logout
- [x] Tests vitest contact.submit
- [x] Tests vitest registration.submit

## À faire (futures évolutions)
- [ ] Page Article individuel (détail blog)
- [ ] Espace admin (gestion articles/projets)
- [ ] Intégration paiement en ligne (donation)
- [ ] Galerie photos terrain
- [ ] Carte interactive des interventions
