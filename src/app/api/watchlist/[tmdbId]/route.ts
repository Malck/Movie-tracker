import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tmdbId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const { tmdbId } = await params;

  await dbConnect();
  const movie = await Movie.findOne({
    userId: session.user.id,
    tmdbId: tmdbId,
  });

  return NextResponse.json({ inWatchlist: !!movie, movieId: movie?._id });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ tmdbId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const { tmdbId } = await params;

  await dbConnect();
  await Movie.findOneAndDelete({
    userId: session.user.id,
    tmdbId: tmdbId,
  });

  return NextResponse.json({ message: "Film supprimé" }, { status: 200 });
}