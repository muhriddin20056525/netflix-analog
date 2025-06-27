"use client";

import Navbar from "@/components/Navbar";
import {
  fetchPopularMovies,
  fetchPopularTvShows,
  fetchTopRatedMovies,
  fetchTrending,
  fetchUpcomingMovies,
  tmdbApi,
} from "@/lib/tmdb";
import { IAccount } from "@/types";
import axios from "axios";
import { use, useEffect, useState } from "react";

function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  // Account State
  const [account, setAccount] = useState<IAccount | null>(null);
  // All Movies State
  const [movies, setMovies] = useState([]);

  const { id } = use(params);

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

        console.log([
          { title: "Trending Movies", data: trendingData },
          { title: "Popular Movies", data: popularMoviesData },
          { title: "Tv Shows", data: popularMoviesData },
          { title: "Top Rated", data: topRatedData },
          { title: "Upcoming Movies", data: upcomingMoviesData },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getAllMovies();
  }, []);

  return (
    <div>
      <Navbar account={account} />
    </div>
  );
}

export default DashboardPage;
