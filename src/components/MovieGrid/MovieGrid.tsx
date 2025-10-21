import React from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card} onClick={() => onSelect(movie)}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/no-image.png'
            }
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p className={css.rating}>⭐ {movie.vote_average.toFixed(1)}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
