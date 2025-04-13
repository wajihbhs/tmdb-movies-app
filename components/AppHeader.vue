<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Logo from "~/assets/svg/logo.svg";
import { ref, onMounted, onUnmounted } from "vue";

const { t, locale } = useI18n();
const showDropdown = ref(false);
const isScrolled = ref(false);

const toggleDropdown = () => (showDropdown.value = !showDropdown.value);
const changeLanguage = (lang: string) => {
  locale.value = lang;
  showDropdown.value = false;
};

const handleScroll = () => (isScrolled.value = window.scrollY > 50);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="bg-white shadow-md py-4 sticky top-0 w-full z-50 transition-all duration-300">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo -->
      <NuxtLink to="/">
        <core-base-image :src="Logo" alt="Yescapa Logo" class="h-10" />
      </NuxtLink>
      <core-base-dropdown v-model="showDropdown">
        <template #trigger>
          <core-base-button
            :label="locale === 'en' ? `${t('language-english')} 🇬🇧` : `${t('language-french')} 🇫🇷`"
            customClass="bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center px-4 py-2"
            @click="toggleDropdown"
          />
        </template>

        <template #content>
          <core-base-button
            :label="`🇬🇧 ${t('language-english')}`"
            customClass="block w-full text-left px-4 py-2 hover:bg-gray-100 bg-transparent text-black"
            @click="changeLanguage('en')"
          />
          <core-base-button
            :label="`🇫🇷 ${t('language-french')}`"
            customClass="block w-full text-left px-4 py-2 hover:bg-gray-100 bg-transparent text-black"
            @click="changeLanguage('fr')"
          />
        </template>
      </core-base-dropdown>
    </div>
  </header>
</template>
