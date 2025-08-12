<script setup lang="ts">
import type { Product } from "@/server/types/Product";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const id = route.params.id as string;

const errorMessage = ref("");
const isLoading = ref(true);
const qty = ref(1);
const added = ref(false);

const cart = useCartStore();

const { data: product, error } = await useFetch<Product>(`/api/products/${id}`);

if (error.value) {
  console.error("Error fetching product:", error.value);
  errorMessage.value = "Failed to load product. Please try again later.";
}

isLoading.value = false;

watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: `${product.value.title}`,
      description: product.value.description,
      ogTitle: product.value.title,
      ogDescription: product.value.description,
      ogImage: product.value.image,
      twitterCard: "summary_large_image",
    });

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.value.title,
      image: [product.value.image],
      description: product.value.description,
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.value.price,
        availability: "https://schema.org/InStock",
      },
      aggregateRating: product.value.rating
        ? {
            "@type": "AggregateRating",
            ratingValue: product.value.rating.rate,
            reviewCount: product.value.rating.count,
          }
        : undefined,
    };

    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    });
  }
});

function addToCart() {
  if (!product.value) return;
  cart.add(product.value, Math.max(1, qty.value));
  added.value = true;
  setTimeout(() => (added.value = false), 1200);
}
</script>

<template>
  <div class="pdp container">
    <!-- Loading -->
    <div
      v-if="isLoading"
      class="pdp__loading"
      aria-busy="true"
      aria-live="polite"
    >
      <div class="skeleton skeleton--image" />
      <div class="skeleton skeleton--title" />
      <div class="skeleton skeleton--text" />
      <div class="skeleton skeleton--price" />
    </div>

    <!-- Error -->
    <div v-else-if="errorMessage" class="state state--error" role="status">
      <p class="state__message">{{ errorMessage }}</p>
      <NuxtLink to="/products" class="btn-asos-outline">← Back</NuxtLink>
    </div>

    <!-- Content -->
    <div v-else-if="product" class="pdp__grid fade-in">
      <!-- Gallery -->
      <div class="pdp__gallery">
        <div class="pdp__image-wrapper">
          <NuxtImg
            class="pdp__image"
            :src="product.image"
            :alt="product.title"
            width="800"
            height="800"
            loading="eager"
            decoding="async"
            format="webp"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
          />
        </div>
      </div>

      <!-- Info -->
      <div class="pdp__info">
        <p class="eyebrow" v-if="product.category">{{ product.category }}</p>
        <h1 class="pdp__title">
          <span class="gradient-text">{{ product.title }}</span>
        </h1>

        <div class="pdp__meta" v-if="product.rating">
          <span class="rating">★ {{ product.rating.rate }}</span>
          <span class="muted">({{ product.rating.count }} reviews)</span>
        </div>

        <p class="pdp__description">{{ product.description }}</p>

        <p class="pdp__price" aria-label="price">
          <span class="price">{{ product.price.toFixed(2) }} €</span>
        </p>

        <div class="pdp__actions">
          <div class="qty">
            <button @click="qty = Math.max(1, qty - 1)" aria-label="Decrease">
              −
            </button>
            <input
              type="number"
              min="1"
              :value="qty"
              @input="
                qty = Math.max(
                  1,
                  Number(($event.target as HTMLInputElement).value)
                )
              "
              aria-label="Quantity"
            />
            <button @click="qty = qty + 1" aria-label="Increase">+</button>
          </div>

          <button
            type="button"
            class="btn-asos"
            :class="{ added }"
            @click="addToCart"
          >
            {{ added ? "Added ✓" : "Add to cart" }}
          </button>

          <NuxtLink to="/products" class="btn-asos-outline">← Back</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="state state--empty" role="status">
      <p class="state__message">Product not found.</p>
      <NuxtLink to="/products" class="btn-asos-outline">← Back</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* ===== Tiny entrance animation ===== */
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

