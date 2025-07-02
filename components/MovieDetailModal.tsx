import { IMovie } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAccount } from "@/context/AccountContext";
import toast from "react-hot-toast";

type MovieDetailModalProps = {
  movie: IMovie;
  setIsOpenMovieDetail: Dispatch<SetStateAction<boolean>>;
};

function MovieDetailModal({
  movie,
  setIsOpenMovieDetail,
}: MovieDetailModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { accountId } = useAccount() || {};

  const addToFavorites = async () => {
    if (!accountId) {
      toast.error("Please choose a profile");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/favorites", {
        accountId,
        movieData: movie,
      });

      if (response.data.success) {
        toast.success("Movie added to favorites!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      onClick={() => setIsOpenMovieDetail(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1c1c1c] text-white rounded-xl overflow-hidden shadow-xl max-w-4xl w-full relative animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpenMovieDetail(false)}
          className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Image */}
        <div
          className="h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${
              movie.backdrop_path || movie.poster_path
            })`,
          }}
        ></div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="text-gray-300 text-sm">
            Released: {movie.release_date}
          </p>
          <p className="text-gray-300 text-sm">
            Rating: {movie.vote_average}/10
          </p>
          <p className="text-gray-200 text-base">{movie.overview}</p>

          {/* Save Button */}
          <button 
            onClick={addToFavorites}
            disabled={isLoading}
            className="mt-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {isLoading ? "Adding..." : "Add To Favorites"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default MovieDetailModal;
