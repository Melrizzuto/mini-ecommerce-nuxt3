<template>
  <div>
    <h1>Prodotti</h1>
    <div class="product-grid">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/products/${product.id}`"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="card-info">
          <h2>{{ product.name }}</h2>
          <p class="price">{{ product.price }} €</p>
        </div>
      </NuxtLink>
    </div>
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

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  padding: 1rem;
  background: #fafafa;
  transition: transform 0.2s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.product-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
}

.card-info h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.2rem;
}

.price {
  font-weight: bold;
  color: #1a1a1a;
}
</style>
