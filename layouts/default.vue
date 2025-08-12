<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to content</a>
    <Header />

    <main id="main-content" class="container">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
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
