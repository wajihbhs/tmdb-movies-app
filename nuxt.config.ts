import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_TMDB_BASE_URL,
      TMDB_API_KEY: process.env.NUXT_PUBLIC_TMDB_API_KEY,
      TMDB_IMAGE_BASE: process.env.NUXT_PUBLIC_TMDB_IMAGE_BASE
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  pages: true,
  compatibilityDate: '2025-03-03',
  css: ['vuetify/styles', '~/assets/css/tailwind.css'],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
