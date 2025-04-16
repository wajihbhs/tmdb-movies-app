<template>
  <v-textarea
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :error-messages="errorMessages"
    v-bind="$attrs"
    auto-grow
    outlined
    hide-details="auto"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  errorMessages?: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateValue(val: string) {
  emit("update:modelValue", val);
}
</script>
