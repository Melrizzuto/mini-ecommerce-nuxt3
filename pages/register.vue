<script setup lang="ts">
const username = ref("");
const password = ref("");
const { login } = useAuth();

const onRegister = async () => {
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: { username: username.value, password: password.value },
    });
    // registrato + cookie impostato: opzionale loggare di nuovo
    await navigateTo("/products");
  } catch (e: any) {
    alert(e?.data?.statusMessage || "Registration failed");
  }
};
</script>

<template>
  <section class="form-wrapper fade-in">
    <h1>Register</h1>
    <form @submit.prevent="onRegister" class="form">
      <input
        v-model="username"
        placeholder="Username"
        autocomplete="username"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        autocomplete="new-password"
      />
      <button class="btn-form" type="submit">Sign up</button>
    </form>
  </section>
</template>
