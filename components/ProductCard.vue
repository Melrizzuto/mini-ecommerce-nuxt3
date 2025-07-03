<script setup lang="ts">
/* importo il tipo Product dalla cartella types */
import type { Product } from "@/server/types/Product";

/* definisco che questo componente riceve una prop chiamata "product" di tipo Product */
defineProps<{
  product: Product;
}>();
</script>

<template>
  <li class="product-card">
    <!-- link alla pagina del prodotto -->
    <NuxtLink :to="`/products/${product.id}`">
      <h2>{{ product.name }}</h2>
    </NuxtLink>

    <p>{{ product.description }}</p>

    <p>
      <strong>{{ product.price }} €</strong>
    </p>
  </li>
</template>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>
