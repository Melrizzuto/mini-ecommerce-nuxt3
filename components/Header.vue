<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/useAuth";
import ThemeToggle from "@/components/ThemeToggle.vue";

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
const { isAuthenticated, logout } = useAuth();

const cart = useCartStore();
const { count } = storeToRefs(cart); // reattivo e type-safe
</script>

<template>
  <header class="site-header">
    <div class="container header-content">
      <NuxtLink to="/" class="logo-link">
        <h1 class="logo">Mini ASOS</h1>
      </NuxtLink>
      <nav class="nav-links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/products">Products</NuxtLink>
        <NuxtLink to="/about">About Us</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
        <button v-else class="linklike" @click="logout">Logout</button>

        <NuxtLink to="/cart" class="cart-link">
          🛒
          <span v-if="count" class="badge">{{ count }}</span>
          <span class="sr-only">Go to cart</span>
        </NuxtLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.container {
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
  color: var(--text);
}

.logo-link {
  text-decoration: none;
  color: var(--text);
}
.logo-link:hover .logo {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

/* Toggle tema: più coerente con il dark */
.theme-toggle {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    transform 0.1s;
}
.theme-toggle:hover {
  background: var(--surface);
}
.theme-toggle:active {
  transform: scale(0.98);
}

.nav-links a,
.linklike,
.cart-link {
  font-weight: 500;
  text-decoration: none;
  color: var(--text);
  transition: color 0.2s ease;
}
.nav-links a:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
}

.linklike {
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
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
  background: #111; /* piccolo badge: resta scuro per contrasto */
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
