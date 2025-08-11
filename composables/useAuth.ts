type Session = { authenticated: boolean };

export function useAuth() {
  const { data: session, refresh } = useFetch<Session>("/api/auth/session", {
    key: "auth:session",
    default: () => ({ authenticated: false }), // evita undefined
  });

  const login = async (username: string, password: string) => {
    await $fetch("/api/auth/login", {
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

  return { isAuthenticated, login, logout, session };
}
