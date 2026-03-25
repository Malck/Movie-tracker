'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './DetailPage.module.css';
import BackButton from '@/components/BackButton';
import AddToWatchlistButton from '@/components/AddToWatchlistButton';
import VideoModal from '@/components/VideoModal';
import DetailSkeleton from '@/components/DetailSkeleton';

interface Video {
  key: string;
  site: string;
  type: string;
}

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  videos: { results: Video[] };
  credits: { cast: CastMember[] };
  similar: { results: SimilarMovie[] };
}

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/movies/${resolvedParams.id}`);
        if (!response.ok) throw new Error('Échec de la récupération');
        const movieData = await response.json();
        setMovie(movieData);

        const trailer = movieData.videos?.results.find(
          (video: Video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [resolvedParams.id]);

  if (!movie) return <DetailSkeleton />;

  // Formater la durée en h et min
  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${h}h ${min}min`;
  };

  const topCast = movie.credits?.cast?.slice(0, 6) || [];
  const similarMovies = movie.similar?.results?.slice(0, 6) || [];

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.backdrop}>
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path}`}
            alt={`${movie.title} backdrop`}
            fill
            style={{ objectFit: 'cover' }}
            className={styles.backdropImage}
            priority
          />
        </div>

        <main className={styles.mainContent}>
          <div className={styles.buttonContainer}><BackButton /></div>

          <div className={styles.content}>
            {/* Poster */}
            <div className={styles.poster}>
              <Image
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className={styles.posterImage}
              />
            </div>

            {/* Infos */}
            <div className={styles.info}>
              <h1>{movie.title}</h1>

              {/* Métadonnées */}
              <div className={styles.meta}>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                {movie.runtime > 0 && <span>{formatRuntime(movie.runtime)}</span>}
                <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</span>
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className={styles.genre}>{genre.name}</span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              <h2>Synopsis</h2>
              <p>{movie.overview || 'Aucun synopsis disponible.'}</p>

              {/* Boutons */}
              <div className={styles.buttons}>
                {trailerKey && (
                  <button onClick={() => setIsModalOpen(true)} className={styles.trailerButton}>
                    ▶ Bande-annonce
                  </button>
                )}
                <AddToWatchlistButton
                  tmdbId={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                />
              </div>
            </div>
          </div>

          {/* Casting */}
          {topCast.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Casting principal</h2>
              <div className={styles.castGrid}>
                {topCast.map((member) => (
                  <div key={member.id} className={styles.castCard}>
                    {member.profile_path ? (
                      <Image
                        src={`${imageBaseUrl}${member.profile_path}`}
                        alt={member.name}
                        width={100}
                        height={150}
                        className={styles.castImage}
                      />
                    ) : (
                      <div className={styles.castPlaceholder}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <p className={styles.castName}>{member.name}</p>
                    <p className={styles.castCharacter}>{member.character}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Films similaires */}
          {similarMovies.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Films similaires</h2>
              <div className={styles.similarGrid}>
                {similarMovies.map((similar) => (
                  similar.poster_path && (
                    <Link href={`/movie/${similar.id}`} key={similar.id} className={styles.similarCard}>
                      <Image
                        src={`${imageBaseUrl}${similar.poster_path}`}
                        alt={similar.title}
                        width={200}
                        height={300}
                        className={styles.similarImage}
                      />
                    </Link>
                  )
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {isModalOpen && trailerKey && (
        <VideoModal videoKey={trailerKey} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}