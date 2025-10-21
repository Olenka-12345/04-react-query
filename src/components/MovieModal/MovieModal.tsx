import React from 'react';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>×</button>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
              : 'https://via.placeholder.com/400x600?text=No+Image'
          }
          alt={movie.title}
          className={css.poster}
        />
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.overview}>{movie.overview}</p>
        <p className={css.details}>
          📅 {movie.release_date} | ⭐ {movie.vote_average}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
