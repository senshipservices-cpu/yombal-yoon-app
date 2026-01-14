# Guide de Déploiement - Yombal Yoon

## Configuration de la Base de Données

### Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)

2. Les migrations ont déjà été appliquées :
   - `create_profiles_table` - Table des profils utilisateurs
   - `create_rides_and_deliveries_tables` - Tables pour trajets, colis et livraisons

3. Récupérez vos clés dans Settings > API :
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

4. Ajoutez-les dans votre fichier `.env`

### Authentification

L'authentification Supabase est configurée avec :
- Email/Password (par défaut)
- Confirmation email désactivée
- Auto-création du profil utilisateur

## Déploiement Web

### Option 1: Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configuration des variables d'environnement
vercel env add EXPO_PUBLIC_SUPABASE_URL
vercel env add EXPO_PUBLIC_SUPABASE_ANON_KEY
```

### Option 2: Netlify

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Build
npx expo export:web

# Déployer
netlify deploy --dir=dist --prod
```

### Option 3: Build statique

```bash
# Export statique
npx expo export:web

# Le résultat est dans le dossier 'dist/'
# Uploadez sur votre hébergement (Nginx, Apache, etc.)
```

## Déploiement Mobile

### iOS (Apple App Store)

1. Configurez EAS Build :
```bash
npm install -g eas-cli
eas login
eas build:configure
```

2. Build iOS :
```bash
eas build --platform ios
```

3. Submit à l'App Store :
```bash
eas submit --platform ios
```

### Android (Google Play Store)

1. Build Android :
```bash
eas build --platform android
```

2. Submit à Google Play :
```bash
eas submit --platform android
```

## Variables d'Environnement

### Production

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
```

### Development

```env
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_local_key
```

## SEO et Performance

### Web

- Meta tags configurés dans `app/+html.tsx`
- Open Graph pour les réseaux sociaux
- Twitter Cards
- Favicon et theme color

### Recommandations

1. **Images** : Optimisez toutes les images (WebP, compression)
2. **Analytics** : Ajoutez Google Analytics ou Plausible
3. **Monitoring** : Configurez Sentry pour le suivi des erreurs
4. **CDN** : Utilisez un CDN pour les assets statiques

## Sécurité

### Checklist Avant Production

- [ ] RLS activé sur toutes les tables Supabase
- [ ] Variables d'environnement sécurisées
- [ ] HTTPS activé (obligatoire)
- [ ] Rate limiting configuré
- [ ] Validation des inputs côté serveur
- [ ] CORS correctement configuré
- [ ] Clés API Google Maps restreintes par domaine

## Monitoring

### Supabase Dashboard

Surveillez :
- Nombre d'utilisateurs actifs
- Requêtes API
- Utilisation du stockage
- Erreurs d'authentification

### Expo Analytics

```bash
# Voir les stats d'utilisation
expo analytics
```

## Support et Maintenance

### Logs

- **Supabase** : Dashboard > Logs
- **Expo** : expo-cli logs
- **Sentry** : Pour les erreurs en production

### Mises à jour OTA (Over-The-Air)

```bash
# Publier une mise à jour
eas update --branch production --message "Fix bug xyz"
```

## Scaling

### Base de Données

- Surveillez les performances des requêtes
- Ajoutez des indexes si nécessaire
- Considérez le plan Supabase Pro pour plus de capacité

### API

- Implémentez le caching (Redis)
- Utilisez Edge Functions pour les opérations lourdes
- Rate limiting par utilisateur

## Backup

### Supabase

1. Activez les backups automatiques dans Settings
2. Fréquence recommandée : quotidienne
3. Testez la restauration régulièrement

### Code

1. Repository Git (GitHub, GitLab)
2. Tags pour chaque version
3. Branches : main, develop, feature/*

## Troubleshooting

### Erreurs courantes

**Auth error: session not found**
- Vérifiez que les clés Supabase sont correctes
- Videz le cache navigateur/app

**Build failed**
- Vérifiez les dépendances : `npm install`
- Nettoyez le cache : `npx expo start -c`

**RLS policy error**
- Vérifiez les policies dans Supabase Dashboard
- Testez avec SQL Editor

## Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation Supabase](https://supabase.com/docs)
- [Expo Router](https://expo.github.io/router/)
- [React Native](https://reactnative.dev/)
