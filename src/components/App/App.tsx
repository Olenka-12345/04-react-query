import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

import { fetchMovies } from '../../api/tmdb';
import type { MoviesResponse, Movie } from '../../types/movie';

import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBar from '../SearchBar/SearchBar';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const queryResult = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query.trim(),
    // @ts-expect-error: keepPreviousData is valid but not inferred
    keepPreviousData: true,
  });

  const data = queryResult.data as MoviesResponse;
  const { isLoading, isError } = queryResult;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={setQuery} />

      {/* 🔼 Пагінація зверху */}
      {data?.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Помилка завантаження фільмів" />}

      {data?.results?.length > 0 && (
        <MovieGrid
          movies={data.results}
          onSelect={setSelectedMovie}
          // 🔻 Більше не передаємо page, бо нумерація не потрібна
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;
