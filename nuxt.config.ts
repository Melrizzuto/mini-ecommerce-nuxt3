export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
    storageKey: "theme", // salva preferenza utente
  },
});
