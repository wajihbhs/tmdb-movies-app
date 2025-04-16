<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import { getMovieDetails } from "~/services/movieService";
import type { Movie } from "~/types/movie";

const route = useRoute();
const { locale } = useI18n();
const movie = ref<Movie | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const id = String(route.params.id);
    const language = locale.value === "fr" ? "fr-FR" : "en-US";
    movie.value = await getMovieDetails(id, language);
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
        <movies-movie-details-header :movie="movie" />
      </template>
    </v-card>
  </v-container>
</template>