/* ===== Tokens ===== */
:root {
  --bg: #ffffff;
  --text: #111315;
  --muted: #6b7280;
  --border: #e5e7eb;
  --surface: #f8fafc;

  --btn-bg: #111;
  --btn-fg: #fff;
  --btn-bd: #111;
  --btn-bg-hover: #000;
  --btn-fg-hover: #fff;

  --shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  --radius: 16px;
  --radius-lg: 20px;
  --maxw: 1120px;
}

.container {
  max-width: var(--maxw);
  margin-inline: auto;
  padding: clamp(16px, 3vw, 32px);
  color: var(--text);
}

/* ===== Top micro UI ===== */
.eyebrow {
  display: inline-block;
  font-weight: 700;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text);
  background: color-mix(in oklab, var(--surface) 70%, transparent);
  margin-bottom: 0.75rem;
}
.gradient-text {
  background: linear-gradient(90deg, #6ea8ff, #b388ff, #ff88b3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: hue 10s linear infinite;
}
@keyframes hue {
  to {
    filter: hue-rotate(360deg);
  }
}

/* ===== Layout ===== */
.pdp__grid {
  display: grid;
  gap: 32px;
}
@media (min-width: 768px) {
  .pdp__grid {
    grid-template-columns: 1.1fr 1fr;
    align-items: start;
  }
}

/* ===== Gallery ===== */

.pdp__image {
  display: block;
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: calc(var(--radius-lg) - 6px);
  object-fit: fill;
}
.pdp__gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

/* ===== Info ===== */
.pdp__title {
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.2;
  margin: 0 0 8px 0;
}
.pdp__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.rating {
  font-weight: 700;
}
.muted {
  color: var(--muted);
}

.pdp__description {
  color: var(--muted);
  font-size: clamp(14px, 1.2vw, 16px);
  line-height: 1.7;
  margin: 0 0 20px 0;
}

.pdp__price .price {
  display: inline-block;
  font-weight: 800;
  font-size: clamp(18px, 2vw, 24px);
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  box-shadow: var(--shadow);
}

/* ===== Actions ===== */
.pdp__actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
  align-items: center;
}

/* Quantity pill */
.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.qty button {
  border: 0;
  background: var(--surface);
  color: var(--text);
  padding: 0.5rem 0.7rem;
  cursor: pointer;
}
.qty input {
  width: 64px;
  text-align: center;
  border: 0;
  padding: 0.45rem;
  background: #fff;
}

/* ===== Buttons ===== */
.btn-asos,
.btn-asos-outline {
  text-decoration: none !important;
  border-radius: 999px;
  padding: 0.7rem 1.4rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s,
    transform 0.15s, box-shadow 0.15s;
}

/* Solid */
.btn-asos {
  background: var(--btn-bg);
  color: var(--btn-fg);
  border: 2px solid var(--btn-bd);
  box-shadow: 0 6px 18px color-mix(in oklab, var(--text) 8%, transparent);
}
.btn-asos:hover {
  background: var(--btn-bg-hover);
  color: var(--btn-fg-hover);
}
.btn-asos.added {
  background: #16a34a;
  border-color: #16a34a;
  color: #fff;
}

/* Outline */
.btn-asos-outline {
  background: transparent;
  color: var(--text);
  border: 2px solid var(--text);
}
.btn-asos-outline:hover {
  background: var(--text);
  color: var(--bg);
}

/* ===== States & Skeleton ===== */
.state {
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  padding: 32px;
  text-align: center;
}
.state__message {
  margin: 0 0 12px 0;
}

.pdp__loading {
  display: grid;
  gap: 12px;
}
.skeleton {
  position: relative;
  overflow: hidden;
  background: #f3f4f6;
  border-radius: var(--radius);
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.04),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}
.skeleton--image {
  height: clamp(280px, 40vw, 520px);
}
.skeleton--title {
  height: 28px;
  width: 70%;
}
.skeleton--text {
  height: 80px;
  width: 100%;
}
.skeleton--price {
  height: 36px;
  width: 140px;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .fade-in,
  .gradient-text {
    animation: none;
  }
}
</style>
