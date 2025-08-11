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
  <section class="wrap">
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
      <button type="submit">Sign in</button>
    </form>

    <div v-else class="ok">
      <p>You are logged in.</p>
      <NuxtLink to="/products">Go to products →</NuxtLink>
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
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}
button:hover {
  background: #333;
}
button:active {
  transform: scale(0.98);
}
.ok {
  display: grid;
  gap: 0.75rem;
}
</style>
