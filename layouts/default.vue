<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="layout-root">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <Header />

    <main id="main-content" class="container">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.layout-root {
  /* Occupy full viewport height and let content fill remaining space below header */
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto; /* header | content | footer */
}

.skip-link {
  position: relative;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  left: 1rem;
  top: 1rem;
  width: auto;
  height: auto;
  padding: 0.5rem 0.75rem;
  background: #111;
  color: #fff;
  border-radius: 8px;
  z-index: 1000;
}
</style>
