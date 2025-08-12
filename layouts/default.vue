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
