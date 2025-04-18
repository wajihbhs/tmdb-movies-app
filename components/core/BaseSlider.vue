<template>
  <v-slider
    v-bind="$attrs"
    v-model="model"
    :min="min"
    :max="max"
    :step="step"
    color="primary"
    hide-details
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: value => emit("update:modelValue", value)
});
</script>
