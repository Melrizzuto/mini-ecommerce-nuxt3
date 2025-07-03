<script setup lang="ts">
/* importo il tipo product dalla cartella types */
import type { Product } from "@/server/types/Product";

/* prendo la rotta corrente usando useRoute() per leggere l'id che sta nell'url */
const route = useRoute();
const id = route.params.id as string;

/* uso useFetch per chiamare l'api e ottenere i dati del prodotto specifico usando l'id preso dalla rotta */
const { data: product, error } = await useFetch<Product>(`/api/products/${id}`);

/* se c'è un errore nella chiamata, lo stampo in console */
if (error.value) {
  console.error("Errore fetch prodotto:", error.value);
}
</script>

<template>
  <!-- se il prodotto esiste mostro i dettagli -->
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" :alt="product.name" width="200" />
    <p>{{ product.description }}</p>
    <p>
      <strong>{{ product.price }} €</strong>
    </p>
    <!-- link per tornare alla lista dei prodotti -->
    <NuxtLink to="/products">← torna alla lista</NuxtLink>
  </div>

  <!-- se non trovo il prodotto mostro un messaggio di errore -->
  <div v-else>
    <p>prodotto non trovato.</p>
  </div>
</template>
