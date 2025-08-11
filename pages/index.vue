<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/server/types/Product";

const {
  data: products,
  pending,
  error,
} = await useFetch<Product[]>("/api/products", {
  key: "products:list",
  default: () => [],
});
</script>

<template>
  <div>
    <h1>Products</h1>

    <p v-if="pending">Caricamento…</p>
    <p v-else-if="error">Errore: {{ error.message }}</p>

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>
