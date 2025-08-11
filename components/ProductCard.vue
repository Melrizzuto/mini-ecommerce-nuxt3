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
  <!-- La card è un link alla pagina prodotto, ma il bottone non naviga (stop+prevent) -->
  <NuxtLink :to="`/products/${product.id}`" class="product-card">
    <!-- immagine uniforme -->
    <img
      class="product-image"
      :src="product.image"
      :alt="product.title || product.name"
      loading="lazy"
    />

    <!-- info con spazio flessibile per spingere il bottone in basso -->
    <div class="card-info">
      <h2 class="card-title">{{ product.title || product.name }}</h2>
      <p class="price">{{ product.price.toFixed(2) }} €</p>
    </div>

    <!-- bottone stile ASOS -->
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
/* ===== Card layout (uniforme e stabile) ===== */
.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%; /* tutte le card stessa altezza nella grid */
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  background: #fafafa;
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* immagine coerente */
.product-image {
  width: 100%;
  height: 260px;
  object-fit: contain; /* contain per ecommerce */
  background: #fff;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
}

/* blocco info che cresce e spinge il bottone in basso */
.card-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.35rem;
}
.card-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em; /* riserva spazio per 2 righe */
}
.price {
  margin: 0;
  font-weight: 700;
  color: #111;
}

/* ===== Bottone stile ASOS ===== */
.btn-cart {
  --bg: #111;
  --fg: #fff;
  --bd: #111;
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
  transition: background-color 0.15s, color 0.15s, border-color 0.15s,
    transform 0.12s, box-shadow 0.15s;
  margin-top: auto; /* resta sempre in basso */
}
.btn-cart:hover {
  --bg: #fff;
  --fg: #111;
  --bd: #111;
  transform: translateY(-1px);
}
.btn-cart:active {
  transform: translateY(0);
}
.btn-cart:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(17, 17, 17, 0.14);
}

/* stato “added” */
.added {
  --bg: #16a34a;
  --fg: #fff;
  --bd: #16a34a;
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

/* riduci animazioni per accessibilità */
@media (prefers-reduced-motion: reduce) {
  .product-card,
  .btn-cart {
    transition: none;
  }
}
</style>
