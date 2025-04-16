<template>
  <v-select
    v-bind="$attrs"
    v-model="model"
    :variant="variant"
    :density="density"
    :items="items"
    hide-details
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number;
  items: { title: string; value: string | number }[];
  variant?: "outlined" | "filled" | "solo" | "plain";
  density?: "compact" | "comfortable" | "default";
}>();

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
