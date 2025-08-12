<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; message?: string } }>();
const status = computed(() => props.error?.statusCode || 500);
const title = computed(() =>
  status.value === 404 ? "Page not found" : "Something went wrong"
);
useSeoMeta({ title: title });
</script>

<template>
  <section class="error container">
    <h1>{{ title }}</h1>
    <p v-if="error?.message" class="muted">{{ error.message }}</p>
    <div class="actions">
      <NuxtLink to="/" class="btn-asos">Go Home</NuxtLink>
      <NuxtLink to="/products" class="btn-asos-outline">Browse Products</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin-inline: auto;
  padding: 2rem 1rem;
}
.muted { color: #6b7280; }
.actions { display: flex; gap: .75rem; margin-top: 1rem; }
.btn-asos, .btn-asos-outline {
  text-decoration: none !important;
  border-radius: 999px;
  padding: 0.7rem 1.4rem;
  font-weight: 800; text-transform: uppercase; letter-spacing: .02em; font-size: .9rem;
  display: inline-flex; align-items: center; justify-content: center;
}
.btn-asos { background:#111; color:#fff; border:2px solid #111; }
.btn-asos-outline { background:transparent; color:#111; border:2px solid #111; }
</style>