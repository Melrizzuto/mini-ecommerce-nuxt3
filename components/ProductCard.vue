<script setup lang="ts">
import { ref, computed } from "vue";
import type { Product } from "@/server/types/Product";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const wishlist = useWishlistStore();

const added = ref(false);

const isWished = computed(() => wishlist.isInWishlist(props.product.id));

function addToCart() {
  cart.add(props.product, 1);
  added.value = true;
  setTimeout(() => (added.value = false), 1100);
}

function toggleWishlist() {
  wishlist.toggle(props.product);
}
</script>

<template>
  <article class="product-card fade-in">
    <!-- Media / overlay wish -->
    <div class="media">
      <NuxtLink
        :to="`/products/${product.id}`"
        class="image-wrap"
        aria-label="Open product"
      >
        <NuxtImg
          class="image"
          :src="product.image"
          :alt="product.title"
          loading="lazy"
          decoding="async"
          format="webp"
          :width="600"
          :height="450"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
        />
      </NuxtLink>

      <button
        class="wish"
        :class="{ active: isWished }"
        @click.stop.prevent="toggleWishlist"
        :aria-pressed="isWished"
        :title="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
        aria-label="Toggle wishlist"
      >
        <svg
          v-if="!isWished"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M20.8 4.6c-1.9-1.9-5-1.9-6.9 0L12 6.5l-1.9-1.9c-1.9-1.9-5-1.9-6.9 0s-1.9 5 0 6.9l8.8 8.8 8.8-8.8c1.9-1.9 1.9-5 0-6.9z"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
    </div>

    <!-- Info -->
    <NuxtLink :to="`/products/${product.id}`" class="info">
      <h2 class="title">{{ product.title }}</h2>
      <p class="price">{{ product.price.toFixed(2) }} €</p>
    </NuxtLink>

    <!-- Actions -->
    <div class="actions">
      <button
        class="btn btn--solid w-full"
        :class="{ 'is-added': added }"
        @click.stop.prevent="addToCart"
        aria-label="Add to cart"
      >
        <span v-if="!added">Add to cart</span>
        <span v-else>Added ✓</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
/* ===== Animazione all'ingresso ===== */
@keyframes fadeInCard {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in {
  animation: fadeInCard 0.5s ease-out forwards;
}
/* Card */
.product-card {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 0.8rem;
  height: 100%;
  background: var(--card-bg);
  border: 1px solid var(--card-bd);
  border-radius: 12px;
  padding: 1rem;
  color: var(--text);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px color-mix(in oklab, var(--text) 12%, transparent);
}

/* Media + overlay */
.media {
  position: relative;
}
.image-wrap {
  display: block;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  overflow: hidden;
}
.image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
}

/* Heart button (overlay) */
.wish {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 36px;
  width: 36px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in oklab, var(--surface) 85%, transparent);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
}
.wish:hover {
  transform: translateY(-2px);
}
.wish.active {
  background: color-mix(in oklab, #ff6475 25%, var(--surface));
  border-color: color-mix(in oklab, #ff6475 45%, var(--border));
  color: #ff3347;
}

/* Info */
.info {
  display: grid;
  gap: 0.35rem;
  text-decoration: none;
  color: inherit;
}
.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.3em * 2);
}
.price {
  margin: 0;
  font-weight: 700;
}

/* Actions */
.actions {
  margin-top: 0.2rem;
}

/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.12s,
    box-shadow 0.2s;
  border: 2px solid var(--btn-bd);
}
.btn--solid {
  background: var(--btn-bg);
  color: var(--btn-fg);
}
.btn--solid:hover {
  background: var(--btn-bg-hover);
  color: var(--btn-fg-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px color-mix(in oklab, var(--text) 10%, transparent);
}
.btn.is-added {
  background: #16a34a;
  border-color: #16a34a;
  color: #fff;
}

/* Utility */
.w-full {
  width: 100%;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .product-card,
  .btn,
  .wish {
    transition: none;
  }
}
</style>
