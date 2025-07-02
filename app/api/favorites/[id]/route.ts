import { connectToDb } from "@/lib/mongodb";
import FavoriteModel from "@/models/FavoriteModel";
import { NextResponse } from "next/server";

// Delete Movie From Favorites
export async function DELETE(
  _req: Request,
  route: { params: { id: string } }
) {
  await connectToDb();
  const { id } = route.params;

  try {
    const favorite = await FavoriteModel.findById(id);

    if (!favorite) {
      return NextResponse.json(
        { message: "Favorite not found" },
        { status: 404 }
      );
    }

    await FavoriteModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Movie deleted from favorites", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}`, success: false },
      { status: 500 }
    );
  }
} 