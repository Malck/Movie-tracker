'use client';

import { useState, useEffect } from 'react';
import styles from './watchlist.module.css';
import WatchlistMovieCard from '@/components/WatchlistMovieCard';
import Link from 'next/link';

interface Movie {
  _id: string;
  tmdbId: number;
  title: string;
  posterPath: string;
  status: 'À voir' | 'Vu';
}

type Filter = 'Tout' | 'À voir' | 'Vu';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('Tout');

  useEffect(() => {
    const fetchWatchlist = async () => {
      const res = await fetch('/api/watchlist');
      if (res.ok) {
        const data = await res.json();
        setWatchlist(data);
      }
      setLoading(false);
    };
    fetchWatchlist();
  }, []);

  const handleDeleteMovie = (id: string) => {
    setWatchlist(current => current.filter(movie => movie._id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'Vu') => {
    setWatchlist(current =>
      current.map(movie => movie._id === id ? { ...movie, status: newStatus } : movie)
    );
  };

  const filtered = watchlist.filter(movie => {
    if (filter === 'Tout') return true;
    return movie.status === filter;
  });

  const countAll = watchlist.length;
  const countToWatch = watchlist.filter(m => m.status === 'À voir').length;
  const countWatched = watchlist.filter(m => m.status === 'Vu').length;

  if (loading) {
    return (
      <main className={styles.container}>
        <p className={styles.loading}>Chargement de votre watchlist...</p>
      </main>
    );
  }

  // Empty state
  if (watchlist.length === 0) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Ma Watchlist</h1>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h2>Votre watchlist est vide</h2>
          <p>Ajoutez des films pour les retrouver ici et suivre ce que vous avez vu.</p>
          <Link href="/" className={styles.emptyButton}>
            Découvrir des films
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ma Watchlist</h1>
        <p className={styles.subtitle}>{countAll} film{countAll > 1 ? 's' : ''} · {countWatched} vu{countWatched > 1 ? 's' : ''}</p>
      </div>

      {/* Filtres */}
      <div className={styles.filters}>
        {(['Tout', 'À voir', 'Vu'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterButton} ${filter === f ? styles.filterActive : ''}`}
          >
            {f}
            <span className={styles.filterCount}>
              {f === 'Tout' ? countAll : f === 'À voir' ? countToWatch : countWatched}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.emptyFilter}>Aucun film dans cette catégorie.</p>
      ) : (
        <div className={styles.movieGrid}>
          {filtered.map((movie) => (
            <WatchlistMovieCard
              key={movie._id}
              movie={movie}
              onDelete={handleDeleteMovie}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </main>
  );
}