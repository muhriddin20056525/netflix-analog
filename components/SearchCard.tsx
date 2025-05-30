import { MovieProps } from "@/types";

type SearchCardProps = {
  item: MovieProps;
};

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

function SearchCard({ item }: SearchCardProps) {
  return (
    <div className="w-full max-w-4xl mb-3 mx-auto flex rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="w-[400px] h-[450px] flex-shrink-0 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            item?.poster_path
              ? `${BASE_IMAGE_URL}${item.poster_path}`
              : "/placeholder.png"
          }
          alt={item?.title || item?.name || "Poster"}
        />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 truncate">
          {item?.title || item?.name || "Untitled"}
        </h3>
        <p className="text-gray-700 text-base line-clamp-4">
          {item?.overview || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default SearchCard;
