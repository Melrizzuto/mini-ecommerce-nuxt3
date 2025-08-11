<script setup lang="ts">
import type { Product } from "@/server/types/Product";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;

const errorMessage = ref("");
const isLoading = ref(true);

const { data: product, error } = await useFetch<Product>(`/api/products/${id}`);

if (error.value) {
  console.error("Error fetching product:", error.value);
  errorMessage.value = "Failed to load product. Please try again later.";
}

isLoading.value = false;
</script>

<template>
  <div>
    <div v-if="isLoading">
      <p>Loading product...</p>
    </div>

    <div v-else-if="errorMessage">
      <p>{{ errorMessage }}</p>
      <NuxtLink to="/products">← Back to product list</NuxtLink>
    </div>

    <div v-else-if="product">
      <h1>{{ product.title }}</h1>
      <img :src="product.image" :alt="product.title" width="200" />
      <p>{{ product.description }}</p>
      <p>
        <strong>{{ product.price }} €</strong>
      </p>
      <NuxtLink to="/products">← Back to product list</NuxtLink>
    </div>

    <div v-else>
      <p>Product not found.</p>
      <NuxtLink to="/products">← Back to product list</NuxtLink>
    </div>
  </div>
</template>
