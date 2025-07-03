<template>
  <header class="site-header">
    <div class="container header-content">
      <h1 class="logo">Mini ASOS</h1>
      <nav class="nav-links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/products">Prodotti</NuxtLink>
        <NuxtLink to="/about">Chi Siamo</NuxtLink>
      </nav>
    </div>
  </header>
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
</style>
