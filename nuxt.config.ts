export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/color-mode", "@nuxt/image"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
    storageKey: "theme",
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: (title?: string) =>
        title ? `${title} · Mini E‑commerce` : "Mini E‑commerce",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#111111" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Mini E‑commerce" },
        { property: "og:image", content: "/t-shirt.png" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/t-shirt.png" },
      ],
    },
  },
  image: {
    format: ["webp", "avif", "png"],
    densities: [1, 2],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
