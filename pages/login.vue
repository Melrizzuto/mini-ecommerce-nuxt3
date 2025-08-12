<script setup lang="ts">
const username = ref("");
const password = ref("");
const { isAuthenticated, login, logout } = useAuth();

const onLogin = async () => {
  try {
    await login(username.value, password.value);
    await navigateTo("/products");
  } catch (e: any) {
    alert(e?.data?.statusMessage || "Login failed");
  }
};
</script>

<template>
  <section class="form-wrapper fade-in">
    <h1>Login</h1>

    <form v-if="!isAuthenticated" @submit.prevent="onLogin" class="form">
      <input
        v-model="username"
        placeholder="Username"
        autocomplete="username"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
      />
      <button class="btn-form" type="submit">Sign in</button>
    </form>

    <div v-else class="ok">
      <p>You are logged in.</p>
      <NuxtLink to="/products">Go to products →</NuxtLink>
      <button class="btn-form" @click="logout">Logout</button>
    </div>
  </section>
</template>

<style scoped>
/* ===== Animazione tipo card ===== */
</style>
