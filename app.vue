<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useHead } from "nuxt/app";

const { t } = useI18n();

useHead({
  title: t("home-title"),
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <NuxtLayout>
      <main class="container mx-auto">
        <NuxtPage />
      </main>
    </NuxtLayout>
  </div>
</template>
