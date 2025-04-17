<template>
  <v-card flat class="pa-4 rounded-lg shadow">
    <v-card-title class="text-h6 text-primary font-weight-bold">
      {{ t("filters.title") }}
    </v-card-title>
    <v-card-text class="d-flex flex-column gap-4">
      <core-base-input
        v-model="localFilters.query"
        :label="t('filters.search')"
        :placeholder="t('filters.searchPlaceholder')"
      />

      <core-base-select
        v-model="localFilters.sortBy"
        :label="t('filters.sortBy')"
        :items="sortOptions"
        :disabled="isSearchMode"
      >
        <template #append>
          <v-tooltip v-if="isSearchMode" activator="parent">
            {{ t("filters.disabledWhenSearching") }}
          </v-tooltip>
        </template>
      </core-base-select>
      <div>
        <label class="text-sm font-medium text-gray-400 mb-1 d-block">
          {{ t("filters.minRating") }}: <strong>{{ localFilters.voteAverage }}</strong>
        </label>
        <core-base-slider
          v-model="localFilters.voteAverage"
          :min="0"
          :max="10"
          :step="0.1"
          :disabled="isSearchMode"
        />
        <v-tooltip v-if="isSearchMode" activator="parent">
          {{ t("filters.disabledWhenSearching") }}
        </v-tooltip>
      </div>
      <core-base-input
        v-model="localFilters.releaseYear"
        :label="t('filters.releaseYear')"
        :placeholder="t('filters.releaseYearPlaceholder')"
        type="number"
        :disabled="isSearchMode"
      >
        <template #append>
          <v-tooltip v-if="isSearchMode" activator="parent">
            {{ t("filters.disabledWhenSearching") }}
          </v-tooltip>
        </template>
      </core-base-input>
      <core-base-select
        v-model="localFilters.language"
        :label="t('filters.language')"
        :items="languageOptions"
        :disabled="isSearchMode"
      >
        <template #append>
          <v-tooltip v-if="isSearchMode" activator="parent">
            {{ t("filters.disabledWhenSearching") }}
          </v-tooltip>
        </template>
      </core-base-select>

      <core-base-button color="grey-lighten-2" variant="flat" block @click="reset">
        {{ t("filters.reset") }}
      </core-base-button>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import type { Filters } from "~/types/filters";

const props = defineProps<{
  modelValue: Filters;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Filters): void;
}>();

const { t } = useI18n();

const localFilters = reactive<Filters>({ ...props.modelValue });

const isSearchMode = computed(() => !!localFilters.query?.trim());

watch(
  localFilters,
  newVal => {
    emit("update:modelValue", { ...newVal });
  },
  { deep: true }
);

function reset() {
  localFilters.query = "";
  localFilters.sortBy = "popularity.desc";
  localFilters.voteAverage = 0;
  localFilters.releaseYear = "";
  localFilters.language = "";
  emit("update:modelValue", { ...localFilters });
}

const sortOptions = [
  { title: t("filters.popularityDesc"), value: "popularity.desc" },
  { title: t("filters.popularityAsc"), value: "popularity.asc" },
  { title: t("filters.ratingDesc"), value: "vote_average.desc" },
  { title: t("filters.ratingAsc"), value: "vote_average.asc" },
  { title: t("filters.releaseDateDesc"), value: "primary_release_date.desc" },
  { title: t("filters.releaseDateAsc"), value: "primary_release_date.asc" }
];

const languageOptions = [
  { title: t("filters.anyLanguage"), value: "" },
  { title: t("languages.en"), value: "en" },
  { title: t("languages.fr"), value: "fr" },
  { title: t("languages.es"), value: "es" },
  { title: t("languages.ja"), value: "ja" }
];
</script>
