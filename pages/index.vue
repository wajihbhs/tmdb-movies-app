<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMovieStore } from '~/stores/movieStore';
import { useInfiniteMoviesObserver } from '@/composables/useInfiniteMoviesObserver';
import type { MovieFilters } from '~/types/movieFilters';
import { useDebouncedWatch } from "~/composables/useDebouncedEffect";

const { t } = useI18n();
const { $posterUrl } = useNuxtApp();
const { target } = useInfiniteMoviesObserver();
const movieStore = useMovieStore();

const filters = ref<MovieFilters>({
  query: '',
  sortBy: 'popularity.desc',
  voteAverage: 0,
  releaseYear: '',
  language: ''
});

useDebouncedWatch(filters, async (newFilters) => {
  await movieStore.resetAndFetch(newFilters)
}, 500)
</script>

<template>
  <div class="px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="md:col-span-1">
      <movie-filters v-model="filters" />
    </div>

    <div class="bg-white rounded p-4 md:col-span-3">
      <h1 class="text-2xl font-bold mb-6">{{ t('movies-list') }}</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="movie in movieStore.movies"
            :key="movie.id"
            class="border rounded shadow-sm overflow-hidden"
        >
          <core-base-image
              :src="$posterUrl(movie.poster_path)"
              :alt="movie.title"
              class="w-full h-64 object-cover"
          />
          <div class="p-2">
            <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
            <p class="text-sm text-gray-600 truncate-2-lines">
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>

      <div ref="target" class="h-10"></div>
    </div>
  </div>
</template>
