<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Logo from '~/assets/svg/logo.png'

const { t, locale } = useI18n()
const showDropdown = ref(false)

const changeLanguage = (lang: string) => {
  locale.value = lang
  showDropdown.value = false
}
</script>

<template>
  <header class="bg-white shadow-md py-4 sticky top-0 w-full z-50">
    <div class="container mx-auto flex justify-between items-center px-4">
      <NuxtLink to="/">
        <core-base-image :src="Logo" alt="HelloCSE Logo" class="h-10" />
      </NuxtLink>
      <core-base-dropdown v-model="showDropdown">
        <template #trigger>
          <core-base-button
              variant="flat"
              color="grey-lighten-2"
              class="text-gray-700 flex items-center px-4 py-2"
          >
            <span>
              {{ locale === 'en' ? `🇬🇧 ${t('languages.en')}` : `🇫🇷 ${t('languages.fr')}` }}
            </span>
          </core-base-button>
        </template>

        <template #content>
          <core-base-button
              block
              variant="flat"
              color="transparent"
              class="text-left text-black px-4"
              @click="changeLanguage('en')"
          >
            🇬🇧 {{ t('languages.en') }}
          </core-base-button>
          <core-base-button
              block
              variant="flat"
              color="transparent"
              class="text-left text-black px-4"
              @click="changeLanguage('fr')"
          >
            🇫🇷 {{ t('languages.fr') }}
          </core-base-button>
        </template>
      </core-base-dropdown>
    </div>
  </header>
</template>
