import { IMovie } from "@/types";
import MovieCard from "./MovieCard";

type MovieSectionProps = {
  title: string;
  data: IMovie[];
  getMovieDetail: (id: number) => void;
};

function MovieSection({ title, data, getMovieDetail }: MovieSectionProps) {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>

      {/* Show Movie */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 w-max">
          {data.map((item) => (
            <div key={item.id} className="min-w-[200px]">
              <MovieCard movie={item} getMovieDetail={getMovieDetail} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
