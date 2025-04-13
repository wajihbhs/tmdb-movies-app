<script setup lang="ts">
import { ref, watch } from "vue";

const showDropdown = defineModel<boolean>();
const dropdownRef = ref<HTMLElement | null>(null);

const closeDropdown = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

watch(showDropdown, (newValue) => {
  if (newValue) document.addEventListener("click", closeDropdown);
  else document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <slot name="trigger" />
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg overflow-hidden"
    >
      <slot name="content" />
    </div>
  </div>
</template>
