# 🛍️ Mini E-commerce stile ASOS - Nuxt 3

Un piccolo e-commerce ispirato allo stile e alla user experience di ASOS, sviluppato per esercitarmi con Nuxt 3, Vue 3 e Pinia.  
L’app consente di navigare tra prodotti, filtrarli per categoria, visualizzare schede prodotto dettagliate, aggiungere articoli al carrello e simulare login/logout con autenticazione.  

Live Demo → [https://mini-shop-black.vercel.app/](https://mini-shop-black.vercel.app/)  
Codice → [https://github.com/Melrizzuto/mini-ecommerce-nuxt3](https://github.com/Melrizzuto/mini-ecommerce-nuxt3)

---

## 🚀 Tecnologie usate

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) (stato globale)
- TypeScript
- Composition API
- CSS Modules
- API REST ([Fake Store API](https://fakestoreapi.com/))
- Vercel (deploy e hosting)

---

## ✨ Funzionalità principali

- 🏠 **Home & Landing Page** responsive
- 📦 **Lista prodotti** con filtri per categoria  
- 📝 **Scheda prodotto** con dettagli e immagini  
- 🛒 **Carrello persistente** (Pinia + localStorage)
- 🔑 **Login/Logout** con autenticazione via API
- 🎨 **Dark mode** con ottimizzazione accessibilità
- ⚡ **Filtri dinamici** con query params
- 📱 **Responsive design** ottimizzato per mobile e desktop

---
## 🔌 API utilizzate

- **Prodotti:** [Fake Store API - Products](https://fakestoreapi.com/products)
- **Autenticazione:** [Fake Store API - Auth](https://fakestoreapi.com/auth/login)

---

## 🛠 Setup locale

```bash
# Clona la repo
git clone https://github.com/Melrizzuto/mini-ecommerce-nuxt3.git
cd mini-ecommerce-nuxt3

# Installa le dipendenze
pnpm install

# Avvia il server di sviluppo
pnpm run dev
