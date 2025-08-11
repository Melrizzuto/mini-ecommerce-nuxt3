type Session = { authenticated: boolean; user?: { username: string } };

export default defineEventHandler<Session>((event) => {
  const raw = getCookie(event, "auth");
  if (!raw) return { authenticated: false };

  try {
    const { username } = JSON.parse(raw) as { username?: string };
    if (!username) return { authenticated: false };
    return { authenticated: true, user: { username } };
  } catch {
    return { authenticated: false };
  }
});
