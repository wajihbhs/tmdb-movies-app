<script setup lang="ts">
import DefaultVehicleImage from "~/assets/img/vehicle-img.png";

defineProps<{ src: string | null; alt: string }>();
</script>

<template>
  <img :src="src || DefaultVehicleImage" :alt="alt" />
</template>
