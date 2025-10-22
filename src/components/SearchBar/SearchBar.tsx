import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const query = form.get('query')?.toString().trim();

    if (!query) {
      toast.error('Введіть пошуковий запит');
      return;
    }

    onSubmit(query);
    e.currentTarget.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Пошук фільмів..."
      />
      <button className={css.button} type="submit">
        Пошук
      </button>
    </form>
  );
};

export default SearchBar;
