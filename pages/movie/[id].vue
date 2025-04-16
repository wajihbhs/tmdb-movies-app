<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import type { Movie } from "~/types/movie";
import { getMovieCredits, getMovieDetails } from "~/services/movieService";
import type { MovieCreditsResponse } from "~/types/credits";
import MovieCredits from "~/components/movies/MovieCredits.vue";
import MovieDetails from "~/components/movies/MovieDetails.vue";
import MovieCommentForm from "~/components/movies/MovieCommentForm.vue";
import MovieCommentList from "~/components/movies/MovieCommentList.vue";

const route = useRoute();
const isLoading = ref(true);
const commentListKey: number = ref(0);
const movie: Movie = ref<Movie | null>(null);
const credits: MovieCreditsResponse = ref<MovieCreditsResponse | null>(null);

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
        <v-container>
          <movie-details :movie="movie" />
          <movie-credits :cast="credits.cast" :crew="credits.crew" />

          <h2 class="text-xl font-bold mt-8 mb-2">{{ $t("comments.title") }}</h2>

          <movie-comment-form :movie-id="movie.id" @refresh:comments="commentListKey++" />
          <movie-comment-list :key="`refresh-key-${commentListKey}`" :movie-id="movie.id" />
        </v-container>
      </template>
    </v-card>
  </v-container>
</template>
