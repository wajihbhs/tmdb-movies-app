<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Filters } from "~/types/filters";
import { useMovieStore } from "~/stores/movieStore";
import MovieList from "~/components/movies/MovieList.vue";
import MovieFilters from "~/components/movies/MovieFilters.vue";
import { useDebouncedWatch } from "~/composables/useDebouncedEffect";

const { t } = useI18n();
const movieStore = useMovieStore();

const filters = ref<Filters>({
  query: "",
  sortBy: "popularity.desc",
  voteAverage: 0,
  releaseYear: "",
  language: "",
});

useDebouncedWatch(
  filters,
  async (newFilters) => {
    await movieStore.resetAndFetch(newFilters);
  },
  500
);
</script>

<template>
  <div class="px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="md:col-span-1">
      <MovieFilters v-model="filters" />
    </div>
    <div class="bg-white rounded p-4 md:col-span-3">
      <h1 class="text-2xl font-bold mb-6">{{ t("movies-list") }}</h1>
      <MovieList :is-loading="movieStore.isLoading" :movies="movieStore.movies" />
    </div>
  </div>
</template>
