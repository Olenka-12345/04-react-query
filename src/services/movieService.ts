import axios from 'axios';
import type { TMDBResponse, EnrichedMovie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'original';

export const fetchMovies = async (query: string): Promise<EnrichedMovie[]> => {
  const response = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data.results.map(movie => ({
    ...movie,
    poster_url: `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`,
    backdrop_url: `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`,
  }));
};
