import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Movie } from '@/types/movie'
import type { Filters } from '~/types/filters'
import { fetchMoviesWithFilters } from '@/services/movieService'
import type { MovieResponse } from '~/types/movieResponse'

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([])
  const page = ref(0)
  const totalPages = ref(1)
  const isLoading = ref(false)
  const hasError = ref(false)
  const endReached = ref(false)

  const currentFilters = ref<Filters>({
    query: '',
    sortBy: 'popularity.desc',
    voteAverage: 0,
    releaseYear: '',
    language: ''
  })

  const hasMorePages = computed(() =>
      !endReached.value && page.value < totalPages.value
  )

  const fetchMovies = async () => {
    isLoading.value = true
    hasError.value = false

    try {
      const data: MovieResponse = await fetchMoviesWithFilters(
          currentFilters.value,
          page.value
      )

      totalPages.value = data.total_pages

      if (page.value === 1) {
        movies.value = data.results
      } else {
        movies.value.push(...data.results)
      }

      if (data.results.length === 0 || page.value >= data.total_pages) {
        endReached.value = true
      }
    } catch (error) {
      console.error('[useMovieStore] fetchMovies error', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const resetAndFetch = async (filters: Filters) => {
    page.value = 1
    totalPages.value = 1
    endReached.value = false
    currentFilters.value = { ...filters }
    movies.value = []
    await fetchMovies()
  }

  const loadNextPage = async () => {
    if (isLoading.value || !hasMorePages.value) return
    page.value++
    await fetchMovies()
  }

  return {
    movies,
    isLoading,
    hasError,
    currentFilters,
    hasMorePages,
    endReached,
    resetAndFetch,
    loadNextPage
  }
})
