<template>
  <div>
    <h1>Prodotti</h1>
    <ul v-if="products">
      <li v-for="product in products" :key="product.id">
        <NuxtLink :to="`/products/${product.id}`">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p>
            <strong>{{ product.price }} €</strong>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const { data: products } = await useFetch<Product[]>("/api/products");
</script>
