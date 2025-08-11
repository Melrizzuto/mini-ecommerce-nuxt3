<script setup lang="ts">
const username = ref("");
const password = ref("");
const { isAuthenticated, login, logout } = useAuth();

const onLogin = async () => {
  try {
    await login(username.value, password.value);
    await navigateTo("/products");
  } catch (e: any) {
    alert(e?.data?.statusMessage || "Login fallito");
  }
};
</script>

<template>
  <section class="wrap">
    <h1>Login</h1>

    <form v-if="!isAuthenticated" @submit.prevent="onLogin" class="form">
      <input
        v-model="username"
        placeholder="username"
        autocomplete="username"
      />
      <input
        v-model="password"
        type="password"
        placeholder="password"
        autocomplete="current-password"
      />
      <button type="submit">Entra</button>
    </form>

    <div v-else class="ok">
      <p>Sei loggato.</p>
      <NuxtLink to="/products">Vai ai prodotti →</NuxtLink>
      <button @click="logout">Logout</button>
    </div>
  </section>
</template>

<style scoped>
.wrap {
  max-width: 360px;
  margin: 3rem auto;
  display: grid;
  gap: 0.75rem;
}
.form {
  display: grid;
  gap: 0.5rem;
}
input {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}
button {
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #000;
  background: #000;
  color: #fff;
}
.ok {
  display: grid;
  gap: 0.75rem;
}
</style>
