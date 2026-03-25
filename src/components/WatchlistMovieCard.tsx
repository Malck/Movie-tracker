'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './WatchlistMovieCard.module.css';
import Toast from './Toast';

interface Movie {
  _id: string;
  tmdbId: number;
  title: string;
  posterPath: string;
  status: 'À voir' | 'Vu';
}

interface WatchlistMovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'Vu') => void;
}

export default function WatchlistMovieCard({ movie, onDelete, onStatusChange }: WatchlistMovieCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleDelete = async () => {
    await fetch('/api/watchlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie._id }),
    });
    onDelete(movie._id);
  };

  const handleMarkAsWatched = async () => {
    setLoadingStatus(true);
    await fetch('/api/watchlist', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie._id, status: 'Vu' }),
    });
    onStatusChange(movie._id, 'Vu');
    setToast({ message: `"${movie.title}" marqué comme vu !`, type: 'success' });
    setLoadingStatus(false);
  };

  return (
    <>
      <div className={styles.card}>
        <Link href={`/movie/${movie.tmdbId}`}>
          <div className={styles.imageWrapper}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              width={500}
              height={750}
              className={styles.image}
            />
            {movie.status === 'Vu' && (
              <div className={styles.watchedOverlay}>✓ VU</div>
            )}
          </div>
        </Link>

        <div className={styles.actions}>
          {movie.status === 'À voir' && (
            <button
              onClick={handleMarkAsWatched}
              disabled={loadingStatus}
              className={styles.watchedButton}
            >
              {loadingStatus ? '...' : '✓ Marquer comme vu'}
            </button>
          )}

          {confirmDelete ? (
            <div className={styles.confirmRow}>
              <span>Supprimer ?</span>
              <button onClick={handleDelete} className={styles.confirmYes}>Oui</button>
              <button onClick={() => setConfirmDelete(false)} className={styles.confirmNo}>Non</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className={styles.deleteButton}>
              Supprimer
            </button>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}