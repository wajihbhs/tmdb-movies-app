<script setup lang="ts">
import type { Movie } from "~/types/movie";

const props = defineProps<{
  movie: Movie;
}>();

const { $posterUrl } = useNuxtApp();

const fullStar = Math.floor(props.movie.vote_average / 2);
const halfStar = props.movie.vote_average % 2 >= 1;
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 p-2">
    <div class="w-full md:w-1/3">
      <core-base-image
        :src="$posterUrl(movie.poster_path)"
        :alt="movie.title"
        height="500"
        cover
        class="w-full"
      />
    </div>

    <div class="flex-1 flex flex-col gap-4">
      <h1 class="text-3xl font-bold leading-tight">
        {{ movie.title }}
      </h1>

      <div class="flex items-center gap-2">
        <core-stars-rating :full-star="fullStar" :half-star="halfStar" />
        <span class="text-sm text-gray-600">
          {{ movie.vote_average.toFixed(1) }} / 10 — {{ movie.vote_count }} {{ $t("votes") }}
        </span>
      </div>

      <div class="text-sm text-gray-600">
        <span class="font-semibold"> {{ $t("release-date") }}: </span>
        {{ movie.release_date }}
      </div>

      <div class="flex flex-wrap gap-2">
        <core-base-ship
          v-for="genre in movie.genres"
          :key="genre.id"
          color="primary"
          variant="tonal"
        >
          {{ genre.name }}
        </core-base-ship>
      </div>

      <core-base-tooltip :text="movie.overview" />
    </div>
  </div>
</template>
