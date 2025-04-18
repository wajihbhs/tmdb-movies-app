<script lang="ts" setup>
defineProps<{ average: number; voteCount: number }>();
</script>

<template>
  <core-stars-rating :average="average" />
  <span class="text-sm text-gray-600">
    {{ average.toFixed(1) }} / 10
    <span v-if="voteCount !== 0">— {{ voteCount }} {{ $t("votes") }}</span>
  </span>
</template>
