import type { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdb";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(id);
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined;

    return {
      title: movie.title,
      description: movie.overview?.slice(0, 160) || `Découvrez ${movie.title} sur Movie Tracker.`,
      openGraph: {
        title: movie.title,
        description: movie.overview?.slice(0, 160),
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Film",
      description: "Détails du film sur Movie Tracker.",
    };
  }
}

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}