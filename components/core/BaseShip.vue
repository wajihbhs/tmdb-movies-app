<template>
  <v-chip v-bind="$attrs" :color="color" :variant="variant" :size="size" class="text-xs">
    <slot />
  </v-chip>
</template>

<script setup lang="ts">
defineProps<{
  color?: string;
  variant?: "flat" | "outlined" | "tonal";
  size?: "x-small" | "small" | "default" | "large" | "x-large";
}>();
</script>
