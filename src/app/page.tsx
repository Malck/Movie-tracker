import type { Metadata } from "next";
import styles from './HomePage.module.css';
import MovieRow from '@/components/MovieRow';
import { getTrendingMovies, getTopRatedMovies, getNowPlayingMovies } from '@/lib/tmdb';

export const metadata: Metadata = {
  title: "Accueil",
  description: "Découvrez les films du moment, les mieux notés et les nouveautés au cinéma.",
};

export default function HomePage() {
  return (
    <main className={styles.container}>
      <MovieRow title="🔥 Films du moment" fetcher={getTrendingMovies} />
      <MovieRow title="⭐ Les mieux notés" fetcher={getTopRatedMovies} />
      <MovieRow title="🎬 Nouveautés au cinéma" fetcher={getNowPlayingMovies} />
    </main>
  );
}