# Quick Start - Yombal Yoon

Guide rapide pour démarrer avec Yombal Yoon en 5 minutes.

## Prérequis

- Node.js 18+ installé
- npm ou yarn
- Compte Supabase (gratuit)

## Installation

### 1. Cloner et installer

```bash
git clone https://github.com/yombalyoon/yombal-yoon-app.git
cd yombal-yoon-app
npm install
```

### 2. Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Les migrations sont déjà appliquées automatiquement
3. Récupérez vos clés dans Settings > API

### 3. Variables d'environnement

Créez un fichier `.env` :

```bash
cp .env.example .env
```

Ajoutez vos clés Supabase :

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
```

### 4. Démarrer l'application

```bash
# Web
npm run web

# iOS (macOS uniquement)
npm run ios

# Android
npm run android
```

## Accès Rapide

### URLs (Web)
- **Landing**: http://localhost:8081
- **Login**: http://localhost:8081/login
- **Signup**: http://localhost:8081/signup
- **Dashboard**: http://localhost:8081/app

### Test Account

Créez un compte via `/signup` ou utilisez le SQL suivant dans Supabase :

```sql
-- Créer un utilisateur de test (à faire via Supabase Dashboard > Authentication)
-- Email: test@yombalyoon.com
-- Password: test123456
```

## Structure Rapide

```
app/
├── (public pages)        # Landing, Pricing, About, Contact
├── (auth pages)          # Login, Signup
└── (app)/                # Dashboard, Profile, Settings (protégé)

components/               # Composants réutilisables
contexts/                 # AuthContext
lib/                      # supabase.ts
```

## Commandes Utiles

```bash
# Démarrer avec cache clean
npx expo start -c

# Build web
npx expo export:web

# Check types
npx tsc --noEmit

# Update dependencies
npm update
```

## Troubleshooting

### "Cannot find module '@/...'"
```bash
# Redémarrer le serveur avec cache clean
npx expo start -c
```

### "Auth session not found"
```bash
# Vérifiez que les variables d'environnement sont correctes
cat .env
```

### "Network request failed"
```bash
# Vérifiez que Supabase est accessible
curl https://your-project.supabase.co
```

### "Build failed"
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

## Développement

### Créer une nouvelle page

1. Créer un fichier dans `app/` :
```typescript
// app/my-page.tsx
import { View, Text } from 'react-native';

export default function MyPage() {
  return (
    <View>
      <Text>Ma nouvelle page</Text>
    </View>
  );
}
```

2. Accessible via `/my-page`

### Ajouter une protection

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function ProtectedPage() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
  }, [session, loading]);

  if (!session) return null;

  return <View>...</View>;
}
```

### Requête Supabase

```typescript
import { supabase } from '@/lib/supabase';

// SELECT
const { data, error } = await supabase
  .from('rides')
  .select('*')
  .eq('status', 'active');

// INSERT
const { data, error } = await supabase
  .from('rides')
  .insert({
    driver_id: userId,
    departure: 'Dakar',
    destination: 'Thiès',
    // ...
  });

// UPDATE
const { data, error } = await supabase
  .from('rides')
  .update({ status: 'completed' })
  .eq('id', rideId);

// DELETE
const { data, error } = await supabase
  .from('rides')
  .delete()
  .eq('id', rideId);
```

## Next Steps

1. **Lire la documentation complète** :
   - [README.md](README.md) - Vue d'ensemble
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture détaillée
   - [FEATURES.md](FEATURES.md) - Fonctionnalités

2. **Explorer le code** :
   - Commencez par `app/_layout.tsx`
   - Regardez `contexts/AuthContext.tsx`
   - Testez les pages publiques et protégées

3. **Tester les fonctionnalités** :
   - Créer un compte
   - Se connecter
   - Explorer le dashboard
   - Éditer le profil

4. **Personnaliser** :
   - Couleurs dans les styles
   - Textes dans les pages
   - Ajouter des fonctionnalités

## Ressources

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Support

- Email: contact@yombalyoon.com
- GitHub Issues: [yombalyoon/yombal-yoon-app](https://github.com/yombalyoon/yombal-yoon-app/issues)

## License

© 2026 Yombal Yoon. Tous droits réservés.
