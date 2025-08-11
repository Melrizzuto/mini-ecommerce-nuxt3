export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;
  const { data } = await useFetch<{ authenticated: boolean }>(
    "/api/auth/session",
    { key: "auth:nav" }
  );
  if (!data.value?.authenticated && to.path.startsWith("/checkout")) {
    return navigateTo("/login");
  }
});
