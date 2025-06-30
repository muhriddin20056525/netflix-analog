import { IMovie } from "@/types";

type MovieCardProps = {
  movie: IMovie;
  getMovieDetail: (id: number) => void;
};

function MovieCard({ movie, getMovieDetail }: MovieCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md w-[200px]">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-3">
        <h3
          onClick={() => getMovieDetail(movie.id)}
          className="text-white text-lg font-semibold truncate cursor-pointer hover:underline"
        >
          {movie.title || movie.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1 truncate">
          {movie.release_date || movie.first_air_date}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
