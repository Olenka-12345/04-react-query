import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const token = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const response = await axios.get(BASE_URL, {
    headers,
    params: {
      query,
      page,
    },
  });

  return response.data;
};
