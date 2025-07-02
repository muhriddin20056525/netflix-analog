"use client";

import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import MovieSection from "@/components/MovieSection";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  fetchMovieDetail,
  fetchPopularMovies,
  fetchPopularTvShows,
  fetchTopRatedMovies,
  fetchTrending,
  fetchUpcomingMovies,
  tmdbApi,
} from "@/lib/tmdb";
import { IAccount, IMovie, IMovieSection } from "@/types";
import axios from "axios";
import { use, useEffect, useState } from "react";

function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Account State
  const [account, setAccount] = useState<IAccount | null>(null);
  // All Movies State
  const [movies, setMovies] = useState<IMovieSection[]>([]);
  // Show Movie Detail Modal State
  const [isOpenMovieDetail, setIsOpenMovieDetail] = useState<boolean>(false);
  // Select Single Movie For Movie Detail
  const [movieDetail, setMovieDetail] = useState<IMovie>();

  const { id } = use(params);

  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    // Check Account ID
    if (!id) return;

    // Request To Backend
    const getAccountData = async () => {
      try {
        const { data } = await axios.get(`/api/accounts/${id}`);
        // Set AccountInfo To State
        setAccount(data.account);
      } catch (error) {
        console.error(error);
      }
    };

    getAccountData();
  }, [id]);

  useEffect(() => {
    // get All Movies From TMDB Api
    const getAllMovies = async () => {
      try {
        const [
          trendingData,
          popularMoviesData,
          popularTvShowsData,
          topRatedData,
          upcomingMoviesData,
        ] = await Promise.all([
          fetchTrending(),
          fetchPopularMovies(),
          fetchPopularTvShows(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
        ]);

        // Make Array From All Movies
        setMovies([
          { title: "Trending Movies", data: trendingData },
          { title: "Popular Movies", data: popularMoviesData },
          { title: "Tv Shows", data: popularTvShowsData },
          { title: "Top Rated", data: topRatedData },
          { title: "Upcoming Movies", data: upcomingMoviesData },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getAllMovies();
  }, []);

  const getMovieDetail = async (id: number) => {
    const data = await fetchMovieDetail(id);
    setMovieDetail(data);
    setIsOpenMovieDetail(true);
    console.log(data);
  };

  return (
    <div>
      <Navbar account={account} />

      {/* Showing Movie Categories */}
      {movies ? (
        movies.map((movie) => (
          <MovieSection
            title={movie.title}
            data={movie.data}
            key={movie.title}
            getMovieDetail={getMovieDetail}
          />
        ))
      ) : (
        <Loader />
      )}

      {/* Show Movie Detail Modal */}
      {isOpenMovieDetail && movieDetail && (
        <MovieDetailModal
          movie={movieDetail}
          setIsOpenMovieDetail={setIsOpenMovieDetail}
        />
      )}
    </div>
  );
}

export default DashboardPage;
