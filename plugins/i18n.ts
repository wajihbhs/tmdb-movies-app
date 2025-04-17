import { createI18n } from "vue-i18n";

export default defineNuxtPlugin(async ({ vueApp }) => {
  const enMessages = await import("~/locales/en.json").then(m => m.default);
  const frMessages = await import("~/locales/fr.json").then(m => m.default);

  const i18n = createI18n({
    legacy: false,
    locale: "fr",
    fallbackLocale: "fr",
    messages: {
      en: enMessages,
      fr: frMessages
    }
  });

  vueApp.use(i18n);
});
