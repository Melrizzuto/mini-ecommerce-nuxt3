<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/server/types/Product";

// uso useFetch per recuperare la lista dei prodotti dall'api
const { data: products } = await useFetch<Product[]>("/api/products");
</script>

<template>
  <div>
    <!-- mostro il titolo della pagina -->
    <h1>Products</h1>

    <!-- creo una griglia di card prodotto usando il componente riutilizzabile -->
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style scoped>
/* imposto lo stile della griglia dei prodotti */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>
