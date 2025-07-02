<template>
  <div>
    <header class="site-header">
      <div class="container header-content">
        <h1 class="logo">Mini ASOS</h1>
        <nav class="nav-links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/products">Prodotti</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container">
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <p>&copy; 2025 Mini Ecommerce - Tutti i diritti riservati.</p>
    </footer>
  </div>
</template>

<style scoped>
.site-header {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  font-weight: 500;
  text-decoration: none;
  color: #1a1a1a;
}

.nav-links a:hover {
  text-decoration: underline;
}

.site-footer {
  margin-top: 3rem;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}
</style>
