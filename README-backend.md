# AGSAVN CSA Backend

Backend Django API pour la plateforme AGSAVN CSA (Analyse Globale de la Sécurité Alimentaire et de la Vulnérabilité Nutritionnelle).

## Description

Le backend AGSAVN CSA est une API REST sécurisée construite avec Django et Django REST Framework qui fournit:

- Authentification et autorisation
- Gestion des indicateurs par catégorie
- Suivi des mesures par région
- Génération et gestion des alertes
- Tableaux de bord statistiques

## Technologies

- Python 3.12
- Django 5.0
- Django REST Framework
- PostgreSQL
- Simple JWT (authentification par token)
- Docker & Docker Compose
- Swagger/OpenAPI (documentation API)

## Structure du projet

```
agsavn_backend/
├── agsavn_backend/       # Configuration du projet
├── core/                 # Application principale
│   ├── api/              # Endpoints API REST
│   │   ├── serializers/  # Sérialiseurs pour l'API
│   │   └── views/        # Vues API
│   ├── management/       # Commandes de gestion Django
│   │   └── commands/
│   └── models/           # Modèles de données
├── requirements.txt      # Dépendances Python
├── Dockerfile            # Configuration Docker
└── docker-compose.yml    # Configuration Docker Compose
```

## Modèles de données

- **User**: Utilisateurs avec rôles (ADMIN, USER)
- **Region**: Régions géographiques
- **Category**: Catégories d'indicateurs (7 types prédéfinis)
- **Indicator**: Indicateurs avec seuils d'alerte
- **Measurement**: Mesures des indicateurs par région
- **Alert**: Alertes générées automatiquement
- **AlertAction**: Actions sur les alertes (approuver, rejeter, résoudre)
- **ActivityLog**: Journal d'activité des utilisateurs
- **SystemLog**: Journal de l'état du système

## Installation et démarrage

### Prérequis

- Docker et Docker Compose

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes:

```
# Django settings
DEBUG=True
SECRET_KEY=your-super-secret-key-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1

# Database settings
DB_ENGINE=django.db.backends.postgresql
DB_NAME=agsavn
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Admin user
ADMIN_EMAIL=admin@agsavn.org
ADMIN_PASSWORD=admin123

# JWT settings
ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7

# CORS settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Démarrage avec Docker

```bash
# Construire et démarrer les conteneurs
docker-compose up --build

# Exécuter en arrière-plan
docker-compose up -d
```

L'API sera accessible à l'adresse: http://localhost:8000/api/
La documentation Swagger sera disponible à: http://localhost:8000/api/docs/

## Endpoints API principaux

### Authentification
- `POST /api/signup/` - Créer un compte
- `POST /api/login/` - Connexion (obtenir un token)
- `POST /api/token/refresh/` - Rafraîchir un token

### Données
- `GET /api/categories/` - Liste des catégories
- `GET /api/indicators/` - Liste des indicateurs
- `GET /api/regions/` - Liste des régions
- `POST /api/measurements/` - Ajouter une mesure
- `GET /api/alerts/` - Liste des alertes
- `PATCH /api/alerts/{id}/` - Mettre à jour une alerte

### Statistiques
- `GET /api/stats/indicators-summary/` - Résumé des indicateurs
- `GET /api/stats/alerts-summary/` - Résumé des alertes
- `GET /api/stats/indicators-trends/` - Tendances des indicateurs

## Développement

### Commandes utiles

```bash
# Accéder au shell Django
docker-compose exec web python manage.py shell

# Créer des migrations
docker-compose exec web python manage.py makemigrations

# Appliquer les migrations
docker-compose exec web python manage.py migrate

# Créer un superutilisateur
docker-compose exec web python manage.py createsuperuser

# Initialiser les catégories
docker-compose exec web python manage.py init_categories
```

## Permissions

- **Authentification obligatoire** pour la plupart des endpoints
- **Utilisateurs** (USER): lecture seule pour les catégories, indicateurs, mesures et alertes
- **Administrateurs** (ADMIN): droits complets sur toutes les ressources

## License

Tous droits réservés 