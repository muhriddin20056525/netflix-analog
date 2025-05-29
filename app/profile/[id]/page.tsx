"use client";

import Loader from "@/components/Loader";
import MovieSection from "@/components/MovieSection";
import ProfileNavbar from "@/components/ProfileNavbar";
import {
  getPopularMovies,
  getTopratedMovies,
  getTrendingMovies,
} from "@/lib/tmdb";
import { MovieDataProps, Profile } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProfilePage() {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);

  const { id } = useParams();

  const [profileDetail, setProfileDetail] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/api/profile/${id}`);
      setProfileDetail(data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          trendingTv,
          topRatedTv,
          popularTv,
          trendingMovie,
          topRatedMovie,
          popularMovie,
        ] = await Promise.all([
          getTrendingMovies("tv"),
          getTopratedMovies("tv"),
          getPopularMovies("tv"),

          getTrendingMovies("movie"),
          getTopratedMovies("movie"),
          getPopularMovies("movie"),
        ]);

        const tvShows: MovieDataProps[] = [
          { title: "Trending TV Shows", data: trendingTv },
          { title: "Top Rated TV Shows", data: topRatedTv },
          { title: "Popular TV Shows", data: popularTv },
        ];

        const moviesShows: MovieDataProps[] = [
          { title: "Trending Movies", data: trendingMovie },
          { title: "Top Rated Movies", data: topRatedMovie },
          { title: "Popular Movies", data: popularMovie },
        ];

        const allMovies = [...tvShows, ...moviesShows];
        setMoviesData(allMovies);
      } catch (error) {
        console.log(error);
      }
    };
    getAllMovies();

    fetchProfile();
  }, []);

  return (
    <div>
      {profileDetail && (
        <ProfileNavbar
          name={profileDetail?.name}
          avatar={profileDetail?.avatar}
        />
      )}

      <div className="py-5">
        {moviesData.length > 0 ? (
          moviesData.map((section, index) => (
            <MovieSection
              key={index}
              title={section.title}
              data={section.data}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
