<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/useAuth";
const { isAuthenticated, logout } = useAuth();

const cart = useCartStore();
const { count } = storeToRefs(cart); // reattivo e type-safe
</script>

<template>
  <header class="site-header">
    <div class="container header-content">
      <h1 class="logo">Mini ASOS</h1>
      <nav class="nav-links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/products">Products</NuxtLink>
        <NuxtLink to="/about">About Us</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
        <button v-else class="linklike" @click="logout">Logout</button>

        <NuxtLink to="/cart" class="cart-link">
          🛒
          <span v-if="count" class="badge">{{ count }}</span>
          <span class="sr-only">Vai al carrello</span>
        </NuxtLink>
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
  align-items: center;
}

.nav-links a {
  font-weight: 500;
  text-decoration: none;
  color: #1a1a1a;
}

.nav-links a:hover {
  text-decoration: underline;
}

.cart-link {
  position: relative;
  font-size: 1.2rem;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: #111;
  color: #fff;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 700;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
