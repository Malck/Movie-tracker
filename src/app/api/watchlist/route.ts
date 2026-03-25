import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  try {
    const userId = session.user.id;
    const movies = await Movie.find({ userId: userId }).sort({ createdAt: -1 });
    return NextResponse.json(movies, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { tmdbId, title, posterPath } = await request.json();
    const userId = session.user.id;

    const existingMovie = await Movie.findOne({ userId, tmdbId });
    if (existingMovie) {
      return NextResponse.json({ message: "Ce film est déjà dans votre watchlist." }, { status: 409 });
    }

    await Movie.create({ userId, tmdbId, title, posterPath });

    return NextResponse.json({ message: "Film ajouté à la watchlist." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur côté serveur." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { movieId, status } = await request.json();
    const userId = session.user.id;

    await Movie.findOneAndUpdate(
      { _id: movieId, userId: userId },
      { status: status }
    );

    return NextResponse.json({ message: "Statut du film mis à jour." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { movieId } = await request.json();
    const userId = session.user.id;

    await Movie.findOneAndDelete({ _id: movieId, userId: userId });

    return NextResponse.json({ message: "Film supprimé de la watchlist." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 });
  }
}