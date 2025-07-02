export interface IAccount {
  _id: string;
  accountImg: string;
  username: string;
  password: string;
  uid: string;
}

export interface IMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  media_type?: string;
  adult?: boolean;
}

export interface IMovieSection {
  title: string;
  data: IMovie[];
}

export interface IFavorite {
  _id: string;
  accountId: string;
  movieId: number;
  movieData: {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    genre_ids?: number[];
    media_type?: string;
  };
  addedAt: Date;
}
