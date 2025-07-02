# 📝 Mini Blog - Nuxt 3

Un progetto semplicissimo creato con [Nuxt 3](https://nuxt.com/) per apprendere le basi del framework. Mostra una lista di post finti e permette di visualizzarne i dettagli.

## 🚀 Tecnologie usate

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- Composition API
- Routing automatico
- API interne con `/server/api`
- CSS base

## 📁 Struttura del progetto
mini-blog/
│
├── pages/ → Pagine e routing automatico
│ ├── index.vue → Homepage con lista post
│ └── posts/[id].vue → Dettaglio post
│
├── components/ → Componenti riutilizzabili
│ └── PostCard.vue
│
├── server/api/ → API interne
│ └── posts.ts
│
├── layouts/ → Layout generali
│ └── default.vue
│
├── nuxt.config.ts → Configurazione progetto
└── README.md → Questo file

## 📦 Setup locale

```bash
# Clona la repo
git clone https://github.com/<tuo-utente-GitHub>/mini-blog-nuxt3.git
cd mini-blog-nuxt3

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
Apri il browser su http://localhost:3000

✅ Task principali
- Setup progetto con Nuxt 3

- Creazione API /api/posts con 3 post finti

- Mostrare lista post nella homepage

- Creazione componente PostCard.vue

- Routing dinamico per pagina dettaglio

- Layout base con header e footer

- Aggiunta di stile personalizzato

- Deploy su Vercel o Netlify

📄 Licenza
Progetto open-source per scopi didattici. Nessuna licenza specifica.

✍️ Creato da Melania
