<template>
  <div class="home-page">
    <h1 class="title">Welcome to the Mini E-commerce 👋</h1>
    <p class="subtitle">
      Discover our selection of products made for you with love and a touch of
      style ✨
    </p>
    <NuxtLink to="/products" class="cta-button">Browse Products</NuxtLink>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
  max-width: 600px;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.cta-button:hover {
  background-color: #333;
}
</style>
