# 🎬 Movie Tracker

Une application web pour découvrir, suivre et organiser les films que vous voulez voir.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)

## ✨ Fonctionnalités

- 🔍 Recherche de films en temps réel via l'API TMDB
- 🔐 Authentification par email/mot de passe ou Google OAuth
- 📋 Watchlist personnelle par utilisateur
- ✅ Statut "À voir" / "Vu" pour chaque film
- 🎬 Bande-annonce YouTube intégrée
- 🎭 Casting, genres, durée et films similaires
- 📱 Interface responsive mobile

## 🛠 Stack technique

| Technologie | Usage |
|---|---|
| Next.js 15 | Framework React fullstack |
| TypeScript | Typage statique |
| NextAuth.js | Authentification JWT + Google OAuth |
| MongoDB Atlas | Base de données cloud |
| Mongoose | ODM MongoDB |
| TMDB API | Données films |
| CSS Modules | Styles scopés |

## 🚀 Lancer le projet en local

### Prérequis
- Node.js 18+
- Compte MongoDB Atlas
- Clé API TMDB
- Identifiants Google OAuth

### Installation
```bash
git clone https://github.com/ton-username/movie-tracker-app.git
cd movie-tracker-app
npm install
```

### Variables d'environnement

Crée un fichier `.env.local` à la racine :
```env
MONGODB_URI=ta_uri_mongodb
NEXTAUTH_SECRET=une_chaine_aleatoire_longue
NEXTAUTH_URL=http://localhost:3000
TMDB_API_KEY=ta_cle_tmdb
GOOGLE_CLIENT_ID=ton_client_id_google
GOOGLE_CLIENT_SECRET=ton_secret_google
```

### Démarrer
```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet
```
src/
├── app/
│   ├── api/          # Routes API (auth, watchlist, movies)
│   ├── movie/[id]/   # Page détail film
│   ├── watchlist/    # Page watchlist
│   ├── login/        # Page connexion
│   └── register/     # Page inscription
├── components/       # Composants réutilisables
├── lib/              # Config DB, TMDB, AuthOptions
├── models/           # Modèles Mongoose (User, Movie)
└── types/            # Types TypeScript
```

## 🌐 Démo

👉 [movie-tracker-app.vercel.app](https://movie-tracker-app.vercel.app)