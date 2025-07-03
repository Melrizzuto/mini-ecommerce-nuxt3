<script setup lang="ts">
/* importo il tipo product dalla cartella types */
import type { Product } from "@/server/types/Product";

/* uso useFetch per ottenere i prodotti dall'api */
const { data: products } = await useFetch<Product[]>("/api/products");
</script>

<template>
  <div>
    <!-- titolo della pagina -->
    <h1>prodotti</h1>

    <!-- griglia dei prodotti -->
    <div class="product-grid">
      <!-- per ogni prodotto creo un link che porta alla pagina di dettaglio -->
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/products/${product.id}`"
        class="product-card"
      >
        <!-- immagine del prodotto -->
        <img :src="product.image" :alt="product.name" class="product-image" />

        <!-- info del prodotto: nome e prezzo -->
        <div class="card-info">
          <h2>{{ product.name }}</h2>
          <p class="price">{{ product.price }} €</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* griglia responsive: crea colonne flessibili per i prodotti */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* stile della card prodotto: bordo, sfondo chiaro, padding */
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  padding: 1rem;
  background: #fafafa;
  transition: transform 0.2s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

/* effetto al passaggio del mouse: solleva la card e aggiunge ombra */
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

/* immagine del prodotto: si adatta allo spazio e ha angoli arrotondati */
.product-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
}

/* titolo del prodotto nella card */
.card-info h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.2rem;
}

/* prezzo del prodotto evidenziato */
.price {
  font-weight: bold;
  color: #1a1a1a;
}
</style>
