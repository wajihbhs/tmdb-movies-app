<script lang="ts" setup>
defineProps<{ fullStar: number; halfStar: boolean }>();
</script>
<template>
  <div class="flex text-yellow-400">
    <span v-for="index in Array.from({ length: fullStar })" :key="index" class="text-xl"> ★ </span>
    <span v-if="halfStar" class="text-xl">☆</span>
  </div>
</template>
