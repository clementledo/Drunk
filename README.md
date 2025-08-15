# Drunk - Application Mobile

Une application mobile React Native avec architecture Redux et navigation par onglets.

## 🏗️ Architecture

### Structure du projet

```
src/
├── components/
│   └── common/             # Composants UI réutilisables
│       ├── Button.js       # Composant bouton avec variantes
│       ├── Input.js        # Champ de saisie avec validation
│       ├── LoadingScreen.js # Écran de chargement
│       └── __tests__/      # Tests des composants
├── screens/
│   ├── HomeScreen.js       # Écran d'accueil avec statistiques
│   ├── ProfileScreen.js    # Profil utilisateur
│   ├── SettingsScreen.js   # Paramètres de l'app
│   └── auth/              # Authentification
│       ├── LoginScreen.js  # Connexion
│       └── RegisterScreen.js # Inscription
├── navigation/
│   └── AppNavigator.js     # Navigation Stack/Tab
├── store/                  # Redux Store
│   ├── store.js           # Configuration du store
│   └── slices/            # Redux Toolkit slices
│       ├── authSlice.js   # Authentification
│       ├── userSlice.js   # Profil utilisateur
│       └── appSlice.js    # État global de l'app
├── services/
│   └── api/               # Services API
│       ├── apiClient.js   # Client HTTP avec intercepteurs
│       ├── authService.js # Service d'authentification
│       └── userService.js # Service utilisateur
├── hooks/
│   ├── useAuth.js         # Hook d'authentification
│   └── useCommon.js       # Hooks utilitaires
├── utils/
│   ├── helpers.js         # Fonctions utilitaires
│   ├── storage.js         # Service de stockage
│   └── testSetup.js       # Configuration des tests
└── constants/
    └── theme.js           # Système de design
```

### Technologies utilisées

- **React Native 0.73.2** - Framework mobile cross-platform
- **React Navigation 6** - Navigation Stack et Bottom Tabs
- **Redux Toolkit 2.0** - Gestion d'état moderne
- **Redux Persist** - Persistance de l'état
- **React Native Vector Icons** - Icônes Material Design
- **Axios** - Client HTTP avec intercepteurs
- **AsyncStorage** - Stockage local persistant
- **React Native Toast Message** - Notifications toast
- **Jest** - Tests unitaires

## 🚀 Installation et démarrage

### Prérequis

- Node.js (≥ 18)
- npm
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS, macOS uniquement)

### Installation

```bash
# Cloner le projet
git clone https://github.com/clementledo/Drunk.git
cd Drunk

# Installer les dépendances
npm install

# Pour iOS uniquement (macOS)
cd ios && pod install && cd ..
```

### Démarrage

```bash
# Démarrer Metro bundler
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios
```

## 🏛️ Architecture détaillée

### Navigation

L'application utilise une navigation conditionnelle basée sur l'état d'authentification :

**Structure de navigation :**
- **Auth Stack** (non authentifié) :
  - `LoginScreen` - Connexion utilisateur
  - `RegisterScreen` - Inscription utilisateur
- **Main Tab Navigator** (authentifié) :
  - `HomeScreen` - Accueil avec statistiques et activité récente
  - `ProfileScreen` - Profil utilisateur avec paramètres
  - `SettingsScreen` - Paramètres de l'application

### Gestion d'état (Redux)

**Store Redux avec 3 slices :**

1. **authSlice** - Authentification
   - `isAuthenticated` - État de connexion
   - `token` / `refreshToken` - Tokens d'authentification
   - `user` - Données utilisateur
   - Actions : `loginStart`, `loginSuccess`, `loginFailure`, `logout`

2. **userSlice** - Profil utilisateur
   - `profile` - Données du profil
   - `preferences` - Thème, langue, notifications
   - Actions : `setUserProfile`, `setTheme`, `toggleNotifications`

3. **appSlice** - État global
   - `isLoading` - État de chargement global
   - `currentScreen` - Écran actuel
   - `modalVisible` / `toastMessage` - UI state
   - Actions : `setLoading`, `showModal`, `showToast`

### Services API

**Architecture client API :**
- **apiClient.js** - Configuration Axios avec :
  - Base URL configurable
  - Timeout de 10 secondes
  - Intercepteurs de requête/réponse
  - Gestion automatique du refresh token
  - Gestion centralisée des erreurs 401

- **authService.js** - Service d'authentification :
  - `login()` - Connexion utilisateur
  - `register()` - Inscription utilisateur
  - `logout()` - Déconnexion
  - `forgotPassword()` - Mot de passe oublié
  - `resetPassword()` - Réinitialisation

- **userService.js** - Service utilisateur :
  - `getProfile()` - Récupération du profil
  - `updateProfile()` - Mise à jour du profil
  - `uploadAvatar()` - Upload de photo de profil
  - `changePassword()` - Changement de mot de passe

### Composants réutilisables

**Button** (`src/components/common/Button.js`)
- Variantes : `primary`, `secondary`, `danger`, `success`
- Tailles : `small`, `medium`, `large`
- États : `loading`, `disabled`
- Props personnalisables : `style`, `textStyle`

**Input** (`src/components/common/Input.js`)
- Validation intégrée avec affichage d'erreurs
- Icônes gauche/droite configurables
- Support `secureTextEntry` avec toggle de visibilité
- Focus states avec animations
- Support multiline

