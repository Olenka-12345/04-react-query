import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <form
      className={styles.form}
      action={(formData: FormData) => {
        const query = formData.get('query')?.toString().trim();
        if (!query) {
          toast.error('Please enter a movie name');
          return;
        }
        onSearch(query);
      }}
    >
      <a
        className={styles.link}
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by TMDB
      </a>
      <input
        className={styles.input}
        type="text"
        name="query"
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
