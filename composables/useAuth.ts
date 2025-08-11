type Session = { authenticated: boolean; user?: { username: string } };

export function useAuth() {
  const { data: session, refresh } = useFetch<Session>("/api/auth/session", {
    key: "auth:session",
    default: () => ({ authenticated: false }),
  });

  const login = async (username: string, password: string) => {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { username, password },
    });
    await refresh();
  };

  const register = async (username: string, password: string) => {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: { username, password },
    });
    await refresh();
  };

  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    await refresh();
  };

  const isAuthenticated = computed(() => session.value.authenticated);

  return { isAuthenticated, login, register, logout, session };
}
