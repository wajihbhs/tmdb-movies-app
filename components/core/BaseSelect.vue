<script setup lang="ts">
defineProps<{
  modelValue: string | number | null;
  options: { value: string | number | null; label: string }[];
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :value="modelValue ?? ''"
    class="w-full p-2 border rounded"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value || null)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value ?? ''">
      {{ option.label }}
    </option>
  </select>
</template>
