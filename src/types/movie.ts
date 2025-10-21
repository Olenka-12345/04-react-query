export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface EnrichedMovie extends Movie {
  poster_url: string;
  backdrop_url: string;
}

export interface TMDBResponse {
  results: Movie[];
}
