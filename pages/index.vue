
<template>
  <div class="p-6">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Rechercher un film..."
      class="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    />
    <MovieGrid :movies="movieStore.movies" />
    <div ref="infiniteTrigger" class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movies'
import { useMovieSearch } from '@/composables/useMovieSearch'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import MovieGrid from '@/components/MovieGrid.vue'

const movieStore = useMovieStore()
const searchTerm = ref('')
useMovieSearch(searchTerm, () => movieStore.search(searchTerm.value))
const infiniteTrigger = useInfiniteScroll(() => movieStore.next())

onMounted(() => {
  movieStore.load()
})
</script>
