<template>
  <v-tooltip location="top" max-width="320">
    <template #activator="{ props }">
      <div
          v-bind="props"
          class="text-sm text-gray-600 line-clamp-3"
      >
        {{ text }}
      </div>
    </template>
    <template #default>
      <div class="whitespace-pre-line text-sm py-2 px-3">
        {{ text }}
      </div>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>();
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
