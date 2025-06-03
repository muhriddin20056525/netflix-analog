import { MovieProps } from "@/types";
import { Dispatch, SetStateAction } from "react";

type DetailModalProps = {
  movie: MovieProps | null;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
};

function DetailModal({ movie, setShowDetailModal }: DetailModalProps) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 shadow-lg">
        <button
          onClick={() => setShowDetailModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="w-full md:w-1/3 rounded-xl object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {movie.title || movie.name}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {movie.release_date || movie.first_air_date}
            </p>

            <p className="text-gray-700 mb-4 line-clamp-5">{movie.overview}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>
                <strong>Rating:</strong> {movie.vote_average?.toFixed(1)} / 10
              </span>
              <span>
                <strong>Votes:</strong> {movie.vote_count}
              </span>
              {movie.original_language && (
                <span>
                  <strong>Language:</strong> {movie.original_language}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
