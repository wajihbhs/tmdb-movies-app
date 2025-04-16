<template>
  <v-text-field
    v-bind="$attrs"
    v-model="model"
    :variant="variant"
    :density="density"
    hide-details
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null;
  variant?: "outlined" | "filled" | "solo" | "plain";
  density?: "compact" | "comfortable" | "default";
}>();

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
