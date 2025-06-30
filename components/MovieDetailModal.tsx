import { IMovie } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

type MovieDetailModalProps = {
  movie: IMovie;
  setIsOpenMovieDetail: Dispatch<SetStateAction<boolean>>;
};

function MovieDetailModal({
  movie,
  setIsOpenMovieDetail,
}: MovieDetailModalProps) {
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
          <button className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
            Add To Favorites
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default MovieDetailModal;
