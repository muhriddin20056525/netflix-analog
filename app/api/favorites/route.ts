import { connectToDb } from "@/lib/mongodb";
import FavoriteModel from "@/models/FavoriteModel";
import { NextResponse } from "next/server";

// Add Movie to Favorites
export async function POST(req: Request) {
  await connectToDb();

  const { accountId, movieData } = await req.json();

  if (!accountId || !movieData) {
    return NextResponse.json(
      { message: "AccountId and movieData are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the movie is already in favorites
    const existingFavorite = await FavoriteModel.findOne({
      accountId,
      movieId: movieData.id,
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: "This movie is already in favorites" },
        { status: 400 }
      );
    }

    // Get only the necessary data
    const essentialMovieData = {
      id: movieData.id,
      title: movieData.title,
      name: movieData.name,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      backdrop_path: movieData.backdrop_path,
      release_date: movieData.release_date,
      first_air_date: movieData.first_air_date,
      vote_average: movieData.vote_average,
      genre_ids: movieData.genre_ids,
      media_type: movieData.media_type,
      original_language: movieData.original_language,
      popularity: movieData.popularity,
    };

    // Create new favorite
    const newFavorite = await FavoriteModel.create({
      accountId,
      movieId: movieData.id,
      movieData: essentialMovieData,
    });

    return NextResponse.json(
      {
        message: "Movie added to favorites",
        favorite: newFavorite,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}`, success: false },
      { status: 500 }
    );
  }
}

// Get Favorites
export async function GET(req: Request) {
  await connectToDb();

  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json(
      { message: "AccountId is required" },
      { status: 400 }
    );
  }

  try {
    const favorites = await FavoriteModel.find({ accountId }).sort({
      addedAt: -1,
    });

    return NextResponse.json(
      {
        message: "Favorites retrieved",
        success: true,
        favorites,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}`, success: false },
      { status: 500 }
    );
  }
} 