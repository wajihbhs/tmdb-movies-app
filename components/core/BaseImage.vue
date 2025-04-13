<script setup lang="ts">
import DefaultVehicleImage from "~/assets/img/no-photo.jpg";

defineProps<{ src: string | null; alt: string }>();
</script>

<template>
  <img :src="src || DefaultVehicleImage" :alt="alt" />
</template>
