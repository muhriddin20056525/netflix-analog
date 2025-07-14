"use client";

import { redirect } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import { fetchMovieDetail, searchMovies } from "@/lib/tmdb";
import { IMovie } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const router = useRouter();

  if (!query) {
    router.back(); // Agar query yo'q bo'lsa, bosh sahifaga yuboriladi
  }

  // Movie Detail Modal State
  const [isOpenMovieDetail, setIsOpenMovieDetail] = useState<boolean>(false);
  // Select Movie State
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  // Search Result State
  const [results, setResults] = useState<IMovie[]>([]);

  const fetchSearchMovie = async () => {
    try {
      const data = await searchMovies(query);
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchMovie();
  }, [query]);

  const getMovieDetail = async (id: number) => {
    try {
      const data = await fetchMovieDetail(id);
      setSelectedMovie(data);
      setIsOpenMovieDetail(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="mt-3 ml-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition border-none outline-none"
      >
        Go Back
      </button>

      <div className="flex justify-center flex-wrap gap-5 p-10">
        {results.map((movie) => (
          <MovieCard
            movie={movie}
            getMovieDetail={getMovieDetail}
            key={movie.id}
          />
        ))}
      </div>

      {isOpenMovieDetail && selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          setIsOpenMovieDetail={setIsOpenMovieDetail}
        />
      )}
    </div>
  );
}

export default SearchPage;
