type Session = { authenticated: boolean; user?: { username: string } };

export default defineEventHandler<Session>((event) => {
  const raw = getCookie(event, "auth");
  if (!raw) return { authenticated: false };

  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    const username = (parsed && typeof parsed === "object" ? parsed.username : undefined) as string | undefined;
    if (!username) return { authenticated: false };
    return { authenticated: true, user: { username } };
  } catch {
    return { authenticated: false };
  }
});
