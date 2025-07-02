"use client";

import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import { fetchMovieDetail, searchMovies } from "@/lib/tmdb";
import { IMovie } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function SearchPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Get Search Value From Params
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Get Search Results State
  const [results, setResults] = useState<IMovie[]>([]);

  // Show MovieDetail Modal State
  const [isOpenMovieDetail, setIsOpenMovieDetail] = useState<boolean>(false);

  // For Select Movie
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    // check query
    if (!query) return;

    // Launching Search Movie Function
    const fetchResults = async () => {
      try {
        // Call searchMovie Api From tmdb.ts
        const data = await searchMovies(query);
        // Set Data To results State
        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Calling fetchResults Function
    fetchResults();
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

      {/* Show Movie Detail Modal */}
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
