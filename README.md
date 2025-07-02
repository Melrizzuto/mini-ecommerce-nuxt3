# 🛍️ Mini E-commerce - Nuxt 3

Un progetto semplicissimo creato con [Nuxt 3](https://nuxt.com/) per apprendere le basi del framework. Mostra una lista di prodotti finti e permette di visualizzarli in una pagina dedicata.

## 🚀 Tecnologie usate

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- TypeScript
- Composition API
- Routing automatico
- API interne con `/server/api`
- CSS base

## 📁 Struttura del progetto

mini-ecommerce/
│
├── pages/ → Pagine e routing automatico  
│ └── products.vue → Lista dei prodotti  
│
├── components/ → Componenti riutilizzabili  
│ └── ProductCard.vue → Card del prodotto  
│
├── server/api/ → API interne  
│ └── products.ts → Array finto di prodotti  
│
├── layouts/ → Layout generali  
│ └── default.vue  
│
├── nuxt.config.ts → Configurazione progetto  
└── README.md → Questo file  

## 📦 Setup locale

```bash
# Clona la repo
git clone https://github.com/<tuo-utente-GitHub>/mini-ecommerce-nuxt3.git
cd mini-ecommerce-nuxt3

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

Apri il browser su http://localhost:3000

⸻

✅ Task principali
	•	Setup progetto con Nuxt 3
	•	Creazione endpoint /api/products con array di prodotti
	•	Mostrare lista prodotti nella pagina dedicata
	•	Creazione componente ProductCard.vue
	•	Layout base con header e footer
	•	Aggiunta di stile personalizzato
	•	(Facoltativo) Deploy su Vercel

⸻

📄 Licenza

Progetto open-source per scopi didattici. Nessuna licenza specifica.

⸻

✍️ Creato da Melania
