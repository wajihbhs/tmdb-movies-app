<script lang="ts" setup>
const props = defineProps<{ average: number }>();
const fullStar = computed(()=> {
  return Math.floor(props.average / 2);
});
const halfStar = computed(()=> {
  return props.average %2 >= 1;
});

</script>
<template>
  <div class="flex text-yellow-400">
    <span v-for="index in Array.from({ length: fullStar })" :key="`star-${index}`" class="text-xl"> ★ </span>
    <span v-if="halfStar" class="text-xl">☆</span>
  </div>
</template>
