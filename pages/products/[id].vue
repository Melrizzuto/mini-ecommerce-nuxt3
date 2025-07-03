<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const route = useRoute();
const id = route.params.id as string;
const { data: product, error } = await useFetch<Product>(`/api/products/${id}`);

if (error.value) {
  console.error("Errore fetch prodotto:", error.value);
}
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" :alt="product.name" width="200" />
    <p>{{ product.description }}</p>
    <p>
      <strong>{{ product.price }} €</strong>
    </p>
    <NuxtLink to="/products">← Torna alla lista</NuxtLink>
  </div>
  <div v-else>
    <p>Prodotto non trovato.</p>
  </div>
</template>
