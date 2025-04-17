<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { commentSchema } from "@/validations/comment.validation";

const props = defineProps<{
  addComment: (comment: Omit<MovieComment, 'id' | 'createdAt'>) => void,
  movieId: number
}>()
const form = reactive({
  username: "",
  message: "",
  rating: 1,
});

const v$ = useVuelidate(commentSchema, form);

function submit() {
  props.addComment({ ...form, movieId: props.movieId })
  Object.assign(form, { username: '', message: '', rating: 1 })
  v$.value.$reset()
}
</script>

<template>
  <v-card class="p-4 border grey-lighten-1 shadow mt-10">
    <core-base-form :model="form" :v$="v$" :on-submit="submit">
      <core-base-input
          v-model="form.username"
          :label="$t('comments.username')"
          :error-messages="v$.username.$errors.map((e) => $t(`comments.${e.$validator}`, e.$params))"
          @input="v$.username.$touch()"
      />

      <core-base-textarea
          v-model="form.message"
          :label="$t('comments.message')"
          :placeholder="$t('comments.message')"
          :error-messages="v$.message.$errors.map((e) => $t(`comments.${e.$validator}`, e.$params))"
          @input="v$.message.$touch()"
      />

      <core-base-input
          v-model.number="form.rating"
          type="number"
          :label="$t('comments.rating')"
          min="1"
          max="10"
          :error-messages="v$.rating.$errors.map((e) => $t(`comments.${e.$validator}`, e.$params))"
          @input="v$.rating.$touch()"
      />
    </core-base-form>
  </v-card>
</template>