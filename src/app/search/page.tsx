import { searchMovies } from '@/lib/tmdb';
import Image from 'next/image';
import styles from '../HomePage.module.css';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import React, { Suspense } from 'react';
import SkeletonCard from '@/components/SkeletonCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

function SkeletonGrid() {
  return (
    <div className={styles.movieGrid}>
      {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

async function SearchResults({ query }: { query: string }) {
  const movies = await searchMovies(query);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={styles.movieGrid}>
      {movies.map((movie: Movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id} className={styles.movieCard}>
          {movie.poster_path ? (
            <Image
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className={styles.movieImage}
            />
          ) : (
            <div style={{ height: '100%', minHeight: '300px', backgroundColor: '#1a202c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'white', padding: '1rem', textAlign: 'center' }}>{movie.title}</p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

// ✅ FIX : searchParams est maintenant async (Next.js 15)
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;

  return (
    <main className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>{`Résultats pour : "${query}"`}</h1>
        <BackButton />
      </div>
      <Suspense fallback={<SkeletonGrid />}>
        <SearchResults query={query} />
      </Suspense>
    </main>
  );
}