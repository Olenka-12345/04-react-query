import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

// 🔐 Пряме передавання ключа для тесту
const API_KEY = 'c5007805a0f2513e094cb09b9833e7ec'; // ← заміни на свій ключ, якщо потрібно
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  console.log('fetchMovies called with:', { query, page });

  if (!query.trim()) {
    console.warn('Порожній запит — повертаємо порожній результат');
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  try {
    const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY, // 🔑 обов’язково включено
        query,
        page,
      },
    });

    console.log('TMDB response:', response.data);

    if (!response.data || !Array.isArray(response.data.results)) {
      console.warn('Невірна відповідь від TMDB API:', response.data);
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }

    return response.data;
  } catch (error) {
    console.error('Помилка запиту до TMDB:', error);
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
};
