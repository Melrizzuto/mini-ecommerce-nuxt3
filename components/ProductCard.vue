<script setup lang="ts">
import type { Product } from "@/server/types/Product";
import { useCartStore } from "@/stores/cart";

// definisco la prop che ricevo dal componente padre, è un oggetto di tipo Product
defineProps<{
  product: Product;
}>();

const cart = useCartStore();

const addToCart = (product: Product) => {
  cart.add(product, 1);
};
</script>

<template>
  <!-- creo un link che porta alla pagina di dettaglio del prodotto -->
  <NuxtLink :to="`/products/${product.id}`" class="product-card">
    <!-- mostro l'immagine del prodotto -->
    <img :src="product.image" :alt="product.title" class="product-image" />

    <!-- mostro nome e prezzo del prodotto -->
    <div class="card-info">
      <h2>{{ product.title }}</h2>
      <p class="price">{{ product.price }} €</p>
    </div>
    <button @click.stop.prevent="addToCart(product)">
      Aggiungi al carrello
    </button>
  </NuxtLink>
</template>

<style scoped>
/* stile della card prodotto */
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

/* effetto hover per sollevare leggermente la card */
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

/* stile per l'immagine del prodotto */
.product-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
}

/* stile per il nome del prodotto */
.card-info h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.2rem;
}

/* stile per il prezzo del prodotto */
.price {
  font-weight: bold;
  color: #1a1a1a;
}
</style>
