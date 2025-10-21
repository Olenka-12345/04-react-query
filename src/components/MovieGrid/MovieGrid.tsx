import type { EnrichedMovie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: EnrichedMovie[];
  onSelect: (movie: EnrichedMovie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div className={styles.card} onClick={() => onSelect(movie)}>
            <img
              className={styles.image}
              src={movie.poster_url}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
