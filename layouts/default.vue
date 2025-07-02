<!-- layouts/default.vue -->
<template>
  <div>
    <header class="site-header">
      <nav>
        <NuxtLink to="/">Home</NuxtLink> |
        <NuxtLink to="/products">Prodotti</NuxtLink>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <p>&copy; 2025 Mini Ecommerce - Tutti i diritti riservati.</p>
    </footer>
  </div>
</template>

<style scoped>
.site-header {
  padding: 1rem;
  background: #222;
  color: white;
}
.site-header a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}
.site-footer {
  margin-top: 2rem;
  padding: 1rem;
  background: #eee;
  text-align: center;
  font-size: 0.9rem;
}
</style>
