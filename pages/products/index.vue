<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/server/types/Product";

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

useSeoMeta({
  title: computed(() => (cat.value ? `Products — ${cat.value}` : "Products")),
  description:
    "Browse our curated list of products across categories. Fast, simple, and responsive shopping experience.",
  ogTitle: computed(() => (cat.value ? `Products — ${cat.value}` : "Products")),
  ogDescription:
    "Browse our curated list of products across categories. Fast, simple, and responsive shopping experience.",
});
</script>

<template>
  <section class="products-page" aria-live="polite">
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
  padding: 0 1rem;
}
.page-title {
  padding: 0 1rem;
}
</style>
