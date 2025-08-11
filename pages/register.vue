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
  <section class="wrap fade-in">
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
      <button type="submit">Sign up</button>
    </form>
  </section>
</template>

<style scoped>
/* ===== Animazione tipo card ===== */
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
