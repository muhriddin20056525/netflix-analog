import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async (type: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTopratedMovies = async (type: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async (type: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchResults = async (type: string, title: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${title}`
    );

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};
