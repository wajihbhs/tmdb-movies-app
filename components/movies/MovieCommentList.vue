<template>
  <div v-if="comments.length" class="space-y-4 mt-6">
    <div v-for="comment in comments" :key="comment.id" class="p-5 rounded border grey-lighten-2">
      <div class="flex justify-between items-center">
        <strong>{{ comment.username }}</strong>
        <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
      </div>
      <div class="text-sm mt-2 prose max-w-full" v-html="comment.message" />
    </div>
  </div>
  <div v-else class="text-center mt-6 italic text-gray-500">
    {{ $t("comments.noComments") }}
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { useMovieComments } from "@/composables/useMovieComments";

const props = defineProps<{ movieId: number }>();
const { comments } = useMovieComments(props.movieId);

function formatDate(dateStr: string) {
  return format(new Date(dateStr), "dd/MM/yyyy à HH:mm");
}
</script>
