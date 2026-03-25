// src/models/Movie.ts
import mongoose from 'mongoose';
import './User';

const MovieSchema = new mongoose.Schema({
  // L'identifiant de l'utilisateur qui a sauvegardé ce film.
  // C'est le lien entre un film et un utilisateur.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Fait référence au modèle 'User' que nous avons créé
    required: true,
  },
  // L'identifiant du film venant de l'API TMDb
  tmdbId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  // Le statut du film dans la watchlist de l'utilisateur
  status: {
    type: String,
    enum: ['À voir', 'Vu'], // Le statut ne peut être que l'une de ces deux valeurs
    default: 'À voir',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);