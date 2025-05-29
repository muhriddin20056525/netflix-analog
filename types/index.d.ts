export type Profile = {
  _id: string;
  name: string;
  avatar: string;
  password: string;
  userId: string;
  savedMovies: string[];
};

export interface MovieDataProps {
  title: string;
  data: MovieProps[];
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string[];
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  release_date: string;
}
