# Yombal Yoon - Plateforme de Mobilité et Livraison

Plateforme complète de covoiturage, envoi de colis et livraisons rapides au Sénégal.

## Structure du Projet

### Pages Publiques
- **Landing (/)** - Page d'accueil avec présentation des services
- **/pricing** - Tarifs et plans d'abonnement
- **/about** - À propos de Yombal Yoon
- **/contact** - Formulaire de contact

### Pages d'Authentification
- **/login** - Connexion utilisateur
- **/signup** - Inscription utilisateur

### Pages Protégées (/app)
- **/app** - Dashboard avec statistiques et activités récentes
- **/app/profile** - Profil utilisateur
- **/app/settings** - Paramètres de compte

## Technologies

- **Framework**: Expo (React Native + Web)
- **Routing**: Expo Router
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Langage**: TypeScript
- **Icons**: Lucide React Native

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Voir `.env.example` pour un modèle complet.

### Google Maps API

La clé API Google Maps est configurée dans `app.json` sous `extra.GOOGLE_MAPS_API_KEY`.

## Installation

```bash
npm install
```

## Développement

```bash
# Web
npm run web

# iOS
npm run ios

# Android
npm run android
```

## Base de Données

### Tables

- **profiles** - Profils utilisateurs
  - Créé automatiquement lors de l'inscription
  - Contient : nom, téléphone, localisation, avatar

- **rides** - Trajets de covoiturage
  - Point de départ, destination, heure, places disponibles, prix

- **packages** - Colis à envoyer
  - Expéditeur, destinataire, localisation, description, poids, prix

- **deliveries** - Livraisons express
  - Expéditeur, livreur, localisation, description, prix

### Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Les utilisateurs peuvent :
  - Créer leurs propres annonces
  - Voir toutes les annonces actives
  - Modifier/supprimer uniquement leurs annonces

## Architecture

```
app/
├── _layout.tsx           # Root layout avec AuthProvider
├── +html.tsx             # HTML personnalisé pour le web (SEO)
├── +not-found.tsx        # Page 404
├── index.tsx             # Landing page
├── pricing.tsx           # Page tarifs
├── about.tsx             # Page à propos
├── contact.tsx           # Page contact
├── login.tsx             # Page connexion
├── signup.tsx            # Page inscription
└── (app)/                # Routes protégées
    ├── _layout.tsx       # Layout avec tabs
    ├── index.tsx         # Dashboard
    ├── profile.tsx       # Profil
    └── settings.tsx      # Paramètres

components/
├── PublicHeader.tsx      # Header pour pages publiques
└── Footer.tsx            # Footer global

contexts/
└── AuthContext.tsx       # Gestion de l'authentification

lib/
└── supabase.ts          # Client Supabase

hooks/
└── useFrameworkReady.tsx # Hook requis pour Expo
```

## Protection des Routes

Les routes dans `(app)/` sont automatiquement protégées :
- Redirection vers `/login` si non connecté
- Vérification de la session via Supabase Auth

## SEO (Web)

Le fichier `app/+html.tsx` contient :
- Meta tags (description, keywords)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Favicon et theme color

## Support

Pour toute question, contactez contact@yombalyoon.com

## Licence

© 2026 Yombal Yoon. Tous droits réservés.
