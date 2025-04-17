<template>
  <v-form @submit.prevent="handleSubmit" class="space-y-4" :class="customClass">
    <slot />
    <div class="flex justify-end pt-2">
      <core-base-button
        type="submit"
        variant="elevated"
        color="primary"
        :disabled="v$?.$invalid"
        :label="$t('comments.submit')"
      />
    </div>
  </v-form>
</template>

import { watch } from 'vue'
<script setup lang="ts" generic="T extends Record<string, unknown>">
const props = defineProps<{
  model: T;
  v$: Validation<T>;
  onSubmit: () => void;
  customClass?: string;
}>();

function handleSubmit() {
  props.v$?.$touch();
  if (props.v$?.$invalid) return;
  props.onSubmit();
}
</script>
