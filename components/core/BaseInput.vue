<template>
  <v-text-field
    v-bind="$attrs"
    v-model="model"
    :variant="variant"
    :density="density"
    :error-messages="errorMessages"
    hide-details="auto"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null;
  variant?: "outlined" | "filled" | "solo" | "plain";
  density?: "compact" | "comfortable" | "default";
  errorMessages?: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: value => emit("update:modelValue", value)
});
</script>
