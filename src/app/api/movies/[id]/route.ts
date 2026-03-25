import { NextResponse } from 'next/server';
import { getMovieDetails } from '@/lib/tmdb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(id);
    return NextResponse.json(movie);
  } catch {
    return NextResponse.json({ message: 'Film introuvable.' }, { status: 404 });
  }
}