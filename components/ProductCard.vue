<script setup lang="ts">
defineProps<{
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  };
}>();
</script>

<template>
  <li class="product-card">
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
