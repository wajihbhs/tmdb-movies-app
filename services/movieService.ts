import type { MovieResponse } from "~/types/movieResponse";
import type { Filters } from "~/types/filters";
import type { Movie } from "~/types/movie";
import type { MovieCreditsResponse } from "~/types/credits";

export const fetchMoviesWithFilters = async (
  filters: Filters,
  page = 1
): Promise<MovieResponse> => {
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();
  const params: Record<string, string | number> = {
    page,
    api_key: config.public.TMDB_API_KEY
  };

  if (filters.query?.trim()) {
    params.query = filters.query.trim();
    const response = await $axios.get<MovieResponse>("/search/movie", { params });
    return response.data;
  }

  if (filters.sortBy) params.sort_by = filters.sortBy;
  if (filters.voteAverage) params["vote_average.gte"] = filters.voteAverage;
  if (filters.releaseYear) params["primary_release_year"] = filters.releaseYear;
  if (filters.language) params.with_original_language = filters.language;

  const response = await $axios.get<MovieResponse>("/discover/movie", { params });
  return response.data;
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();
  const response = await $axios.get<Movie>(`/movie/${id}`, {
    params: {
      api_key: config.public.TMDB_API_KEY
    }
  });
  return response.data;
};

export const getMovieCredits = async (id: string): Promise<MovieCreditsResponse> => {
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();

  const response = await $axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: config.public.TMDB_API_KEY
    }
  });

  return response.data;
};
