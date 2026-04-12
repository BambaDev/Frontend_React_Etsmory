# EtSmory Mobile App

Application mobile Flutter pour EtSmory - Supermarché en ligne Côte d'Ivoire

## Description

Cette application mobile Flutter présente une interface moderne et intuitive pour le supermarché en ligne EtSmory (MarchéCI). L'app inclut :

- 🛒 Catalogue de produits complet (poissons, viandes, fruits, légumes, épicerie)
- 🔥 Offres flash avec compte à rebours
- 🛍️ Panier d'achat et liste de souhaits
- 📱 Interface responsive adaptée mobile et web
- 🎨 Design moderne avec Material Design 3
- 🌐 Support multilingue (Français)

## Fonctionnalités

### Catalogue Produits
- Navigation par catégories
- Produits populaires et offres spéciales
- Recherche et filtrage
- Détails produits avec images

### Panier & Achats
- Ajout/suppression de produits
- Gestion des quantités
- Calcul automatique du total
- Indicateur de panier en temps réel

### Interface Utilisateur
- Slider hero avec promotions
- Grille responsive de produits
- Barre de navigation intuitive
- Bouton WhatsApp flottant

## Technologies Utilisées

- **Flutter** - Framework UI cross-platform
- **Dart** - Langage de programmation
- **Google Fonts** - Typographie Inter
- **Material Design 3** - Design system

## Installation

1. Assurez-vous d'avoir Flutter installé :
   ```bash
   flutter --version
   ```

2. Clonez le repository et naviguez vers le dossier :
   ```bash
   cd etsmory_app
   ```

3. Installez les dépendances :
   ```bash
   flutter pub get
   ```

4. Lancez l'application :
   ```bash
   flutter run
   ```

## Structure du Projet

```
etsmory_app/
├── lib/
│   └── main.dart          # Point d'entrée de l'application
├── pubspec.yaml           # Configuration des dépendances
├── analysis_options.yaml  # Configuration de l'analyseur
└── README.md             # Documentation
```

## Dépendances

- `flutter` - SDK Flutter
- `cupertino_icons` - Icônes iOS
- `google_fonts` - Polices Google Fonts

## Développement

### Commandes Utiles

```bash
# Vérifier la configuration Flutter
flutter doctor

# Formater le code
flutter format lib/

# Analyser le code
flutter analyze

# Lancer les tests
flutter test

# Construire pour production
flutter build apk
flutter build ios
```

### Architecture

L'application suit une architecture simple et modulaire :
- **Widgets Stateful** pour la gestion d'état
- **Modèles de données** (Product, CartItem)
- **Composants réutilisables** pour l'interface
- **Gestion d'état locale** avec setState

## Fonctionnalités à Implémenter

- [ ] Authentification utilisateur
- [ ] Base de données locale (SQLite)
- [ ] API backend pour les données
- [ ] Notifications push
- [ ] Géolocalisation pour la livraison
- [ ] Intégration paiement mobile (Orange Money, MTN Mobile Money)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

**EtSmory** - Supermarché en ligne Côte d'Ivoire
- Site web: [etsmory.com](https://etsmory.com)
- Email: contact@etsmory.com
- WhatsApp: +225 XX XX XX XX

---

*Fait avec ❤️ en Côte d'Ivoire*