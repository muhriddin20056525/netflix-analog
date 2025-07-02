"use client";

import { useAccount } from "@/context/AccountContext";
import { IFavorite } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import { fetchMovieDetail } from "@/lib/tmdb";
import { IMovie } from "@/types";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Get Account ID From Context
  const { accountId } = useAccount() || {};
  // Save Favorites State
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  // Loading State
  const [loading, setLoading] = useState(true);
  // Movie Detail Modal State
  const [isOpenMovieDetail, setIsOpenMovieDetail] = useState(false);
  // Movie Detail State
  const [movieDetail, setMovieDetail] = useState<IMovie>();

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Get Favorites Function
  const getFavorites = async () => {
    // Check if Account ID is not null
    if (!accountId) return;

    try {
      const response = await axios.get(`/api/favorites?accountId=${accountId}`);
      if (response.data.success) {
        setFavorites(response.data.favorites);
      }
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      toast.error("There was an error loading favorites.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Movie From Favorites
  const removeFromFavorites = async (favoriteId: string) => {
    try {
      const response = await axios.delete(`/api/favorites/${favoriteId}`);
      if (response.data.success) {
        setFavorites(prev => prev.filter(fav => fav._id !== favoriteId));
        toast.success("Deleted Movie from favorites");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting.");
    }
  };

  // Showing Movie Detail
  const getMovieDetail = async (id: number) => {
    const data = await fetchMovieDetail(id);
    setMovieDetail(data);
    setIsOpenMovieDetail(true);
  };

  useEffect(() => {
    getFavorites();
  }, [accountId]);

  if (!accountId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Choosing Profile</h1>
          <p className="text-gray-400">Please Choose Profile</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
     <button
        onClick={() => router.back()}
        className="mt-3 ml-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition border-none outline-none"
      >
        Go Back
      </button>
      {/* Header */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Favorites Movies</h1>
        <p className="text-gray-400">
          {favorites.length} in the movie favorites
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="px-8 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="relative group">
                <MovieCard
                  movie={favorite.movieData as IMovie}
                  getMovieDetail={getMovieDetail}
                />
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromFavorites(favorite._id)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Sevimlilardan o'chirish"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">No favorite movies</h2>
            <p className="text-gray-400">
              To add your favorite movies, please watch the movies
            </p>
          </div>
        </div>
      )}

      {/* Movie Detail Modal */}
      {isOpenMovieDetail && movieDetail && (
        <MovieDetailModal
          movie={movieDetail}
          setIsOpenMovieDetail={setIsOpenMovieDetail}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
