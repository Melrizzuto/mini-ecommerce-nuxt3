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
  <div class="landing">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>New Season. New You.</h1>
        <p>
          Discover must-have pieces: clean essentials, standout accessories, and
          trend-driven tech.
        </p>
        <div class="cta">
          <NuxtLink to="/products" class="btn-asos">Shop now</NuxtLink>
          <NuxtLink to="/about" class="btn-asos-outline">Learn more</NuxtLink>
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
        class="cat-card"
      >
        <div class="cat-inner">
          <h3>Men</h3>
          <span>Everyday essentials</span>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/products', query: { cat: `women's clothing` } }"
        class="cat-card"
      >
        <div class="cat-inner">
          <h3>Women</h3>
          <span>Clean & chic looks</span>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/products', query: { cat: 'jewelery' } }"
        class="cat-card"
      >
        <div class="cat-inner">
          <h3>Jewelery</h3>
          <span>Details that matter</span>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/products', query: { cat: 'electronics' } }"
        class="cat-card"
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
        <ProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* (stili identici alla versione precedente) */
.hero {
  position: relative;
  min-height: 64vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 3rem 1.25rem;
  background: radial-gradient(
      1200px 600px at 80% -10%,
      #f3f3f3 0%,
      transparent 60%
    ),
    radial-gradient(900px 500px at -10% 120%, #f6f6f6 0%, transparent 60%), #fff;
  border-bottom: 1px solid #eee;
}
.hero-content {
  max-width: 900px;
}
.hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}
.hero p {
  color: #555;
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
.usp {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
.usp-item {
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  text-align: center;
  font-weight: 600;
  color: #333;
}
@media (max-width: 768px) {
  .usp {
    grid-template-columns: 1fr;
  }
}
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
  height: 180px;
  border: 1px solid #eee;
  border-radius: 12px;
  text-decoration: none;
  overflow: hidden;
  background: linear-gradient(135deg, #f7f7f7, #ececec);
}
.cat-card:hover {
  transform: translateY(-2px);
  transition: transform 0.15s ease;
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
  color: #111;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
}
.cat-inner span {
  color: #666;
  font-size: 0.9rem;
}
.featured {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.featured .head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.featured h2 {
  margin: 0;
  font-size: 1.4rem;
}
.featured .link {
  color: #111;
  text-decoration: none;
  font-weight: 600;
}
.featured .link:hover {
  text-decoration: underline;
}
.grid {
  display: grid;
  gap: 3rem;
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
.btn-asos {
  background: #111;
  color: #fff;
  padding: 0.7rem 1.4rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s,
    transform 0.15s;
}
.btn-asos:hover {
  background: #fff;
  color: #111;
  border-color: #111;
  transform: translateY(-1px);
}
.btn-asos-outline {
  background: transparent;
  color: #111;
  padding: 0.7rem 1.4rem;
  border: 2px solid #111;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.9rem;
  transition: background-color 0.15s, color 0.15s, transform 0.15s;
}
.btn-asos-outline:hover {
  background: #111;
  color: #fff;
  transform: translateY(-1px);
}
</style>