**LoadingScreen** (`src/components/common/LoadingScreen.js`)
- Écran de chargement global
- Message personnalisable
- Utilisé par PersistGate

### Hooks personnalisés

**useAuth** (`src/hooks/useAuth.js`)
- Hook d'authentification avec Redux
- Méthodes : `login()`, `register()`, `logout()`
- État : `isAuthenticated`, `user`, `loading`, `error`

**useFormValidation** (`src/hooks/useCommon.js`)
- Validation de formulaire réactive
- Règles de validation configurables
- Gestion des états `touched` et `errors`

**useKeyboard** (`src/hooks/useCommon.js`)
- Détection de l'état du clavier
- Hauteur du clavier en temps réel

## 📱 Fonctionnalités

### Authentification
- **Connexion** - Email/mot de passe avec validation
- **Inscription** - Formulaire complet avec confirmation de mot de passe
- **Gestion des tokens** - JWT avec refresh automatique
- **Persistance** - État d'authentification sauvegardé
- **Sécurité** - Intercepteurs API et gestion des erreurs 401

### Interface utilisateur
- **Design system** - Thème centralisé avec couleurs iOS-style
- **Navigation par onglets** - Home, Profile, Settings
- **Icônes Material Design** - React Native Vector Icons
- **Toast notifications** - Messages de feedback utilisateur
- **Loading states** - Indicateurs de chargement sur les actions

### Écrans principaux

**HomeScreen**
- Salutation personnalisée avec nom utilisateur
- Statistiques avec cartes (42 éléments, 8 en cours, 34 terminés)
- Actions rapides (boutons "Nouvelle tâche", "Voir tout")
- Activité récente avec timeline
- Pull-to-refresh

**ProfileScreen**
- Photo de profil avec option d'édition
- Informations utilisateur (nom, email)
- Statistiques personnelles (156 tâches, 89 complétées, 12 jours actifs)
- Menu de paramètres avec navigation vers :
  - Modification du profil
  - Sécurité
  - Notifications
  - Confidentialité
  - Aide & Support
  - À propos
- Bouton de déconnexion

**SettingsScreen**
- **Apparence** : Mode sombre/clair, Langue (FR/EN)
- **Notifications** : Push notifications, Rappels
- **Données** : Synchronisation, Stockage (245 MB), Sauvegarde
- **Sécurité** : Authentification biométrique, Verrouillage auto
- **Support** : Centre d'aide, Signalement de bugs, Évaluation
- Informations de version

### Stockage et données
- **AsyncStorage** - Stockage local persistant
- **Redux Persist** - Sauvegarde automatique de l'état
- **Cache intelligent** - Données utilisateur en local
- **Synchronisation API** - Refresh tokens et gestion offline

## 🧪 Tests

Configuration Jest avec setup personnalisé :

```bash
# Lancer tous les tests
npm test

# Tests unitaires des composants
npm test -- --watch
```

**Configuration de test** (`jest.config.js`) :
- Preset React Native
- Setup : `src/utils/testSetup.js`
- Mocks : AsyncStorage, Vector Icons, API Client
- Coverage : 70% minimum (branches, functions, lines, statements)

**Tests existants :**
- `Button.test.js` - Tests du composant Button
  - Rendu avec titre
  - Appel de `onPress`
  - État de chargement
  - État désactivé
  - Styles des variantes

## 🔧 Configuration

### Variables d'environnement

L'application utilise une URL d'API configurée dans `src/services/api/apiClient.js` :

```javascript
const API_BASE_URL = 'https://your-api-endpoint.com/api';
```

### Système de design

Le thème est centralisé dans `src/constants/theme.js` avec :

**Couleurs :**
- Palette iOS-style (Primary: #007AFF, Success: #34C759, Danger: #FF3B30)
- Couleurs de texte (Primary: #1C1C1E, Secondary: #8E8E93)
- Arrière-plans et bordures

**Typographie :**
- Tailles : 12px à 32px
- Poids : light (300) à bold (700)

**Espacements :**
- Système d'espacement cohérent (4px à 40px)
- Rayons de bordure : 4px à 20px

**Ombres et animations :**
- 3 niveaux d'ombres (small, medium, large)
- Durées d'animation standardisées

## 📦 Build et déploiement

### Scripts disponibles

```bash
# Développement
npm start          # Démarrer Metro bundler
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run lint       # Vérifier le code avec ESLint

# Build de production
npm run build:android  # Build Android release
npm run build:ios      # Build iOS release
```

### Android

```bash
# Build de production
npm run build:android
# Équivalent à : cd android && ./gradlew assembleRelease
```

### iOS

```bash
# Build de production  
npm run build:ios
# Équivalent à : cd ios && xcodebuild -workspace MobileApp.xcworkspace -scheme MobileApp -configuration Release archive
```

## 🛠️ Outils de développement

- **Metro** - Bundler React Native
- **ESLint** - Linting avec configuration React Native
- **Prettier** - Formatage de code
- **React Native Debugger** - Debug et DevTools
- **Flipper** - Outils de debugging mobile

## 🤝 Contribution

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📱 Compatibilité

- **React Native** : 0.73.2
- **iOS** : 11.0+
- **Android** : API level 21+ (Android 5.0)
- **Node.js** : 18+

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Équipe

Développé par [@clementledo](https://github.com/clementledo)
et [@neptune2716](https://github.com/neptune2716)

---

Application mobile React Native avec architecture Redux moderne 🚀
