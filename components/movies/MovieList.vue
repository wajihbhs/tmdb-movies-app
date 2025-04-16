<script setup lang="ts">
import type { Movie } from "~/types/movie";
import { useInfiniteMoviesObserver } from "~/composables/useInfiniteMoviesObserver";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useMovieStore } from "~/stores/movieStore";

const { $posterUrl } = useNuxtApp();
const { target } = useInfiniteMoviesObserver();
const router = useRouter();
const movieStore = useMovieStore();

const props = defineProps<{
  movies: Movie[];
  isLoading: boolean;
}>();

const skeletonCount = computed(() => 6);
</script>

<template>
  <div>
    <v-row dense>
      <v-col v-for="movie in movies" :key="movie.id" cols="12" sm="6" md="4">
        <v-card
          class="elevation-2 transition hover:scale-[1.01] hover:shadow-lg cursor-pointer"
          @click="router.push(`/movie/${movie.id}`)"
        >
          <core-base-image
            :src="$posterUrl(movie.poster_path)"
            :alt="movie.title"
            height="300px"
            cover
          />
          <v-card-title class="text-h6">
            {{ movie.title }}
          </v-card-title>
          <v-card-text>
            <core-base-tooltip :text="movie.overview" />
          </v-card-text>
          <v-card-actions>
            <core-base-button :label="$t('see-details')" color="primary" variant="flat" block />
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        v-if="isLoading"
        v-for="n in skeletonCount"
        :key="`skeleton-${n}`"
        cols="12"
        sm="6"
        md="4"
      >
        <movies-movie-card-skeleton />
      </v-col>
    </v-row>

    <div ref="target" class="h-10" />

    <div v-if="movieStore.endReached" class="text-center text-sm text-gray-400 my-4">
      {{ $t("no-more-results") }}
    </div>
  </div>
</template>
