<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/useAuth";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const { isAuthenticated, logout } = useAuth();
const cart = useCartStore();
const { count: cartCount } = storeToRefs(cart);
const wishlist = useWishlistStore();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const headerEl = ref<HTMLElement | null>(null);
const navEl = ref<HTMLElement | null>(null);
const hamburgerEl = ref<HTMLElement | null>(null);

const focusablesSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getNavFocusables() {
  if (!navEl.value) return [] as HTMLElement[];
  return Array.from(
    navEl.value.querySelectorAll<HTMLElement>(focusablesSelector)
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

function trapFocus(e: KeyboardEvent) {
  if (!isMenuOpen.value || e.key !== "Tab") return;

  const nav = navEl.value;
  const hamburger = hamburgerEl.value as HTMLElement | null;
  if (!nav || !hamburger) return;

  const navNodes = getNavFocusables();
  const allNodes = [hamburger, ...navNodes];
  if (!allNodes.length) return;

  const first = allNodes[0]; // hamburger
  const last = allNodes[allNodes.length - 1];
  const firstNav = navNodes[0] ?? hamburger;
  const active = document.activeElement as HTMLElement | null;

  // Se il focus non è nel menu o sull'hamburger, portalo all'hamburger
  if (active && !nav.contains(active) && active !== hamburger) {
    e.preventDefault();
    first.focus();
    return;
  }

  // Tab avanti dall'hamburger -> primo link del menu
  if (!e.shiftKey && active === hamburger) {
    e.preventDefault();
    firstNav.focus();
    return;
  }

  // Shift+Tab dal primo link -> hamburger
  if (e.shiftKey && active === firstNav) {
    e.preventDefault();
    hamburger.focus();
    return;
  }

  // Wrap: mantieni il focus dentro al drawer
  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
    return;
  }
  if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
    return;
  }

  // Rete di sicurezza se per qualche motivo uscisse
  if (active && !allNodes.includes(active)) {
    e.preventDefault();
    first.focus();
  }
}

function setScrollLock(lock: boolean) {
  if (lock) {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
}

const updateHeaderHeight = () => {
  const h = headerEl.value?.offsetHeight || 64;
  document.documentElement.style.setProperty("--header-h", `${h}px`);
};

const firstNavLink = ref<HTMLAnchorElement | null>(null);
let lastFocused: HTMLElement | null = null;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    lastFocused = document.activeElement as HTMLElement;
    setScrollLock(true);
    // Focus all'hamburger (che ora è X) dopo update DOM
    nextTick(() => {
      hamburgerEl.value?.focus();
    });
  } else {
    setScrollLock(false);
    lastFocused?.focus?.();
  }
};
const closeMenu = () => {
  isMenuOpen.value = false;
  setScrollLock(false);
  lastFocused?.focus?.();
};

const onClickOutside = (e: MouseEvent) => {
  const nav = navEl.value;
  const btn = hamburgerEl.value;
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

function handleScroll() {
  isScrolled.value = window.scrollY > 4;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isMenuOpen.value) {
    e.preventDefault();
    closeMenu();
  }
  trapFocus(e);
}

function handleHamburgerKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (isMenuOpen.value) {
      closeMenu();
    } else {
      toggleMenu();
    }
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  updateHeaderHeight();
  const ro = new ResizeObserver(updateHeaderHeight);
  if (headerEl.value instanceof HTMLElement) {
    ro.observe(headerEl.value);
  }
  window.addEventListener("resize", updateHeaderHeight);
  window.addEventListener("keydown", onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateHeaderHeight);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <header ref="headerEl" class="site-header" :class="{ scrolled: isScrolled }">
    <div class="header-wrapper header-content">
      <!-- Logo -->
      <NuxtLink to="/" class="logo-link">
        <h1 class="logo">Mini ASOS</h1>
      </NuxtLink>

      <!-- Menu Links -->
      <nav
        id="primary-menu"
        ref="navEl"
        class="nav-links"
        :class="{ open: isMenuOpen }"
        aria-label="Primary"
        :aria-hidden="!isMenuOpen"
        :tabindex="isMenuOpen ? 0 : -1"
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

      <!-- Backdrop -->
      <div
        v-if="isMenuOpen"
        class="backdrop"
        @click="closeMenu"
        aria-hidden="true"
      ></div>

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
          ref="hamburgerEl"
          class="hamburger"
          @click="isMenuOpen ? closeMenu() : toggleMenu()"
          @keydown="handleHamburgerKeydown"
          :aria-expanded="isMenuOpen"
          aria-controls="primary-menu"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0.5rem 0;
}
.header-wrapper {
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
    height: 100dvh;
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
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 32px;
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
    width: 20px;
    height: 2px;
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
    transform: translateY(-6px);
  }

  .hamburger span::after {
    transform: translateY(6px);
  }

  /* Stato aperto → icona X */
  .hamburger span.open {
    background: transparent;
  }
  .hamburger span.open::before {
    transform: translateY(0) rotate(45deg);
  }
  .hamburger span.open::after {
    transform: translateY(0) rotate(-45deg);
  }

  /* Backdrop behind the drawer */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    z-index: 998;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-links {
      transition: none;
    }
    .backdrop {
      backdrop-filter: none;
    }
  }
}
</style>
