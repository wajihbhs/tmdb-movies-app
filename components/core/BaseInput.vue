<script setup lang="ts">
defineProps<{
  modelValue: string | number | null;
  type?: string;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    :type="type || 'text'"
    :placeholder="placeholder"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="w-full p-2 border rounded"
  />
</template>
