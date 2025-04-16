<template>
  <v-img
    v-if="src"
    v-bind="$attrs"
    :src="String(src || fallback)"
    :alt="alt"
    :cover="cover"
    :height="height"
  />
  <img v-else :src="DefaultImage" :alt="alt" :height="height" />
</template>

<script setup lang="ts">
import DefaultImage from "~/assets/img/no-photo.jpg";

defineProps<{
  src: string | null | undefined;
  alt: string;
  cover?: boolean;
  height?: string | number;
}>();

const fallback = DefaultImage;
</script>
