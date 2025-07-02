// server/api/posts.ts
export default defineEventHandler(() => {
  return [
    {
      id: 1,
      title: "Benvenuti nel Mini Blog",
      excerpt: "Scopri come abbiamo creato un blog semplice con Nuxt 3.",
    },
    {
      id: 2,
      title: "Perché Nuxt è fantastico",
      excerpt: "Parliamo di rendering, routing automatico e API native.",
    },
    {
      id: 3,
      title: "Iniziare con Vue e Nuxt",
      excerpt: "Una guida semplice per principianti con esempi chiari.",
    },
  ];
});
