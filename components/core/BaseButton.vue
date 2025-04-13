<script setup lang="ts">
defineProps<{
  label: string;
  type?: "button" | "submit" | "reset";
  customClass?: string;
  disabled?: boolean;
}>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      'px-4 py-2 rounded transition duration-200 font-medium',
      { 'opacity-50 cursor-not-allowed': disabled },
      customClass || 'bg-blue-500 text-white hover:bg-blue-600', // Default style if none is provided
    ]"
    :disabled="disabled"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>
