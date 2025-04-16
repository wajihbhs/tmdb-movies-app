<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import type { Movie } from "~/types/movie";
import { getMovieCredits, getMovieDetails } from "~/services/movieService";
import type { MovieCreditsResponse } from "~/types/credits";
import MovieCredits from "~/components/movies/MovieCredits.vue";
import MovieDetails from "~/components/movies/MovieDetails.vue";

const route = useRoute();
const isLoading = ref(true);
const movie = ref<Movie | null>(null);
const credits = ref<MovieCreditsResponse | null>(null);

onMounted(async () => {
  try {
    const id = String(route.params.id);
    movie.value = await getMovieDetails(id);
    credits.value = await getMovieCredits(id);
  } catch (e) {
    console.error("[movie/[id]] error loading movie:", e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <v-container class="py-4">
    <v-card>
      <v-skeleton-loader v-if="isLoading" type="image, heading, paragraph" />
      <template v-else>
        <movie-details :movie="movie" />
        <movie-credits :cast="credits.cast" :crew="credits.crew" />
      </template>
    </v-card>
  </v-container>
</template>
