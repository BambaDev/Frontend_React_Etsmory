# EtSmory Mobile App - Instructions de lancement

## 🚀 Lancement rapide

### Prérequis
- Flutter SDK installé (version 3.0+)
- Dart SDK
- Android Studio / VS Code avec extensions Flutter
- Émulateur Android ou iOS, ou appareil physique

### Installation des dépendances
```bash
cd etsmory_app
flutter pub get
```

### Vérification de la configuration
```bash
flutter doctor
```

### Lancement sur émulateur/d'appareil
```bash
# Pour Android
flutter run

# Pour iOS (macOS uniquement)
flutter run --device-id=<device_id>

# Pour le web
flutter run -d chrome
```

### Construction pour production
```bash
# APK Android
flutter build apk --release

# Bundle iOS
flutter build ios --release

# Web
flutter build web --release
```

## 📱 Fonctionnalités de l'app

- Catalogue de produits avec catégories
- Slider hero avec promotions
- Offres flash avec compte à rebours
- Panier d'achat et liste de souhaits
- Interface responsive
- Design Material Design 3

## 🛠️ Développement

### Structure du code
- `lib/main.dart` : Application principale avec tous les widgets
- Modèles : Product, CartItem
- États : Gestion locale avec StatefulWidget

### Commandes de développement
```bash
# Formater le code
flutter format lib/

# Analyser le code
flutter analyze

# Tests unitaires
flutter test
```

## 📞 Support

Pour toute question concernant l'app Flutter EtSmory, contactez l'équipe de développement.