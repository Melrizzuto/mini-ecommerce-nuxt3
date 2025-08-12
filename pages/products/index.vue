<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/types/Product";

const route = useRoute();
const cat = computed(() => route.query.cat as string | undefined);

const {
  data: products,
  pending,
  error,
} = await useFetch<Product[]>("/api/products", {
  query: { cat },
  watch: [cat],
  key: () => `products:${cat.value ?? "all"}`,
  default: () => [],
});
</script>

<template>
  <section class="products-page">
    <h1 class="page-title">{{ cat ? `Products — ${cat}` : "Products" }}</h1>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Oops, something went wrong.</div>

    <div v-else class="product-grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}
.page-title {
  padding: 0 1rem;
}
</style>
