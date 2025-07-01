import axios from "axios";

// TMDB Configurations
export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2Y4YzY2YmQxZmQ5YTRmYTUyNGM3MTliYjc3OTQwMSIsIm5iZiI6MTc0ODMyMjIzNi4wNzIsInN1YiI6IjY4MzU0N2JjODkyOGY0MTFmNGViMzYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CJYd3G5QrPJ3UjhT619ty_bONsrDxjT-Cz4J_HDnCA8`,
  },
});

// Fetch Trending Now
export const fetchTrending = async () => {
  try {
    const { data } = await tmdbApi.get("/trending/movie/day");
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Popular Movies
export const fetchPopularMovies = async () => {
  try {
    const { data } = await tmdbApi.get("/movie/popular");
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Popular Tv Shows
export const fetchPopularTvShows = async () => {
  try {
    const { data } = await tmdbApi.get("/tv/popular");
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Top Rated Movies
export const fetchTopRatedMovies = async () => {
  try {
    const { data } = await tmdbApi.get("/movie/top_rated");
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Upcoming Movies
export const fetchUpcomingMovies = async () => {
  try {
    const { data } = await tmdbApi.get("/movie/upcoming");
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Movie Detail
export const fetchMovieDetail = async (id: number) => {
  try {
    const { data } = await tmdbApi.get(`/movie/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Search movie
export const searchMovies = async (name: string) => {
  try {
    const { data } = await tmdbApi.get(`/search/movie?query=${name}`);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
