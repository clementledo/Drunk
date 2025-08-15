# Mon Application Mobile

Une application mobile moderne développée avec React Native, Redux Toolkit et une architecture modulaire.

## 🏗️ Architecture

### Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants UI génériques
│   └── specific/       # Composants spécifiques aux fonctionnalités
├── screens/            # Écrans de l'application
│   ├── auth/          # Écrans d'authentification
│   └── main/          # Écrans principaux
├── navigation/         # Configuration de navigation
├── store/             # Gestion d'état avec Redux
│   └── slices/        # Redux slices
├── services/          # Services API et logique métier
│   └── api/          # Clients API
├── utils/             # Fonctions utilitaires
├── constants/         # Constantes et thème
└── hooks/             # Hooks personnalisés
```

### Technologies utilisées

- **React Native** - Framework de développement mobile
- **React Navigation** - Navigation entre écrans
- **Redux Toolkit** - Gestion d'état moderne
- **Redux Persist** - Persistance de l'état
- **Axios** - Client HTTP pour les API
- **React Native Vector Icons** - Icônes
- **AsyncStorage** - Stockage local
- **Jest** - Tests unitaires

## 🚀 Installation et démarrage

### Prérequis

- Node.js (≥ 18)
- npm ou yarn
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS, macOS uniquement)

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd mobile-app

# Installer les dépendances
npm install

# Pour iOS uniquement
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

### Gestion d'état (Redux)

L'application utilise Redux Toolkit avec trois slices principaux :

- **authSlice** : Authentification et données utilisateur
- **userSlice** : Profil utilisateur et préférences
- **appSlice** : État global de l'application

### Navigation

Structure de navigation hiérarchique :
- **Auth Stack** : Connexion/Inscription
- **Main Tab Navigator** : Navigation principale avec onglets
  - Home
  - Profile
  - Settings

### Services API

Architecture client API avec :
- Intercepteurs pour l'authentification
- Gestion automatique du refresh token
- Gestion centralisée des erreurs

### Composants réutilisables

- **Button** : Bouton personnalisable avec variantes
- **Input** : Champ de saisie avec validation
- **LoadingScreen** : Écran de chargement

## 📱 Fonctionnalités

### Authentification
- Connexion/Déconnexion
- Inscription
- Gestion des tokens
- Mot de passe oublié

### Interface utilisateur
- Design system cohérent
- Mode sombre/clair
- Composants accessibles
- Animations fluides

### Données
- Stockage local avec AsyncStorage
- Synchronisation avec API
- Cache intelligent
- Mode hors ligne

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Coverage des tests
npm run test:coverage
```

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
API_BASE_URL=https://your-api-endpoint.com/api
ENVIRONMENT=development
```

### Thème et styles

Le système de design est centralisé dans `src/constants/theme.js` :

- Couleurs
- Typographie
- Espacements
- Ombres
- Animations

## 📦 Build et déploiement

### Android

```bash
# Build de développement
npm run build:android

# Build de production
cd android
./gradlew assembleRelease
```

### iOS

```bash
# Build de développement
npm run build:ios

# Pour la production, utiliser Xcode
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commiter les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

Pour obtenir de l'aide :
- Consulter la documentation
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

Développé avec ❤️ par [Votre Nom]
