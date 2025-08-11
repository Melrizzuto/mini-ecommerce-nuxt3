<script setup lang="ts">
import type { Product } from "@/server/types/Product";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const added = ref(false);

function addToCart() {
  cart.add(props.product, 1);
  added.value = true;
  setTimeout(() => (added.value = false), 1200);
}
</script>

<template>
  <!-- Card prodotto con animazione di ingresso -->
  <NuxtLink :to="`/products/${product.id}`" class="product-card">
    <img
      class="product-image"
      :src="product.image"
      :alt="product.title || product.title"
      loading="lazy"
    />

    <div class="card-info">
      <h2 class="card-title">{{ product.title || product.title }}</h2>
      <p class="price">{{ product.price.toFixed(2) }} €</p>
    </div>

    <button
      class="btn-cart"
      :class="{ added }"
      @click.stop.prevent="addToCart"
      aria-label="Add to cart"
    >
      <span class="btn-inner">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 4H5L4 6v2h2l3.6 7.6c.16.28.46.46.78.46h7.9c.41 0 .78-.26.92-.65L22 9H8.42"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="label">{{ added ? "Added ✓" : "Add to cart" }}</span>
      </span>
    </button>
  </NuxtLink>
</template>

<style scoped>
/* ===== Animazione all'ingresso ===== */
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;
  background: var(--card-bg);
  border: 1px solid var(--card-bd);
  border-radius: 12px;
  padding: 1rem;
  text-decoration: none;
  color: var(--text);
  text-align: center;
  animation: fadeUp 0.5s ease forwards;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.product-card:hover {
  transform: translateY(-6px) rotate3d(1, 1, 0, 3deg);
  box-shadow: 0 12px 30px color-mix(in oklab, var(--text) 12%, transparent);
}

.product-image {
  width: 100%;
  height: 260px;
  object-fit: contain;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.card-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.card-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  min-height: calc(1.3em * 2);
}
.price {
  margin: 0;
  font-weight: 700;
  color: var(--text);
}

/* ===== Bottone stile ASOS migliorato ===== */
.btn-cart {
  --bg: var(--btn-bg);
  --fg: var(--btn-fg);
  --bd: var(--btn-bd);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg);
  color: var(--fg);
  border: 2px solid var(--bd);
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.12s ease,
    box-shadow 0.2s ease;
  margin-top: auto;
}
.btn-cart:hover {
  --bg: var(--btn-bg-hover);
  --fg: var(--btn-fg-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px color-mix(in oklab, var(--text) 10%, transparent);
}
.btn-cart:active {
  transform: translateY(0);
}
.btn-cart:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--text) 20%, transparent);
}

.added {
  --bg: #16a34a;
  --fg: #fff;
  --bd: #16a34a;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.icon {
  width: 18px;
  height: 18px;
}
.btn-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .btn-cart {
    transition: none;
    animation: none;
  }
}
</style>
