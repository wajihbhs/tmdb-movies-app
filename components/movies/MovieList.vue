<script setup lang="ts">
import type { Movie } from '~/types/movie';
import {useInfiniteMoviesObserver} from "~/composables/useInfiniteMoviesObserver";

const { $posterUrl } = useNuxtApp();
const { target } = useInfiniteMoviesObserver();

defineProps<{
  movies: Movie[]
}>();

</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="movie in movies"
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
</template>
