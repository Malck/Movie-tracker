// src/components/MovieRow.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from '../app/HomePage.module.css';
import React, { Suspense } from 'react';
import SkeletonCard from './SkeletonCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieRowProps {
  title: string;
  fetcher: () => Promise<Movie[]>;
}

// Ce composant affiche une grille de squelettes pendant le chargement
function SkeletonGrid() {
  return (
    <div className={styles.movieGrid}>
      {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

// Ce composant va chercher les vraies données
async function MovieGrid({ fetcher }: { fetcher: () => Promise<Movie[]> }) {
  const movies = await fetcher();
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id} className={styles.movieCard}>
          <Image
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className={styles.movieImage}
          />
        </Link>
      ))}
    </div>
  );
}

// Le composant principal utilise Suspense pour orchestrer le tout
export default function MovieRow({ title, fetcher }: MovieRowProps) {
  return (
    <section className="mb-8">
      <h2 className={styles.title}>{title}</h2>
      <Suspense fallback={<SkeletonGrid />}>
        <MovieGrid fetcher={fetcher} />
      </Suspense>
    </section>
  );
}