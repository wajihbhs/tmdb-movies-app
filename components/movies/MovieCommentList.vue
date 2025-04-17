<script setup lang="ts">
import {format} from "date-fns";
import type {MovieComment} from "~/types/movieComment";
import MovieVoteAverage from "~/components/movies/MovieVoteAverage.vue";

defineProps<{ comments: MovieComment[] }>();

function formatDate(dateStr: string) {
  return format(new Date(dateStr), "dd/MM/yyyy à HH:mm");
}
</script>
<template>
  <div v-if="comments.length" class="space-y-4 mt-6">
    <TransitionGroup
        name="fade-slide"
        tag="div"
    >
      <div v-for="comment in comments" :key="comment.id" class="p-5 rounded border grey-lighten-2">
        <div class="flex justify-between items-center">
          <strong>{{ comment.username }}</strong>
          <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
        </div>
        <div class="text-sm mt-2 prose max-w-full" v-html="comment.message"/>
        <div class="flex justify-end items-center gap-2">
          <movie-vote-average :average="comment.rating" :vote-count="0" />
        </div>
      </div>
    </TransitionGroup>
  </div>
  <div v-else class="text-center mt-6 italic text-gray-500">
    {{ $t("comments.noComments") }}
  </div>
</template>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.9s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
