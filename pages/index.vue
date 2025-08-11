<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/server/types/Product";

const { data: products } = await useFetch<Product[]>("/api/products", {
  key: "home:featured",
  default: () => [],
});
const featured = computed(() => products.value.slice(0, 8));
</script>

<template>
  <div class="landing home fade-in">
    <!-- HERO -->
    <section class="hero">
      <div class="blob blob-a"></div>
      <div class="blob blob-b"></div>

      <div class="hero-content">
        <p class="eyebrow">NEW DROP</p>
        <h1 class="headline">
          <span class="gradient-text">New Season.</span> New You.
        </h1>
        <p class="sub">
          Discover must-have pieces: clean essentials, standout accessories, and
          trend-driven tech.
        </p>
        <div class="cta">
          <NuxtLink to="/products" class="btn-asos">Shop now</NuxtLink>
          <NuxtLink to="/about" class="btn-asos-outline">Learn more</NuxtLink>
        </div>

        <div class="promo">
          <span class="tag">-20%</span>
          <span>Use code <strong>NEWYOU20</strong> at checkout</span>
        </div>
      </div>
    </section>

    <!-- USP BAR -->
    <section class="usp">
      <div class="usp-item">🚚 Fast shipping</div>
      <div class="usp-item">↩️ Easy returns</div>
      <div class="usp-item">💬 Support 7/7</div>
    </section>

    <!-- CATEGORIES -->
    <section class="cats">
      <NuxtLink
        :to="{ path: '/products', query: { cat: `men's clothing` } }"
        class="cat-card tilt"
      >
        <div class="cat-inner">
          <h3>Men</h3>
          <span>Everyday essentials</span>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/products', query: { cat: `women's clothing` } }"
        class="cat-card tilt"
      >
        <div class="cat-inner">
          <h3>Women</h3>
          <span>Clean & chic looks</span>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/products', query: { cat: 'jewelery' } }"
        class="cat-card tilt"
      >
        <div class="cat-inner">
          <h3>Jewelery</h3>
          <span>Details that matter</span>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/products', query: { cat: 'electronics' } }"
        class="cat-card tilt"
      >
        <div class="cat-inner">
          <h3>Electronics</h3>
          <span>Tech essentials</span>
        </div>
      </NuxtLink>
    </section>

    <!-- FEATURED -->
    <section class="featured">
      <div class="head">
        <h2>Featured</h2>
        <NuxtLink to="/products" class="link">View all →</NuxtLink>
      </div>

      <div class="grid">
        <div v-for="p in featured" :key="p.id">
          <ProductCard :product="p" />
        </div>
      </div>
    </section>
  </div>
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
/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: clamp(2rem, 6vw, 4rem) 1.25rem;
  overflow: hidden;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}
.hero-content {
  position: relative;
  max-width: 980px;
  text-align: center;
  z-index: 1;
}

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
.headline {
  margin: 0 0 0.4rem;
  line-height: 1.05;
  font-size: clamp(2.2rem, 6vw, 3.6rem);
  color: var(--text);
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

.sub {
  color: var(--muted);
  font-size: 1.05rem;
  margin: 0 auto 1.25rem;
  max-width: 680px;
}

.cta {
  display: inline-flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* promo pill */
.promo {
  margin-top: 1rem;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px dashed var(--border);
  border-radius: 999px;
  color: var(--text);
  background: color-mix(in oklab, var(--surface) 75%, transparent);
  font-size: 0.9rem;
}
.promo .tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  min-width: 38px;
  padding: 0 0.5rem;
  background: #111;
  color: #fff;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: 0.03em;
}

/* floating blobs (wow but subtle) */
.blob {
  position: absolute;
  filter: blur(40px);
  opacity: 0.45;
  pointer-events: none;
  mix-blend-mode: multiply;
  background: radial-gradient(closest-side, #b388ff, transparent);
  width: 480px;
  height: 480px;
  border-radius: 50%;
  animation: float 16s ease-in-out infinite;
}
.blob-b {
  background: radial-gradient(closest-side, #6ea8ff, transparent);
}
.blob-a {
  top: -15%;
  right: -10%;
}
.blob-b {
  bottom: -20%;
  left: -10%;
  animation-delay: -8s;
}
@keyframes float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, 20px, 0) scale(1.05);
  }
}
/* respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .blob {
    display: none;
  }
  .gradient-text {
    animation: none;
  }
}

/* ===== USP ===== */
.usp {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
.usp-item {
  background: var(--card-bg);
  border: 1px solid var(--card-bd);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  text-align: center;
  font-weight: 700;
  color: var(--text);
}
@media (max-width: 768px) {
  .usp {
    grid-template-columns: 1fr;
  }
}

/* ===== CATEGORIES ===== */
.cats {
  max-width: 1200px;
  margin: 1.25rem auto 0;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1000px) {
  .cats {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .cats {
    grid-template-columns: 1fr;
  }
}

.cat-card {
  position: relative;
  display: block;
  height: 190px;
  border: 1px solid var(--card-bd);
  border-radius: 14px;
  text-decoration: none;
  overflow: hidden;
  background: radial-gradient(
      100% 100% at 0% 0%,
      color-mix(in oklab, var(--surface) 80%, transparent),
      transparent 60%
    ),
    radial-gradient(
      120% 100% at 100% 100%,
      color-mix(in oklab, var(--surface) 65%, transparent),
      transparent 60%
    );
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.3s;
}
.tilt:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 14px 36px color-mix(in oklab, var(--text) 10%, transparent);
}
.cat-inner {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: end start;
  padding: 1rem;
}
.cat-inner h3 {
  margin: 0;
  color: var(--text);
  font-size: 1.2rem;
  letter-spacing: 0.02em;
}
.cat-inner span {
  color: var(--muted);
  font-size: 0.9rem;
}

/* ===== FEATURED ===== */
.featured {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.featured h2 {
  margin: 0;
  font-size: 1.4rem;
  color: var(--text);
}
.link {
  color: var(--text);
  text-decoration: none;
  font-weight: 700;
}
.link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
}

.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 800px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* ===== BUTTONS (ASOS) — no underline ever ===== */
.btn-asos,
.btn-asos-outline {
  text-decoration: none !important;
}

/* Solid */
.btn-asos {
  background: var(--btn-bg);
  color: var(--btn-fg);
  padding: 0.7rem 1.4rem;
  border: 2px solid var(--btn-bd);
  border-radius: 999px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s,
    transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 6px 18px color-mix(in oklab, var(--text) 8%, transparent);
}
.btn-asos:hover {
  background: var(--btn-bg-hover);
  color: var(--btn-fg-hover);
  border-color: var(--btn-bd);
  transform: translateY(-1px);
  box-shadow: 0 10px 28px color-mix(in oklab, var(--text) 12%, transparent);
}

/* Outline */
.btn-asos-outline {
  background: transparent;
  color: var(--text);
  padding: 0.7rem 1.4rem;
  border: 2px solid var(--text);
  border-radius: 999px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  transition: background-color 0.15s, color 0.15s, transform 0.15s,
    border-color 0.15s, box-shadow 0.15s;
}
.btn-asos-outline:hover {
  background: var(--text);
  color: var(--bg);
  transform: translateY(-1px);
  box-shadow: 0 10px 28px color-mix(in oklab, var(--text) 12%, transparent);
}
</style>
