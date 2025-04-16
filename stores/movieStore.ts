import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Movie } from '@/types/movie';
import { fetchMoviesWithFilters } from '@/services/movieService';
import type {MovieFilters} from "~/types/movieFilters";

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([]);
  const page = ref(0);
  const isLoading = ref(false);
  const hasError = ref(false);
  const currentFilters = ref<MovieFilters>({
    query: '',
    sortBy: 'popularity.desc',
    voteAverage: 0,
    releaseYear: '',
    language: ''
  });

  const fetchMovies = async () => {
    isLoading.value = true;
    hasError.value = false;

    try {
      const data = await fetchMoviesWithFilters(currentFilters.value, page.value);

      if (page.value === 1) {
        movies.value = data.results;
      } else {
        movies.value.push(...data.results);
      }
    } catch (error) {
      console.error('[useMoviesStore] fetchMovies error', error);
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const resetAndFetch = async (filters: MovieFilters) => {
    page.value = 1;
    currentFilters.value = { ...filters };
    movies.value = [];
    await fetchMovies();
  };

  const loadNextPage = async () => {
    if (isLoading.value) return;
    page.value++;
    await fetchMovies();
  };

  return {
    movies,
    isLoading,
    hasError,
    currentFilters,
    resetAndFetch,
    loadNextPage
  };
});
