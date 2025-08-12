<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/useAuth";
import ThemeToggle from "@/components/ThemeToggle.vue";

const { isAuthenticated, logout } = useAuth();
const cart = useCartStore();
const { count: cartCount } = storeToRefs(cart);
const wishlist = useWishlistStore();

const isMenuOpen = ref(false);

const firstNavLink = ref<HTMLAnchorElement | null>(null);
let lastFocused: HTMLElement | null = null;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    lastFocused = document.activeElement as HTMLElement;
    nextTick(() => firstNavLink.value?.focus());
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    lastFocused?.focus?.();
  }
};
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
  lastFocused?.focus?.();
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

      <!-- Menu Links -->
      <nav
        id="primary-menu"
        class="nav-links"
        :class="{ open: isMenuOpen }"
        aria-label="Primary"
        :aria-hidden="!isMenuOpen"
      >
        <NuxtLink to="/" @click="closeMenu" ref="firstNavLink">Home</NuxtLink>
        <NuxtLink to="/products" @click="closeMenu">Products</NuxtLink>
        <NuxtLink to="/about" @click="closeMenu">About Us</NuxtLink>

        <!-- Auth in mobile menu -->
        <div class="auth-mobile">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login" class="auth-link" @click="closeMenu"
              >Login</NuxtLink
            >
            <NuxtLink to="/register" class="auth-link" @click="closeMenu"
              >Register</NuxtLink
            >
          </template>
          <template v-else>
            <button
              class="auth-link"
              @click="
                () => {
                  logout();
                  closeMenu();
                }
              "
            >
              Logout
            </button>
          </template>
        </div>
      </nav>

      <!-- Actions -->
      <div class="actions">
        <!-- Wishlist -->
        <NuxtLink to="/wishlist" class="icon-link" aria-label="Wishlist">
          ❤️
          <span v-if="wishlist.count" class="badge">{{ wishlist.count }}</span>
        </NuxtLink>

        <!-- Cart -->
        <NuxtLink to="/cart" class="icon-link" aria-label="Cart">
          🛒
          <span v-if="cartCount" class="badge">{{ cartCount }}</span>
        </NuxtLink>

        <!-- Theme toggle -->
        <ThemeToggle />

        <!-- Auth (desktop only) -->
        <div class="auth-desktop">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login" class="auth-link">Login</NuxtLink>
            <NuxtLink to="/register" class="auth-link">Register</NuxtLink>
          </template>
          <template v-else>
            <button class="auth-link" @click="logout">Logout</button>
          </template>
        </div>

        <!-- Hamburger -->
        <button
          class="hamburger"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-controls="primary-menu"
          aria-label="Toggle menu"
        >
          <span :class="{ open: isMenuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* --- Header Base --- */
.site-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0.5rem 0;
}
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
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
  color: inherit;
}

/* --- Nav Desktop --- */
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
}

/* --- Actions --- */
.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.icon-link {
  position: relative;
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--text);
}
.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: var(--text);
  color: var(--bg);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}
.auth-link {
  font-size: 0.9rem;
  color: var(--text);
  background: none;
  border: none;
  cursor: pointer;
}

/* show on desktop, hide on mobile */
.auth-desktop {
  display: flex;
  gap: 0.75rem;
}

/* hidden by default (desktop), shown on mobile */
.auth-mobile {
  display: none;
}

/* --- Mobile Styles --- */
.hamburger {
  display: none;
}
@media (max-width: 768px) {
  /* Menu Off-Canvas */
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    background: var(--bg);
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 1.25rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 999;
  }
  .nav-links.open {
    transform: translateX(0);
  }

  /* Auth inside drawer */
  .auth-mobile {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }

  /* Hide desktop auth on mobile */
  .auth-desktop {
    display: none;
  }

  /* Hamburger Button */
  /* Hamburger Button */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center; /* centra verticalmente */
    align-items: center; /* centra orizzontalmente */
    width: 32px; /* area clic un po’ più grande */
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1000;
    padding: 0;
  }

  .hamburger span,
  .hamburger span::before,
  .hamburger span::after {
    content: "";
    display: block;
    width: 20px; /* lunghezza barre */
    height: 2px; /* più sottile */
    background: var(--text);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.2s ease, background 0.3s ease;
    position: relative;
  }

  .hamburger span::before,
  .hamburger span::after {
    position: absolute;
    left: 0;
  }

  .hamburger span::before {
    transform: translateY(-6px); /* distanza verticale */
  }

  .hamburger span::after {
    transform: translateY(6px);
  }

  /* Stato aperto → icona X */
  .hamburger span.open {
    background: transparent; /* scompare la barra centrale */
  }
  .hamburger span.open::before {
    transform: rotate(40deg) translate(3px, 3px);
  }
  .hamburger span.open::after {
    transform: rotate(-40deg) translate(6px, -6px);
  }
}
</style>
