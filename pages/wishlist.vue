<script setup lang="ts">
import { useWishlistStore } from "@/stores/wishlist";
import ProductCard from "@/components/ProductCard.vue";

const wishlist = useWishlistStore();
</script>

<template>
  <section class="wishlist-page">
    <h1>Your Wishlist</h1>

    <div v-if="wishlist.items.length" class="wishlist-grid">
      <ProductCard
        v-for="product in wishlist.items"
        :key="product.id"
        :product="product"
      />
    </div>

    <p v-else class="empty">
      No items in your wishlist.
      <NuxtLink to="/products">Check out our products</NuxtLink>
    </p>
  </section>
</template>

<style scoped>
.wishlist-page {
  padding: 3rem 2rem;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.empty {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-light);
}
</style>
