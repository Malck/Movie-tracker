const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const REVALIDATE = 3600;

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR`,
    { next: { revalidate: REVALIDATE } }
  );
  if (!response.ok) throw new Error('Failed to fetch trending movies');
  const data = await response.json();
  return data.results;
}

export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=fr-FR`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) throw new Error('Failed to search movies');
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: string) {
  // On ajoute credits et similar dans append_to_response
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR&append_to_response=videos,credits,similar`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!response.ok) {
    console.error("Erreur API TMDb:", response.status, response.statusText);
    throw new Error(`Échec de la récupération des détails du film : ${response.statusText}`);
  }
  return await response.json();
}

export async function getTopRatedMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=fr-FR`,
    { next: { revalidate: REVALIDATE } }
  );
  if (!response.ok) throw new Error('Failed to fetch top rated movies');
  const data = await response.json();
  return data.results;
}

export async function getNowPlayingMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR`,
    { next: { revalidate: REVALIDATE } }
  );
  if (!response.ok) throw new Error('Failed to fetch now playing movies');
  const data = await response.json();
  return data.results;
}