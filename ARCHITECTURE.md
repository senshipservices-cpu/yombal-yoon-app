# Architecture - Yombal Yoon

## Vue d'ensemble

Yombal Yoon est une plateforme cross-platform (Web + Mobile) construite avec Expo et Supabase, permettant le covoiturage, l'envoi de colis et les livraisons rapides au Sénégal.

## Stack Technique

### Frontend
- **Expo** (v51) - Framework React Native
- **Expo Router** (v3.5) - Routing file-based
- **TypeScript** - Typage statique
- **React Native** (0.74.5) - UI Components
- **Lucide React Native** - Icons

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication
  - Row Level Security (RLS)
  - Realtime subscriptions

### Services
- **Google Maps API** - Localisation et cartes
- **Expo Notifications** - Push notifications
- **Expo Location** - Géolocalisation

## Structure des Dossiers

```
yombal-yoon-app/
├── app/                      # Routes (Expo Router)
│   ├── _layout.tsx          # Root layout + AuthProvider
│   ├── +html.tsx            # HTML custom (SEO)
│   ├── +not-found.tsx       # Page 404
│   ├── index.tsx            # Landing page
│   ├── pricing.tsx          # Tarifs
│   ├── about.tsx            # À propos
│   ├── contact.tsx          # Contact
│   ├── login.tsx            # Connexion
│   ├── signup.tsx           # Inscription
│   └── (app)/               # Routes protégées
│       ├── _layout.tsx      # Layout avec tabs
│       ├── index.tsx        # Dashboard
│       ├── profile.tsx      # Profil
│       └── settings.tsx     # Paramètres
│
├── components/              # Composants réutilisables
│   ├── PublicHeader.tsx    # Header pages publiques
│   └── Footer.tsx          # Footer global
│
├── contexts/               # React Contexts
│   └── AuthContext.tsx     # Gestion authentification
│
├── hooks/                  # Custom hooks
│   └── useFrameworkReady.tsx
│
├── lib/                    # Librairies et utils
│   └── supabase.ts        # Client Supabase
│
├── types/                  # Types TypeScript
│   └── database.ts         # Types DB
│
├── assets/                 # Images et ressources
│   ├── icon.png
│   └── splash.png
│
└── supabase/              # Migrations DB (si local)
```

## Flux d'Authentification

```
1. User → /signup
2. Supabase Auth → Create user
3. Database Trigger → Create profile
4. AuthContext → Update session
5. Router → Redirect to /(app)
```

### Protection des Routes

```typescript
// app/(app)/_layout.tsx
const { session, loading } = useAuth();

useEffect(() => {
  if (!loading && !session) {
    router.replace('/login');
  }
}, [session, loading]);
```

## Modèle de Données

### Profiles (Users)
```sql
profiles
├── id (uuid, PK, FK → auth.users)
├── full_name (text)
├── phone (text)
├── location (text)
├── avatar_url (text)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

### Rides (Covoiturage)
```sql
rides
├── id (uuid, PK)
├── driver_id (uuid, FK → profiles)
├── departure (text)
├── destination (text)
├── departure_time (timestamptz)
├── seats_available (integer)
├── price_per_seat (integer)
├── status (enum: pending, active, completed, cancelled)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

### Packages (Colis)
```sql
packages
├── id (uuid, PK)
├── sender_id (uuid, FK → profiles)
├── receiver_name (text)
├── receiver_phone (text)
├── pickup_location (text)
├── delivery_location (text)
├── description (text)
├── weight (numeric)
├── price (integer)
├── status (enum: pending, in_transit, delivered, cancelled)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

### Deliveries (Livraisons)
```sql
deliveries
├── id (uuid, PK)
├── sender_id (uuid, FK → profiles)
├── driver_id (uuid, FK → profiles)
├── pickup_location (text)
├── delivery_location (text)
├── description (text)
├── price (integer)
├── status (enum: pending, assigned, in_progress, delivered, cancelled)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

## Sécurité (RLS Policies)

### Principes
1. **Par défaut**: Aucun accès
2. **Lecture**: Tous peuvent voir les annonces actives
3. **Écriture**: Uniquement ses propres données
4. **Modification**: Uniquement ses propres données

### Example Policy
```sql
-- Les utilisateurs peuvent créer leurs propres trajets
CREATE POLICY "Drivers can create rides"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = driver_id);

-- Tout le monde peut voir les trajets actifs
CREATE POLICY "Anyone can view active rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (status IN ('pending', 'active'));
```

## Navigation

### Structure
```
Root
├── Public Pages (Header + Footer)
│   ├── / (Landing)
│   ├── /pricing
│   ├── /about
│   └── /contact
│
├── Auth Pages (Header + Footer)
│   ├── /login
│   └── /signup
│
└── App Pages (Tabs Layout)
    ├── /(app) - Dashboard
    ├── /(app)/profile
    └── /(app)/settings
```

### Mobile Navigation
- Tab Bar en bas (iOS/Android)
- 3 tabs: Dashboard, Profil, Paramètres

### Web Navigation
- Header fixe en haut
- Navigation responsive
- Menu burger sur mobile

## State Management

### Global State
- **AuthContext**: Session, User, Loading
- Pas besoin de Redux/Zustand pour le moment

### Local State
- React useState pour les formulaires
- Supabase Realtime pour les updates en temps réel

## Performance

### Optimisations
1. **Lazy Loading**: Routes chargées à la demande
2. **Memoization**: React.memo pour les composants lourds
3. **Indexes DB**: Sur les colonnes fréquemment requêtées
4. **Image Optimization**: Compression et formats modernes
5. **Code Splitting**: Expo Router automatique

### Caching
- Supabase cache les queries
- AsyncStorage pour persistence locale (mobile)
- LocalStorage pour persistence web

## Realtime

### Fonctionnalités Possibles
```typescript
// Écouter les nouveaux trajets
supabase
  .channel('rides')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'rides'
  }, payload => {
    console.log('New ride:', payload);
  })
  .subscribe();
```

## Tests

### Recommandations
1. **Unit Tests**: Jest + React Native Testing Library
2. **E2E Tests**: Detox (mobile) / Playwright (web)
3. **Integration Tests**: API endpoints

```bash
# À ajouter
npm install --save-dev @testing-library/react-native jest
```

## CI/CD

### GitHub Actions Example
```yaml
name: Build and Deploy
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
```

## Monitoring & Analytics

### Recommandations
1. **Sentry** - Error tracking
2. **Posthog** - Product analytics
3. **Supabase Analytics** - Database insights
4. **Expo Analytics** - App usage

## Évolutivité

### Phase 1 (MVP) ✅
- Authentification
- CRUD Trajets/Colis/Livraisons
- Profils utilisateurs
- Pages publiques

### Phase 2 (Futur)
- Paiements (Wave, Orange Money)
- Chat en temps réel
- Notifications push
- Système de notation
- Historique des transactions

### Phase 3 (Avancé)
- Matching automatique (AI)
- Itinéraires optimisés (Google Maps API)
- Programme de fidélité
- Admin dashboard
- Analytics avancés

## Contribution

### Workflow
1. Fork le projet
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Conventions
- **Commits**: Conventional Commits
- **Code**: ESLint + Prettier
- **Types**: TypeScript strict mode
- **Tests**: Minimum 70% coverage

## Ressources

- [Expo Docs](https://docs.expo.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
