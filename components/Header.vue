<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/useAuth";
import ThemeToggle from "@/components/ThemeToggle.vue";

const { isAuthenticated, logout } = useAuth();
const cart = useCartStore();
const { count } = storeToRefs(cart);

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const onClickOutside = (e: MouseEvent) => {
  const nav = document.querySelector(".nav-links");
  const btn = document.querySelector(".hamburger");
  if (
    isMenuOpen.value &&
    nav &&
    btn &&
    !nav.contains(e.target as Node) &&
    !btn.contains(e.target as Node)
  ) {
    closeMenu();
  }
};
onMounted(() => document.addEventListener("click", onClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", onClickOutside));
</script>

<template>
  <header class="site-header">
    <div class="container header-content">
      <!-- Logo -->
      <NuxtLink to="/" class="logo-link">
        <h1 class="logo">Mini ASOS</h1>
      </NuxtLink>

      <!-- Hamburger -->
      <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
        <span :class="{ open: isMenuOpen }"></span>
      </button>

      <!-- Menu -->
      <nav :class="['nav-links', { open: isMenuOpen }]">
        <NuxtLink to="/" @click="closeMenu">Home</NuxtLink>
        <NuxtLink to="/products" @click="closeMenu">Products</NuxtLink>
        <NuxtLink to="/about" @click="closeMenu">About Us</NuxtLink>

        <!-- Se NON loggato -->
        <template v-if="!isAuthenticated">
          <NuxtLink to="/register" @click="closeMenu">Register</NuxtLink>
          <NuxtLink to="/login" @click="closeMenu">Login</NuxtLink>
        </template>

        <!-- Se loggato -->
        <template v-else>
          <button
            class="linklike btn-logout"
            @click="
              () => {
                logout();
                closeMenu();
              }
            "
          >
            Logout
          </button>
          <NuxtLink to="/cart" class="cart-link" @click="closeMenu">
            🛒
            <span v-if="count" class="badge">{{ count }}</span>
          </NuxtLink>
        </template>

        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
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
}

/* Hamburger animato */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 20px;
  position: relative;
}

.hamburger span,
.hamburger span::before,
.hamburger span::after {
  display: block;
  background: var(--text);
  height: 3px;
  width: 100%;
  border-radius: 3px;
  position: absolute;
  transition: 0.3s ease;
}

.hamburger span::before {
  content: "";
  top: -8px;
}

.hamburger span::after {
  content: "";
  top: 8px;
}

.hamburger span.open {
  background: transparent;
}

.hamburger span.open::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger span.open::after {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Menu desktop */
.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.nav-links a,
.linklike,
.cart-link {
  text-decoration: none;
  color: var(--text);
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
}
.cart-link {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.cart-link .badge {
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
/* Bottone Logout stile link elegante */
.btn-logout {
  background: transparent;
  border: none;
  color: var(--muted);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.btn-logout:hover {
  color: var(--btn-fg-hover);
  background-color: var(--surface);
}

.btn-logout:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--btn-bd);
}

/* Mobile */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    background: var(--bg);
    flex-direction: column;
    height: 100%;
    width: 220px;
    padding: 80px 20px;
    gap: 1.5rem;
    transform: translateX(100%);
    opacity: 0;
    z-index: 100;
  }

  .nav-links.open {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
